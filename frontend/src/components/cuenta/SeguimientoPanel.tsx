'use client'

const TOPIC_CATEGORIES = [
    {
        title: 'Mentalidad y Control Emocional',
        topics: [
            { name: 'Cómo dejar el tilt', status: 'completado' },
            { name: 'Mentalidad para rankeds', status: 'completado' },
            { name: 'Control emocional en partidas perdidas', status: 'en-progreso' },
            { name: 'Cómo no rendirse (mentalidad comeback)', status: 'pendiente' },
            { name: 'Manejo de la frustración', status: 'pendiente' },
            { name: 'Confianza en tus decisiones', status: 'no-completado' },
            { name: 'Evitar el autosabotaje', status: 'pendiente' },
            { name: 'Cómo jugar bajo presión', status: 'pendiente' },
            { name: 'Mentalidad de mejora continua', status: 'pendiente' },
            { name: 'Cómo aprender de tus derrotas', status: 'pendiente' },
        ],
    },
    {
        title: 'Macro Game',
        topics: [
            { name: 'Cuándo hacer objetivos (dragón, barón)', status: 'completado' },
            { name: 'Rotaciones eficientes', status: 'completado' },
            { name: 'Control de visión (wards)', status: 'completado' },
            { name: 'Prioridad de líneas', status: 'en-progreso' },
            { name: 'Cómo cerrar partidas', status: 'pendiente' },
            { name: 'Shotcalling básico', status: 'pendiente' },
            { name: 'Cómo jugar con ventaja', status: 'pendiente' },
            { name: 'Cómo jugar desde atrás', status: 'pendiente' },
            { name: 'Map awareness (lectura del mapa)', status: 'pendiente' },
            { name: 'Control de tempo', status: 'pendiente' },
        ],
    },
    {
        title: 'Micro Game y Mecánicas',
        topics: [
            { name: 'Mejora de reflejos', status: 'pendiente' },
            { name: 'Posicionamiento en teamfights', status: 'pendiente' },
            { name: 'Uso correcto de habilidades', status: 'pendiente' },
            { name: 'Trading en línea', status: 'pendiente' },
            { name: 'Farming (CS perfecto)', status: 'pendiente' },
            { name: 'Uso de summoners', status: 'no-completado' },
            { name: 'Cómo kitear correctamente', status: 'pendiente' },
            { name: 'Mecánicas por rol', status: 'pendiente' },
            { name: 'Mejora del early game', status: 'pendiente' },
            { name: 'Dominio del champion pool', status: 'pendiente' },
        ],
    },
    {
        title: 'Estrategia de Ranked',
        topics: [
            { name: 'Cómo trakear', status: 'pendiente' },
            { name: 'Errores comunes por elo', status: 'pendiente' },
            { name: 'Cómo carrear partidas', status: 'pendiente' },
            { name: 'Importancia del champion pool', status: 'pendiente' },
            { name: 'Dodge inteligente', status: 'pendiente' },
            { name: 'Cómo aprovechar picks fuertes', status: 'pendiente' },
            { name: 'Win conditions', status: 'pendiente' },
            { name: 'Cómo impactar el mapa', status: 'pendiente' },
            { name: 'Jugar solo vs dúo', status: 'pendiente' },
            { name: 'Zonas de control', status: 'pendiente' },
        ],
    },
]

type TopicStatus = 'completado' | 'en-progreso' | 'pendiente' | 'no-completado'

const STATUS_CONFIG: Record<TopicStatus, { label: string; cls: string; dot: string }> = {
    completado: { label: 'Completado', cls: 'bg-green-500/15 text-green-400 border-green-500/30', dot: 'bg-green-400' },
    'en-progreso': { label: 'En Progreso', cls: 'bg-blue-500/15 text-blue-400 border-blue-500/30', dot: 'bg-blue-400 animate-pulse' },
    pendiente: { label: 'Pendiente', cls: 'bg-red-950/40 text-[rgba(255,210,210,.5)] border-red-800/25', dot: 'bg-[rgba(255,210,210,.25)]' },
    'no-completado': { label: 'No Completado', cls: 'bg-red-500/15 text-red-400 border-red-500/30', dot: 'bg-red-400' },
}

export default function SeguimientoPanel() {
    const allTopics = TOPIC_CATEGORIES.flatMap((c) => c.topics)
    const total = allTopics.length
    const completed = allTopics.filter((t) => t.status === 'completado').length
    const inProgress = allTopics.filter((t) => t.status === 'en-progreso').length
    const progressPct = Math.round(((completed + inProgress * 0.5) / total) * 100)

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 font-primary text-[.7rem] tracking-[4px] uppercase text-red-500 mb-2">
                    <span className="w-5 h-px bg-red-500 inline-block" />
                    Seguimiento
                </div>
                <h2 className="font-serif text-2xl font-bold uppercase text-[#fff0f0]">Tu Progreso</h2>
            </div>

            {/* Progress card */}
            <div className="bg-red-950/30 backdrop-blur-sm border border-red-800/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                    <span className="font-primary text-[.85rem] font-semibold text-[rgba(255,210,210,.8)]">Progreso General</span>
                    <span className="font-primary text-[1.5rem] font-black bg-linear-to-br from-red-400 to-rose-500 bg-clip-text text-transparent">
                        {progressPct}%
                    </span>
                </div>
                {/* Bar */}
                <div className="h-3 bg-red-950/60 rounded-full overflow-hidden border border-red-800/20">
                    <div
                        className="h-full bg-linear-to-r from-red-600 to-rose-500 rounded-full transition-all duration-700"
                        style={{ width: `${progressPct}%` }}
                    />
                </div>
                <div className="flex gap-4 mt-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
                        <span className="font-primary text-[.78rem] text-[rgba(255,210,210,.6)]">{completed} Completados</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block animate-pulse" />
                        <span className="font-primary text-[.78rem] text-[rgba(255,210,210,.6)]">{inProgress} En Progreso</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,210,210,.25)] inline-block" />
                        <span className="font-primary text-[.78rem] text-[rgba(255,210,210,.6)]">{total - completed - inProgress} Pendientes</span>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {TOPIC_CATEGORIES.map((cat) => {
                    const catCompleted = cat.topics.filter((t) => t.status === 'completado').length
                    const catPct = Math.round((catCompleted / cat.topics.length) * 100)
                    return (
                        <div key={cat.title} className="bg-red-950/30 backdrop-blur-sm border border-red-800/20 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-serif text-[.95rem] font-bold uppercase text-[#fff0f0]">{cat.title}</h3>
                                <span className="font-primary text-[.78rem] font-bold text-red-400">{catPct}%</span>
                            </div>
                            {/* Mini bar */}
                            <div className="h-1.5 bg-red-950/60 rounded-full overflow-hidden mb-4">
                                <div className="h-full bg-linear-to-r from-red-600 to-rose-500 rounded-full" style={{ width: `${catPct}%` }} />
                            </div>
                            {/* Topics list */}
                            <ul className="flex flex-col gap-2">
                                {cat.topics.map((topic) => {
                                    const cfg = STATUS_CONFIG[topic.status as TopicStatus]!
                                    return (
                                        <li key={topic.name} className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                                                <span className="font-primary text-[.82rem] text-[rgba(255,210,210,.75)] truncate">{topic.name}</span>
                                            </div>
                                            <span className={`shrink-0 font-primary text-[.62rem] font-bold uppercase tracking-[1.5px] px-2 py-0.5 rounded-full border ${cfg.cls}`}>
                                                {cfg.label}
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
