import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(__dirname, '..', '.env') })

import mongoose from 'mongoose'
import { User } from './models/User.js'

const USERS = [
    {
        name: 'Admin AriseXR',
        email: 'admin@arisexr.com',
        password: 'Admin1234!',
        role: 'admin' as const,
        plan: null,
    },
    {
        name: 'Carlos Gómez',
        email: 'carlos@test.com',
        password: 'User1234!',
        role: 'user' as const,
        plan: 'diamond' as const,
    },
    {
        name: 'Lucía Martínez',
        email: 'lucia@test.com',
        password: 'User1234!',
        role: 'user' as const,
        plan: 'silver' as const,
    },
]

async function seed() {
    const uri = process.env.MONGODB_URI
    if (!uri) {
        console.error('❌  MONGODB_URI no definida en .env')
        process.exit(1)
    }

    await mongoose.connect(uri)
    console.log('✅  Conectado a MongoDB')

    for (const data of USERS) {
        const existing = await User.findOne({ email: data.email })
        if (existing) {
            console.log(`⚠️   Ya existe: ${data.email} — omitido`)
            continue
        }
        await User.create(data)
        console.log(`✅  Creado [${data.role}]: ${data.email}  /  contraseña: ${data.password}`)
    }

    await mongoose.disconnect()
    console.log('\n🎉  Seed completado')
}

seed().catch((err) => {
    console.error('❌  Error en seed:', err)
    process.exit(1)
})
