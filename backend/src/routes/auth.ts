import { Router, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import Mailjet from 'node-mailjet'
import { User } from '../models/User.js'

const router = Router()

function getMailjet() {
    return new Mailjet({
        apiKey: process.env.MJ_APIKEY_PUBLIC as string,
        apiSecret: process.env.MJ_APIKEY_PRIVATE as string,
    })
}

function generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string; password: string }

    if (!email || !password) {
        res.status(400).json({ message: 'Email y contraseña son requeridos' })
        return
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(401).json({ message: 'Credenciales inválidas' })
            return
        }

        if (user.provider === 'google') {
            res.status(401).json({ message: 'Esta cuenta fue registrada con Google. Inicia sesión con el botón de Google.', code: 'google_provider' })
            return
        }

        const match = await user.comparePassword(password)
        if (!match) {
            res.status(401).json({ message: 'Credenciales inválidas' })
            return
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' } as jwt.SignOptions
        )

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                plan: user.plan,
                role: user.role,
            },
        })
    } catch {
        res.status(500).json({ message: 'Error interno del servidor' })
    }
})

// POST /api/auth/register  (email/password) — crea usuario pendiente y envía código de verificación
router.post('/register', async (req: Request, res: Response) => {
    const { name, email, password } = req.body as {
        name: string
        email: string
        password: string
    }

    if (!name || !email || !password) {
        res.status(400).json({ message: 'Todos los campos son requeridos' })
        return
    }

    try {
        // Rechazar si ya existe un usuario verificado con ese email
        const existing = await User.findOne({ email, emailVerified: true })
        if (existing) {
            res.status(409).json({ message: 'El email ya está registrado' })
            return
        }

        const code = generateCode()
        const expires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutos

        // Crear o actualizar usuario pendiente de verificación
        const pending = await User.findOne({ email })
        if (pending) {
            pending.name = name
            pending.password = password
            pending.provider = 'credentials'
            pending.verificationCode = code
            pending.verificationCodeExpires = expires
            await pending.save()
        } else {
            await User.create({
                name,
                email,
                password,
                provider: 'credentials',
                emailVerified: false,
                verificationCode: code,
                verificationCodeExpires: expires,
            })
        }

        const mailjet = getMailjet()
        await mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: { Email: process.env.MJ_SENDER_EMAIL as string, Name: 'Arise Coach' },
                    To: [{ Email: email }],
                    Subject: 'Código de verificación - Arise Coach',
                    HTMLPart: `
                        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#0a0a0a;color:#fff0f0;border-radius:16px;">
                            <h2 style="color:#ef4444;margin-bottom:8px;">Verifica tu correo</h2>
                            <p style="color:rgba(255,210,210,.7);margin-bottom:24px;">Usa el siguiente código para completar tu registro en Arise Coach. Expira en 10 minutos.</p>
                            <div style="font-size:2.5rem;font-weight:bold;letter-spacing:10px;text-align:center;color:#fff;background:#1a0a0a;border:1px solid #7f1d1d;border-radius:12px;padding:20px;">${code}</div>
                            <p style="color:rgba(255,210,210,.4);font-size:.8rem;margin-top:24px;">Si no solicitaste esto, ignora este correo.</p>
                        </div>
                    `,
                },
            ],
        })

        res.json({ message: 'Código enviado' })
    } catch (err) {
        console.error('Error en registro:', err)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
})

// POST /api/auth/send-verification  — envía código Mailjet para registro con Google
router.post('/send-verification', async (req: Request, res: Response) => {
    const { email } = req.body as { email: string }

    if (!email) {
        res.status(400).json({ message: 'Email requerido' })
        return
    }

    try {
        const existing = await User.findOne({ email, emailVerified: true })
        if (existing) {
            res.status(409).json({ message: 'El email ya está registrado' })
            return
        }

        const code = generateCode()
        const expires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutos

        // Guardar temporalmente el código en un doc sin contraseña (o actualizar si ya existe pendiente)
        await User.findOneAndUpdate(
            { email },
            {
                $setOnInsert: { name: 'pending', email, provider: 'google', emailVerified: false },
                verificationCode: code,
                verificationCodeExpires: expires,
            },
            { upsert: true, new: true }
        )

        const mailjet = getMailjet()
        await mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: { Email: process.env.MJ_SENDER_EMAIL as string, Name: 'Arise Coach' },
                    To: [{ Email: email }],
                    Subject: 'Código de verificación - Arise Coach',
                    HTMLPart: `
                        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#0a0a0a;color:#fff0f0;border-radius:16px;">
                            <h2 style="color:#ef4444;margin-bottom:8px;">Verifica tu correo</h2>
                            <p style="color:rgba(255,210,210,.7);margin-bottom:24px;">Usa el siguiente código para completar tu registro en Arise Coach. Expira en 10 minutos.</p>
                            <div style="font-size:2.5rem;font-weight:bold;letter-spacing:10px;text-align:center;color:#fff;background:#1a0a0a;border:1px solid #7f1d1d;border-radius:12px;padding:20px;">${code}</div>
                            <p style="color:rgba(255,210,210,.4);font-size:.8rem;margin-top:24px;">Si no solicitaste esto, ignora este correo.</p>
                        </div>
                    `,
                },
            ],
        })

        res.json({ message: 'Código enviado' })
    } catch (err) {
        console.error('Error enviando código:', err)
        res.status(500).json({ message: 'Error enviando el código de verificación' })
    }
})

// POST /api/auth/verify-code  — verifica el código y completa el registro Google
router.post('/verify-code', async (req: Request, res: Response) => {
    const { email, code, name } = req.body as { email: string; code: string; name: string }

    if (!email || !code || !name) {
        res.status(400).json({ message: 'Email, nombre y código son requeridos' })
        return
    }

    try {
        const user = await User.findOne({ email })

        if (!user || !user.verificationCode || !user.verificationCodeExpires) {
            res.status(400).json({ message: 'Código no encontrado. Solicita uno nuevo.' })
            return
        }

        if (user.verificationCodeExpires < new Date()) {
            res.status(400).json({ message: 'El código ha expirado. Solicita uno nuevo.' })
            return
        }

        if (user.verificationCode !== code) {
            res.status(400).json({ message: 'Código incorrecto' })
            return
        }

        // Completar el registro
        user.name = name
        user.emailVerified = true
        user.verificationCode = null
        user.verificationCodeExpires = null
        await user.save()

        res.json({ message: 'Email verificado correctamente' })
    } catch {
        res.status(500).json({ message: 'Error interno del servidor' })
    }
})

// POST /api/auth/register-google  — crea o recupera un usuario de Google (sin verificación de correo)
router.post('/register-google', async (req: Request, res: Response) => {
    const { email, name } = req.body as { email: string; name: string }
    if (!email || !name) { res.status(400).json({ message: 'Email y nombre requeridos' }); return }

    try {
        let user = await User.findOne({ email })

        if (!user) {
            user = await User.create({ name, email, provider: 'google', emailVerified: true })
        } else if (!user.emailVerified) {
            // Usuario pendiente de verificación por otro flujo: actualizar a Google
            user.name = name
            user.provider = 'google'
            user.emailVerified = true
            user.verificationCode = null
            user.verificationCodeExpires = null
            await user.save()
        }

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                plan: user.plan,
                role: user.role,
            },
            token: jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET as string,
                { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' } as jwt.SignOptions
            ),
        })
    } catch {
        res.status(500).json({ message: 'Error interno del servidor' })
    }
})

// LEGACY kept for backwards compat — use /register-google instead
router.post('/check-user', async (req: Request, res: Response) => {
    const { email } = req.body as { email: string }
    if (!email) { res.status(400).json({ message: 'Email requerido' }); return }
    try {
        const user = await User.findOne({ email, emailVerified: true })
        res.json({ exists: !!user })
    } catch {
        res.status(500).json({ message: 'Error interno del servidor' })
    }
})

// POST /api/auth/login-google  — LEGACY, reemplazado por /register-google
router.post('/login-google', async (req: Request, res: Response) => {
    const { email } = req.body as { email: string }
    if (!email) { res.status(400).json({ message: 'Email requerido' }); return }

    try {
        const user = await User.findOne({ email, provider: 'google', emailVerified: true })
        if (!user) {
            res.status(401).json({ message: 'Cuenta no encontrada. Regístrate primero.' })
            return
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' } as jwt.SignOptions
        )

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                plan: user.plan,
                role: user.role,
            },
        })
    } catch {
        res.status(500).json({ message: 'Error interno del servidor' })
    }
})

export default router
