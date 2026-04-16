"use client";

import Link from "next/link";

interface Package {
    id: string;
    emoji: string;
    name: string;
    tag: string;
    description: string;
    features: string[];
    priceLabel: string;
    priceNote: string;
    accentFrom: string;
    accentTo: string;
    glow: string;
}

const PACKAGES: Package[] = [
    {
        id: "coach",
        emoji: "🎓",
        name: "Coaching",
        tag: "Más popular",
        description:
            "Sesiones 1 a 1 con coaches Challenger adaptadas a tu estilo de juego. Mejora mecánicas, macro y visión de mapa.",
        features: [
            "Análisis de replays personalizados",
            "Plan de entrenamiento semanal",
            "Seguimiento de progreso por temas",
            "Chat directo con tu coach",
            "30 min – 2 horas por sesión",
        ],
        priceLabel: "Desde $10 USD / hora",
        priceNote: "Precio según tu rango actual",
        accentFrom: "#5a8fd6",
        accentTo: "#7c3aed",
        glow: "rgba(124,58,237,.25)",
    },
    {
        id: "boost",
        emoji: "🚀",
        name: "Boost de Liga",
        tag: "Garantizado",
        description:
            "Boosters profesionales de élite mejoran tu ranking de forma segura y discreta. Llega al rango que mereces.",
        features: [
            "Boosters Challenger y Gran Maestro",
            "Proceso seguro y discreto",
            "Garantía de rango objetivo",
            "Información en tiempo real",
            "Disponible en todos los servidores",
        ],
        priceLabel: "Precio según rango",
        priceNote: "Desde $25 USD · pago único",
        accentFrom: "#ef5350",
        accentTo: "#f97316",
        glow: "rgba(239,83,80,.22)",
    },
];

export default function Paquetes() {
    return (
        <div className="flex flex-col gap-8">
            {/* Encabezado */}
            <div>
                <h2 className="text-2xl font-bold text-[#1a0f35] tracking-tight mb-1">Paquetes</h2>
                <p className="text-sm text-[rgba(30,20,70,.5)]">Servicios disponibles en la plataforma</p>
            </div>

            {/* Tarjetas */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {PACKAGES.map((pkg) => (
                    <div
                        key={pkg.id}
                        className="relative rounded-2xl border border-violet-100 bg-white/70 backdrop-blur-sm shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
                        style={{ boxShadow: `0 0 0 0 ${pkg.glow}` }}
                    >
                        {/* Gradiente superior */}
                        <div
                            className="h-1.5 w-full"
                            style={{ background: `linear-gradient(90deg, ${pkg.accentFrom}, ${pkg.accentTo})` }}
                        />

                        <div className="p-6 flex flex-col flex-1">
                            {/* Cabecera */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{pkg.emoji}</span>
                                    <div>
                                        <h3 className="text-lg font-black text-[#1a0f35] tracking-tight">{pkg.name}</h3>
                                    </div>
                                </div>
                                <span
                                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white"
                                    style={{ background: `linear-gradient(90deg, ${pkg.accentFrom}, ${pkg.accentTo})` }}
                                >
                                    {pkg.tag}
                                </span>
                            </div>

                            {/* Descripción */}
                            <p className="text-sm text-[rgba(30,20,70,.6)] leading-relaxed mb-5">{pkg.description}</p>

                            {/* Features */}
                            <ul className="flex flex-col gap-2 mb-6 flex-1">
                                {pkg.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm text-[rgba(30,20,70,.7)]">
                                        <svg viewBox="0 0 24 24" fill="none" stroke={pkg.accentTo} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 mt-0.5">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* Precio */}
                            <div className="mb-4">
                                <p className="text-xl font-black text-[#1a0f35]">{pkg.priceLabel}</p>
                                <p className="text-xs text-[rgba(30,20,70,.4)] mt-0.5">{pkg.priceNote}</p>
                            </div>

                            {/* CTA */}
                            <Link
                                href="/precios"
                                className="block w-full text-center py-3 rounded-xl text-sm font-bold tracking-wide text-white transition-opacity duration-150 hover:opacity-90"
                                style={{ background: `linear-gradient(90deg, ${pkg.accentFrom}, ${pkg.accentTo})` }}
                            >
                                Ver detalles y precios
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Nota */}
            <div className="rounded-xl border border-violet-100 bg-violet-50/50 px-5 py-4 flex items-start gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-xs text-[rgba(30,20,70,.55)] leading-relaxed">
                    Todos los paquetes incluyen acceso a la plataforma de seguimiento, chat con el coach y historial de facturas. 
                    Puedes cambiar o cancelar tu plan en cualquier momento.
                </p>
            </div>
        </div>
    );
}
