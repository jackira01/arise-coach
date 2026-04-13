'use client'

import { useState, useEffect } from 'react'

interface Review {
    title: string
    text: string
    category: string
}

const reviews: Review[] = [
    { title: 'Tal vez demasiado bueno', text: 'Tal vez demasiado bueno.', category: 'Desempeño' },
    { title: 'Muy conocedor', text: 'Muy conocedor y entiende extremadamente bien los enfrentamientos. Lo recomendaría 10/10.', category: 'Desempeño' },
    { title: 'Locamente bueno', text: 'Locamente bueno con Tristana. Partidas fáciles.', category: 'Desempeño' },
    { title: 'EL MEJOR TRISTANA', text: 'EL MEJOR TRISTANA DE MÉXICO!! UUUU MCACO!!!!', category: 'Desempeño' },
    { title: 'Súper fácil', text: '¡Victoria súper fácil en P2! Genial con Tristana.', category: 'Desempeño' },
    { title: 'El mejor booster', text: 'El mejor booster del sitio, ¡sin duda! El aumento más rápido que he tenido. Gran trabajo.', category: 'Desempeño' },
    { title: 'Excelente y rápido', text: 'Excelente y rápido.', category: 'Desempeño' },
    { title: 'Profesional y habilidoso', text: 'Profesional, habilidoso.', category: 'Desempeño' },
    { title: 'Muy alta calidad', text: 'Pedí mis 10 partidas de posicionamiento la noche antes de la nueva temporada... el booster fue lo suficientemente inteligente para esperar a que iniciara. Una jugada de 9000 IQ.', category: 'Desempeño' },
    { title: 'El mejor jugador', text: 'El mejor jugador con el que he jugado en este sitio.', category: 'Desempeño' },
    { title: 'Amigable, profesional y rápido', text: 'Amigable, profesional, rápido.', category: 'Actitud' },
    { title: 'Persona increíble', text: 'PERSONA INCREÍBLE Y MUY BUEN BOOSTER.', category: 'Actitud' },
    { title: 'Muy amable', text: 'Un tipo muy amable, partidas rápidas. Definitivamente lo recomiendo.', category: 'Actitud' },
    { title: 'Actitud asombrosa', text: '¡Actitud asombrosa y desempeño fenomenal!', category: 'Actitud' },
    { title: 'Súper amigable', text: 'Súper amigable.', category: 'Actitud' },
    { title: 'Muy receptivo', text: 'Muy receptivo y excelente en el juego.', category: 'Actitud' },
    { title: 'Honestamente feliz', text: 'Juego por encima del promedio y muy amigable, para ser honesto estaba feliz porque fue muy positivo.', category: 'Actitud' },
    { title: 'Increíble', text: '¡Es increíble!', category: 'Actitud' },
    { title: '10/10 Lo mejor', text: 'El mejor booster que he visto. El tipo es un profesional.', category: 'General' },
    { title: 'Muy bueno', text: 'Muy bueno.', category: 'General' },
    { title: 'Gran compañero', text: 'Fue muy amable. Me dio excelentes sugerencias que ayudaron a mejorar mi juego en general.', category: 'General' },
    { title: 'Amables y profesionales', text: 'Fueron muy amables y profesionales.', category: 'General' },
    { title: 'Servicio A+', text: 'El segundo booster terminó el pedido en unas 12 horas. A+.', category: 'General' },
    { title: 'Muy confiable', text: 'Muy confiable y da buenos resultados.', category: 'General' },
    { title: 'Genial', text: '¡Genial!', category: 'General' },
    { title: 'Tipo increíble', text: 'Tipo increíble, lo recomiendo mucho para un aumento.', category: 'General' },
    { title: 'Súper bien', text: 'Súper bueno en el juego y muy amigable.', category: 'General' },
]

const categoryColor: Record<string, string> = {
    Desempeño: 'text-orange-400 border-orange-400/30',
    Actitud: 'text-rose-400 border-rose-400/30',
    General: 'text-red-400 border-red-400/30',
}

export default function ReviewCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setCurrentIndex((i) => (i + 1) % reviews.length)
        }, 5000)
        return () => clearInterval(id)
    }, [])

    const getVisible = () => {
        const len = reviews.length
        return [
            (currentIndex - 1 + len) % len,
            currentIndex,
            (currentIndex + 1) % len,
        ]
    }

    return (
        <div className="relative">
            <div className="flex items-center gap-3">
                {/* Prev */}
                <button
                    onClick={() => setCurrentIndex((i) => (i - 1 + reviews.length) % reviews.length)}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-red-800/30 text-red-400 font-black text-xl transition-colors hover:bg-red-800/15 shrink-0"
                    aria-label="Anterior"
                >
                    ‹
                </button>

                {/* Cards */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden">
                    {getVisible().map((idx, pos) => {
                        const review = reviews[idx]!
                        return (
                            <div
                                key={idx}
                                className={`bg-red-950/30 backdrop-blur-sm border border-red-800/20 rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300 hover:border-red-700/35 ${pos === 1
                                        ? 'md:scale-[1.03] shadow-[0_0_30px_rgba(180,20,20,.25)]'
                                        : 'hidden md:flex opacity-70'
                                    }`}
                            >
                                {/* Stars */}
                                <div className="flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, s) => (
                                        <svg key={s} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Category */}
                                <span className={`self-start font-primary text-[.65rem] font-bold uppercase tracking-[2px] px-2.5 py-0.5 rounded-full border ${categoryColor[review.category] ?? 'text-red-400 border-red-400/30'}`}>
                                    {review.category}
                                </span>

                                {/* Title */}
                                <h4 className="font-serif text-[.95rem] font-bold text-[#fff0f0] leading-tight">
                                    {review.title}
                                </h4>

                                {/* Text */}
                                <p className="font-primary text-[.82rem] text-[rgba(255,210,210,.65)] leading-relaxed flex-1">
                                    {review.text}
                                </p>
                            </div>
                        )
                    })}
                </div>

                {/* Next */}
                <button
                    onClick={() => setCurrentIndex((i) => (i + 1) % reviews.length)}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-red-800/30 text-red-400 font-black text-xl transition-colors hover:bg-red-800/15 shrink-0"
                    aria-label="Siguiente"
                >
                    ›
                </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-5">
                {reviews.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`rounded-full transition-all duration-200 ${i === currentIndex ? 'w-4 h-2 bg-red-500' : 'w-2 h-2 bg-red-800/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
