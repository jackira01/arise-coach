import { Router, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

const router = Router()

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

        const match = await user.comparePassword(password)
        if (!match) {
            res.status(401).json({ message: 'Credenciales inválidas' })
            return
        }

        const token = jwt.sign(
            { userId: user._id },
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
            },
        })
    } catch {
        res.status(500).json({ message: 'Error interno del servidor' })
    }
})

// POST /api/auth/register
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
        const existing = await User.findOne({ email })
        if (existing) {
            res.status(409).json({ message: 'El email ya está registrado' })
            return
        }

        const user = await User.create({ name, email, password })

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' } as jwt.SignOptions
        )

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                plan: user.plan,
            },
        })
    } catch {
        res.status(500).json({ message: 'Error interno del servidor' })
    }
})

export default router
