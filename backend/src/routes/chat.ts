import { Router, type Response } from 'express'
import mongoose from 'mongoose'
import { authMiddleware, type AuthRequest } from '../middleware/auth.js'
import { Message } from '../models/Message.js'

const router = Router()

const LIMIT = 30

// GET /api/chat/:userId/messages?page=1
// Usuario solo puede ver su propia sala; admin puede ver cualquiera.
router.get('/:userId/messages', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    const { userId } = req.params
    const page = Math.max(1, parseInt((req.query.page as string) ?? '1', 10))

    // Autorización: solo el propio usuario o un admin
    if (req.userRole !== 'admin' && req.userId !== userId) {
        res.status(403).json({ message: 'Acceso denegado' })
        return
    }

    if (!mongoose.isValidObjectId(userId)) {
        res.status(400).json({ message: 'userId inválido' })
        return
    }

    const total = await Message.countDocuments({ roomUserId: userId })
    const messages = await Message.find({ roomUserId: userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * LIMIT)
        .limit(LIMIT)
        .lean()

    res.json({
        messages: messages.reverse(), // más antiguo primero dentro de la página
        page,
        hasNextPage: page * LIMIT < total,
        nextPage: page * LIMIT < total ? page + 1 : null,
    })
})

export default router
