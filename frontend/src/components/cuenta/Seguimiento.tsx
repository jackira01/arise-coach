"use client";

type Status = "completado" | "pendiente" | "no completado";

interface Tema {
    titulo: string;
    descripcion: string;
    estado: Status;
}

const TEMAS: Tema[] = [
    { titulo: "Oleadas de súbditos", descripcion: "Control y congelado de oleadas", estado: "completado" },
    { titulo: "Esquiva y kiteo", descripcion: "Movimientos de esquiva en peleas", estado: "completado" },
    { titulo: "Farmeo eficiente", descripcion: "Maximizar CS por minuto", estado: "completado" },
    { titulo: "Macro game", descripcion: "Rotaciones y visión del mapa", estado: "pendiente" },
    { titulo: "Objetivos del mapa", descripcion: "Dragones, Barón, Torres", estado: "pendiente" },
    { titulo: "Micro game", descripcion: "Mecánicas avanzadas de campeón", estado: "no completado" },
    { titulo: "Gankeos y contraganks", descripcion: "Patrones de jungla y presión", estado: "no completado" },
    { titulo: "Mentalidad competitiva", descripcion: "Control emocional en partida", estado: "no completado" },
];

const STATUS_CONFIG: Record<Status, { label: string; bg: string; text: string; dot: string }> = {
    completado:       { label: "Completado",       bg: "bg-emerald-50",  text: "text-emerald-700", dot: "bg-emerald-500" },
    pendiente:        { label: "Pendiente",         bg: "bg-amber-50",    text: "text-amber-700",   dot: "bg-amber-400"   },
    "no completado":  { label: "No completado",     bg: "bg-red-50",      text: "text-red-600",     dot: "bg-red-400"     },
};

export default function Seguimiento() {
    const completados = TEMAS.filter((t) => t.estado === "completado").length;
    const progreso = Math.round((completados / TEMAS.length) * 100);

    return (
        <div className="flex flex-col gap-8">
            {/* Encabezado */}
            <div>
                <h2 className="text-2xl font-bold text-[#1a0f35] tracking-tight mb-1">Seguimiento</h2>
                <p className="text-sm text-[rgba(30,20,70,.5)]">Progreso de tu plan de entrenamiento personalizado</p>
            </div>

            {/* Barra de progreso */}
            <div className="rounded-2xl border border-violet-100 bg-white/70 backdrop-blur-sm p-6 shadow-sm">
                <div className="flex items-end justify-between mb-3">
                    <div>
                        <p className="text-xs font-semibold text-[rgba(30,20,70,.45)] uppercase tracking-widest mb-0.5">Progreso general</p>
                        <p className="text-3xl font-black text-[#1a0f35]">{progreso}<span className="text-lg font-semibold text-violet-600">%</span></p>
                    </div>
                    <p className="text-sm text-[rgba(30,20,70,.5)]">
                        <span className="font-semibold text-emerald-600">{completados}</span> / {TEMAS.length} temas
                    </p>
                </div>

                {/* Barra */}
                <div className="w-full h-3 bg-violet-100 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full bg-linear-to-r from-violet-600 to-blue-500 transition-all duration-700"
                        style={{ width: `${progreso}%` }}
                    />
                </div>

                {/* Leyenda */}
                <div className="flex gap-5 mt-4">
                    {(["completado", "pendiente", "no completado"] as Status[]).map((s) => {
                        const cfg = STATUS_CONFIG[s];
                        const count = TEMAS.filter((t) => t.estado === s).length;
                        return (
                            <div key={s} className="flex items-center gap-1.5 text-xs text-[rgba(30,20,70,.55)]">
                                <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                                {cfg.label} ({count})
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Lista de temas */}
            <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-[rgba(30,20,70,.5)] uppercase tracking-widest">Temas del plan</h3>
                {TEMAS.map((tema, i) => {
                    const cfg = STATUS_CONFIG[tema.estado];
                    return (
                        <div
                            key={i}
                            className="flex items-center gap-4 rounded-xl border border-violet-50 bg-white/60 backdrop-blur-sm px-5 py-4 shadow-sm hover:border-violet-200 transition-colors duration-150"
                        >
                            {/* Número */}
                            <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center shrink-0">
                                {i + 1}
                            </span>

                            {/* Texto */}
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-semibold text-[#1a0f35] ${tema.estado === "completado" ? "line-through opacity-60" : ""}`}>
                                    {tema.titulo}
                                </p>
                                <p className="text-xs text-[rgba(30,20,70,.45)] truncate">{tema.descripcion}</p>
                            </div>

                            {/* Badge */}
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${cfg.bg} ${cfg.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                                {cfg.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
