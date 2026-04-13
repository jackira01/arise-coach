'use client'

// ── Plan actual (en una app real vendría del perfil del usuario) ──────────
const CURRENT_PLAN = {
    name: 'Diamond Pack',
    hrsPerWeek: 18,
    weeks: 4, // periodo de facturación (1 mes)
}
const TOTAL_HOURS = CURRENT_PLAN.hrsPerWeek * CURRENT_PLAN.weeks // 72

const SESSIONS: { date: string; hrs: number; topic: string }[] = [
    { date: '12 Abr 2026', hrs: 2.5, topic: 'Posicionamiento en teamfights' },
    { date: '10 Abr 2026', hrs: 2.0, topic: 'Control emocional en partidas perdidas' },
    { date: '08 Abr 2026', hrs: 3.0, topic: 'Rotaciones eficientes' },
    { date: '05 Abr 2026', hrs: 2.5, topic: 'Cuándo hacer objetivos' },
    { date: '03 Abr 2026', hrs: 2.0, topic: 'Mentalidad para rankeds' },
    { date: '01 Abr 2026', hrs: 3.0, topic: 'Cómo dejar el tilt' },
    { date: '29 Mar 2026', hrs: 2.5, topic: 'Control de visión (wards)' },
    { date: '27 Mar 2026', hrs: 2.0, topic: 'Prioridad de líneas' },
    { date: '25 Mar 2026', hrs: 2.5, topic: 'Trading en línea' },
    { date: '22 Mar 2026', hrs: 3.0, topic: 'Dominio del champion pool' },
    { date: '20 Mar 2026', hrs: 2.5, topic: 'Macro Game — Introducción' },
    { date: '18 Mar 2026', hrs: 2.0, topic: 'Mentalidad y Control Emocional — Introducción' },
]

const COMPLETED_HOURS = SESSIONS.reduce((acc, s) => acc + s.hrs, 0)
const REMAINING_HOURS = Math.max(0, TOTAL_HOURS - COMPLETED_HOURS)
const PROGRESS_PCT = Math.min(100, Math.round((COMPLETED_HOURS / TOTAL_HOURS) * 100))

const WEEKS = [
    { label: 'Sem 1 (18–24 Mar)', done: 7.5, target: CURRENT_PLAN.hrsPerWeek },
    { label: 'Sem 2 (25–31 Mar)', done: 9.5, target: CURRENT_PLAN.hrsPerWeek },
    { label: 'Sem 3 (1–7 Abr)', done: 7.5, target: CURRENT_PLAN.hrsPerWeek },
    { label: 'Sem 4 (8–14 Abr)', done: 7.5, target: CURRENT_PLAN.hrsPerWeek },
]

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
        ],
    },
    {
        title: 'Micro Game y Mecánicas',
        topics: [
            { name: 'Trading en línea', status: 'en-progreso' },
            { name: 'Farming (CS perfecto)', status: 'pendiente' },
            { name: 'Uso correcto de habilidades', status: 'pendiente' },
            { name: 'Posicionamiento en teamfights', status: 'pendiente' },
            { name: 'Uso de summoners', status: 'no-completado' },
            { name: 'Cómo kitear correctamente', status: 'pendiente' },
            { name: 'Mecánicas por rol', status: 'pendiente' },
            { name: 'Dominio del champion pool', status: 'en-progreso' },
        ],
    },
    {
        title: 'Estrategia de Ranked',
        topics: [
            { name: 'Win conditions', status: 'pendiente' },
            { name: 'Errores comunes por elo', status: 'pendiente' },
            { name: 'Cómo carrear partidas', status: 'pendiente' },
            { name: 'Importancia del champion pool', status: 'pendiente' },
            { name: 'Dodge inteligente', status: 'pendiente' },
            { name: 'Zonas de control', status: 'pendiente' },
            { name: 'Jugar solo vs dúo', status: 'pendiente' },
            { name: 'Cómo impactar el mapa', status: 'pendiente' },
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

            {/* Top row: progress + weekly breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Main progress card — 2 cols */}
                <div className="lg:col-span-2 bg-red-950/30 backdrop-blur-sm border border-red-800/20 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-1">
                        <div>
                            <span className="font-primary text-[.85rem] font-semibold text-[rgba(255,210,210,.8)]">Horas Completadas</span>
                            <p className="font-primary text-[.72rem] text-[rgba(255,210,210,.4)] mt-0.5">{CURRENT_PLAN.name} · {CURRENT_PLAN.hrsPerWeek} hrs/semana</p>
                        </div>
                        <span className="font-primary text-[2rem] font-black leading-none bg-linear-to-br from-red-400 to-rose-500 bg-clip-text text-transparent">
                            {PROGRESS_PCT}%
                        </span>
                    </div>
                    {/* Main bar */}
                    <div className="h-4 bg-red-950/60 rounded-full overflow-hidden border border-red-800/20 my-4 relative">
                        <div
                            className="h-full bg-linear-to-r from-red-600 to-rose-500 rounded-full transition-all duration-700 flex items-center justify-end pr-2"
                            style={{ width: `${PROGRESS_PCT}%` }}
                        >
                            <span className="text-[9px] font-black font-primary text-white/80 whitespace-nowrap">{COMPLETED_HOURS}h</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                        {[
                            { label: 'Completadas', value: `${COMPLETED_HOURS} hrs`, cls: 'text-rose-400' },
                            { label: 'Restantes', value: `${REMAINING_HOURS} hrs`, cls: 'text-[rgba(255,210,210,.6)]' },
                            { label: 'Contratadas', value: `${TOTAL_HOURS} hrs`, cls: 'text-red-400' },
                        ].map((s) => (
                            <div key={s.label} className="bg-red-950/30 rounded-xl p-3 text-center border border-red-800/15">
                                <p className={`font-primary text-[1.15rem] font-black leading-none mb-1 ${s.cls}`}>{s.value}</p>
                                <p className="font-primary text-[.65rem] uppercase tracking-[1.5px] text-[rgba(255,210,210,.4)]">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Weekly breakdown */}
                <div className="bg-red-950/30 backdrop-blur-sm border border-red-800/20 rounded-2xl p-6 flex flex-col gap-4">
                    <span className="font-primary text-[.82rem] font-semibold text-[rgba(255,210,210,.8)]">Horas por Semana</span>
                    {WEEKS.map((w) => {
                        const pct = Math.min(100, Math.round((w.done / w.target) * 100))
                        return (
                            <div key={w.label}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-primary text-[.7rem] text-[rgba(255,210,210,.5)]">{w.label}</span>
                                    <span className="font-primary text-[.72rem] font-bold text-red-400">{w.done}/{w.target}h</span>
                                </div>
                                <div className="h-2 bg-red-950/60 rounded-full overflow-hidden">
                                    <div className="h-full bg-linear-to-r from-red-600 to-rose-500 rounded-full" style={{ width: `${pct}%` }} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Sessions history */}
            <div className="bg-red-950/20 backdrop-blur-sm border border-red-800/20 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-red-800/20 bg-red-950/30">
                    <span className="font-primary text-[.82rem] font-semibold text-[rgba(255,210,210,.8)]">Historial de Sesiones</span>
                </div>
                <div className="hidden sm:grid grid-cols-[1.4fr_0.5fr_2.5fr] gap-4 px-6 py-2.5 border-b border-red-800/15 bg-red-950/20">
                    {['Fecha', 'Horas', 'Tema'].map((h) => (
                        <span key={h} className="font-primary text-[.65rem] uppercase tracking-[2px] text-[rgba(255,210,210,.35)]">{h}</span>
                    ))}
                </div>
                {SESSIONS.map((s, i) => (
                    <div
                        key={i}
                        className={`grid grid-cols-1 sm:grid-cols-[1.4fr_0.5fr_2.5fr] gap-1 sm:gap-4 px-6 py-3.5 transition-colors hover:bg-red-950/20 ${i < SESSIONS.length - 1 ? 'border-b border-red-800/10' : ''}`}
                    >
                        <span className="font-primary text-[.78rem] text-[rgba(255,210,210,.5)]">{s.date}</span>
                        <span className="font-primary text-[.82rem] font-bold text-rose-400">{s.hrs}h</span>
                        <span className="font-primary text-[.82rem] text-[rgba(255,210,210,.75)]">{s.topic}</span>
                    </div>
                ))}
            </div>

            {/* Topic categories */}
            <div>
                <h3 className="font-primary text-[.72rem] uppercase tracking-[3px] text-[rgba(255,210,210,.4)] mb-4">Temas del Plan</h3>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {TOPIC_CATEGORIES.map((cat) => {
                        const catCompleted = cat.topics.filter((t) => t.status === 'completado').length
                        const catPct = Math.round((catCompleted / cat.topics.length) * 100)
                        return (
                            <div key={cat.title} className="bg-red-950/30 backdrop-blur-sm border border-red-800/20 rounded-2xl p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-serif text-[.92rem] font-bold uppercase text-[#fff0f0]">{cat.title}</h4>
                                    <span className="font-primary text-[.75rem] font-bold text-red-400">{catPct}%</span>
                                </div>
                                <div className="h-1.5 bg-red-950/60 rounded-full overflow-hidden mb-4">
                                    <div className="h-full bg-linear-to-r from-red-600 to-rose-500 rounded-full" style={{ width: `${catPct}%` }} />
                                </div>
                                <ul className="flex flex-col gap-2">
                                    {cat.topics.map((topic) => {
                                        const cfg = STATUS_CONFIG[topic.status as TopicStatus]!
                                        return (
                                            <li key={topic.name} className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                                                    <span className="font-primary text-[.8rem] text-[rgba(255,210,210,.75)] truncate">{topic.name}</span>
                                                </div>
                                                <span className={`shrink-0 font-primary text-[.6rem] font-bold uppercase tracking-[1.5px] px-2 py-0.5 rounded-full border ${cfg.cls}`}>
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
        </div>
    )
}
