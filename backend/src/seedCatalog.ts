import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(__dirname, '..', '.env') })

import mongoose from 'mongoose'
import { Category } from './models/Category.js'
import { Topic } from './models/Topic.js'

const CATALOG: { category: string; topics: string[] }[] = [
    {
        category: 'Mentalidad y Control Emocional',
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
        category: 'Macro Game',
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
        category: 'Micro Game y Mecánicas',
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
        category: 'Estrategia de Ranked',
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

async function seedCatalog() {
    const uri = process.env.MONGODB_URI
    if (!uri) {
        console.error('❌  MONGODB_URI no definida en .env')
        process.exit(1)
    }

    await mongoose.connect(uri)
    console.log('✅  Conectado a MongoDB')

    for (const entry of CATALOG) {
        let cat = await Category.findOne({ name: entry.category })
        if (!cat) {
            cat = await Category.create({ name: entry.category })
            console.log(`✅  Categoría creada: ${entry.category}`)
        } else {
            console.log(`⚠️   Categoría ya existe: ${entry.category}`)
        }

        for (const topicName of entry.topics) {
            const existing = await Topic.findOne({ name: topicName, categoryId: cat._id })
            if (!existing) {
                await Topic.create({ name: topicName, categoryId: cat._id })
                console.log(`   ✅  Tema: ${topicName}`)
            } else {
                console.log(`   ⚠️   Tema ya existe: ${topicName}`)
            }
        }
    }

    await mongoose.disconnect()
    console.log('\n🎉  Catálogo sembrado correctamente')
}

seedCatalog().catch((err) => {
    console.error('❌  Error en seedCatalog:', err)
    process.exit(1)
})
