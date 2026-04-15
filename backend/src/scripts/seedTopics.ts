import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') })

import mongoose from 'mongoose'
import { Category } from '../models/Category.js'
import { Topic } from '../models/Topic.js'

const CATALOG = [
    {
        name: 'Mentalidad y Control Emocional',
        topics: [
            'Cómo dejar el tilt',
            'Mentalidad para rankeds',
            'Control emocional en partidas perdidas',
            'Cómo no rendirse (mentalidad comeback)',
            'Manejo de la frustración',
            'Confianza en tus decisiones',
            'Evitar el autosabotaje',
            'Cómo jugar bajo presión',
            'Mentalidad de mejora continua',
            'Cómo aprender de tus derrotas',
        ],
    },
    {
        name: 'Macro Game',
        topics: [
            'Cuándo hacer objetivos (dragón, barón)',
            'Rotaciones eficientes',
            'Control de visión (wards)',
            'Prioridad de líneas',
            'Cómo cerrar partidas',
            'Shotcalling básico',
            'Cómo jugar con ventaja',
            'Cómo jugar desde atrás',
        ],
    },
    {
        name: 'Micro Game y Mecánicas',
        topics: [
            'Trading en línea',
            'Farming (CS perfecto)',
            'Uso correcto de habilidades',
            'Posicionamiento en teamfights',
            'Uso de summoners',
            'Cómo kitear correctamente',
            'Mecánicas por rol',
            'Dominio del champion pool',
        ],
    },
    {
        name: 'Estrategia de Ranked',
        topics: [
            'Win conditions',
            'Errores comunes por elo',
            'Cómo carrear partidas',
            'Importancia del champion pool',
            'Dodge inteligente',
            'Zonas de control',
            'Jugar solo vs dúo',
            'Cómo impactar el mapa',
        ],
    },
]

async function seedTopics() {
    const uri = process.env.MONGODB_URI
    if (!uri) {
        console.error('❌  MONGODB_URI no definida en .env')
        process.exit(1)
    }

    await mongoose.connect(uri)
    console.log('✅  Conectado a MongoDB')

    for (const catData of CATALOG) {
        let category = await Category.findOne({ name: catData.name })
        if (!category) {
            category = await Category.create({ name: catData.name })
            console.log(`✅  Categoría creada: ${catData.name}`)
        } else {
            console.log(`⚠️   Categoría ya existe: ${catData.name} — omitida`)
        }

        for (const topicName of catData.topics) {
            const existing = await Topic.findOne({ name: topicName, categoryId: category._id })
            if (existing) {
                console.log(`   ⚠️  Tema ya existe: ${topicName} — omitido`)
                continue
            }
            await Topic.create({ name: topicName, categoryId: category._id })
            console.log(`   ✅  Tema creado: ${topicName}`)
        }
    }

    await mongoose.disconnect()
    console.log('\n🎉  Seed de temas completado')
}

seedTopics().catch((err) => {
    console.error('❌  Error en seed de temas:', err)
    process.exit(1)
})
