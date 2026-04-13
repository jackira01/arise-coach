import { Router, type Response } from 'express'
import { authMiddleware, type AuthRequest } from '../middleware/auth.js'
import { User } from '../models/User.js'

const router = Router()

// GET /api/users/me
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' })
            return
        }
        res.json(user)
    } catch {
        res.status(500).json({ message: 'Error interno del servidor' })
    }
})

// PATCH /api/users/me/topics/:topicName
router.patch(
    '/me/topics/:topicName',
    authMiddleware,
    async (req: AuthRequest, res: Response) => {
        const { topicName } = req.params
        const { status } = req.body as {
            status: 'pendiente' | 'en-progreso' | 'completado' | 'no-completado'
        }

        try {
            const user = await User.findById(req.userId)
            if (!user) {
                res.status(404).json({ message: 'Usuario no encontrado' })
                return
            }

            const topic = user.topics.find((t) => t.name === topicName)
            if (topic) {
                topic.status = status
            } else {
                user.topics.push({ name: topicName, status })
            }

            await user.save()
            res.json({ topics: user.topics })
        } catch {
            res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
)

export default router
