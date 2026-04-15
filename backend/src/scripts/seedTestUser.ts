import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') })

import mongoose from 'mongoose'
import { User } from '../models/User.js'

// Usuario objetivo: carlos@test.com (plan diamond)
const TARGET_EMAIL = 'carlos@test.com'

const TEST_TOPICS = [
    // Mentalidad y Control Emocional
    { name: 'Cómo dejar el tilt', categoryName: 'Mentalidad y Control Emocional', status: 'completado' as const },
    { name: 'Mentalidad para rankeds', categoryName: 'Mentalidad y Control Emocional', status: 'completado' as const },
    { name: 'Control emocional en partidas perdidas', categoryName: 'Mentalidad y Control Emocional', status: 'en-progreso' as const },
    { name: 'Cómo no rendirse (mentalidad comeback)', categoryName: 'Mentalidad y Control Emocional', status: 'pendiente' as const },
    { name: 'Manejo de la frustración', categoryName: 'Mentalidad y Control Emocional', status: 'pendiente' as const },
    { name: 'Confianza en tus decisiones', categoryName: 'Mentalidad y Control Emocional', status: 'pendiente' as const },
    // Macro Game
    { name: 'Cuándo hacer objetivos (dragón, barón)', categoryName: 'Macro Game', status: 'completado' as const },
    { name: 'Rotaciones eficientes', categoryName: 'Macro Game', status: 'completado' as const },
    { name: 'Control de visión (wards)', categoryName: 'Macro Game', status: 'completado' as const },
    { name: 'Prioridad de líneas', categoryName: 'Macro Game', status: 'en-progreso' as const },
    { name: 'Cómo cerrar partidas', categoryName: 'Macro Game', status: 'pendiente' as const },
    { name: 'Shotcalling básico', categoryName: 'Macro Game', status: 'pendiente' as const },
    // Micro Game y Mecánicas
    { name: 'Trading en línea', categoryName: 'Micro Game y Mecánicas', status: 'en-progreso' as const },
    { name: 'Farming (CS perfecto)', categoryName: 'Micro Game y Mecánicas', status: 'pendiente' as const },
    { name: 'Posicionamiento en teamfights', categoryName: 'Micro Game y Mecánicas', status: 'pendiente' as const },
    { name: 'Dominio del champion pool', categoryName: 'Micro Game y Mecánicas', status: 'en-progreso' as const },
    // Estrategia de Ranked
    { name: 'Win conditions', categoryName: 'Estrategia de Ranked', status: 'pendiente' as const },
    { name: 'Errores comunes por elo', categoryName: 'Estrategia de Ranked', status: 'pendiente' as const },
    { name: 'Cómo carrear partidas', categoryName: 'Estrategia de Ranked', status: 'pendiente' as const },
]

const TEST_SESSIONS = [
    { date: '2026-04-12', hours: 2.5, topic: 'Posicionamiento en teamfights', notes: 'Buena sesión, mejoré el posicionamiento en late game.' },
    { date: '2026-04-10', hours: 2.0, topic: 'Control emocional en partidas perdidas', notes: 'Trabajamos técnicas de respiración y reset mental.' },
    { date: '2026-04-08', hours: 3.0, topic: 'Rotaciones eficientes', notes: 'Revisar los timings de dragón y barón.' },
    { date: '2026-04-05', hours: 2.5, topic: 'Cuándo hacer objetivos (dragón, barón)', notes: 'Muy productivo, repasamos varios replays.' },
    { date: '2026-04-03', hours: 2.0, topic: 'Mentalidad para rankeds', notes: 'Definimos rutina pre-partida y micro-descansos.' },
    { date: '2026-04-01', hours: 3.0, topic: 'Cómo dejar el tilt', notes: 'Identificamos triggers personales y estrategias de recuperación.' },
    { date: '2026-03-29', hours: 2.5, topic: 'Control de visión (wards)', notes: 'Mapeamos zonas prioritarias según rol.' },
    { date: '2026-03-27', hours: 2.0, topic: 'Prioridad de líneas', notes: 'Análisis de rotaciones de mid según timer.' },
    { date: '2026-03-25', hours: 2.5, topic: 'Trading en línea', notes: 'Trabajamos poke vs all-in según matchup.' },
    { date: '2026-03-22', hours: 3.0, topic: 'Dominio del champion pool', notes: 'Redujimos el pool a 3 campeones core.' },
    { date: '2026-03-20', hours: 2.5, topic: 'Rotaciones eficientes', notes: 'Primera sesión de macro, muy buena base.' },
    { date: '2026-03-18', hours: 2.0, topic: 'Cómo dejar el tilt', notes: 'Introducción al módulo de mentalidad.' },
]

const TEST_INVOICES = [
    { invoiceId: 'INV-001', date: '01 Ene 2026', description: 'Silver Pack — Enero 2026', amount: 200, status: 'Pagado' as const },
    { invoiceId: 'INV-002', date: '01 Feb 2026', description: 'Esmerald Pack — Febrero 2026', amount: 300, status: 'Pagado' as const },
    { invoiceId: 'INV-003', date: '01 Mar 2026', description: 'Diamond Pack — Marzo 2026', amount: 500, status: 'Pagado' as const },
    { invoiceId: 'INV-004', date: '01 Abr 2026', description: 'Diamond Pack — Abril 2026', amount: 500, status: 'Pagado' as const },
    { invoiceId: 'INV-005', date: '01 May 2026', description: 'Diamond Pack — Mayo 2026', amount: 500, status: 'Pendiente' as const },
]

async function seedTestUser() {
    const uri = process.env.MONGODB_URI
    if (!uri) {
        console.error('❌  MONGODB_URI no definida en .env')
        process.exit(1)
    }

    await mongoose.connect(uri)
    console.log('✅  Conectado a MongoDB')

    const user = await User.findOne({ email: TARGET_EMAIL })
    if (!user) {
        console.error(`❌  Usuario "${TARGET_EMAIL}" no encontrado. Ejecuta primero npm run seed.`)
        await mongoose.disconnect()
        process.exit(1)
    }

    // Reemplazar temas, sesiones y facturas con datos de ejemplo
    user.topics = TEST_TOPICS
    user.sessions = TEST_SESSIONS.map((s) => ({ ...s, addedAt: new Date() }))
    user.invoices = TEST_INVOICES

    await user.save()

    const completedHours = user.sessions.reduce((acc, s) => acc + s.hours, 0)
    console.log(`\n✅  Datos de ejemplo cargados para: ${user.name} (${user.email})`)
    console.log(`   • Temas:       ${user.topics.length}  (${user.topics.filter(t => t.status === 'completado').length} completados, ${user.topics.filter(t => t.status === 'en-progreso').length} en progreso)`)
    console.log(`   • Sesiones:    ${user.sessions.length}  (${completedHours} horas completadas)`)
    console.log(`   • Facturas:    ${user.invoices.length}  ($${user.invoices.filter(i => i.status === 'Pagado').reduce((a, i) => a + i.amount, 0)} USD pagados)`)

    await mongoose.disconnect()
    console.log('\n🎉  Seed de usuario de prueba completado')
}

seedTestUser().catch((err) => {
    console.error('❌  Error en seed:', err)
    process.exit(1)
})
