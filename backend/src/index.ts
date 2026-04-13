import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'

const app = express()
const PORT = process.env.PORT ?? 4000

// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL ?? 'http://localhost:3000',
        credentials: true,
    })
)
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// Health check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
})

// Start
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Backend running on http://localhost:${PORT}`)
    })
})
