'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
    { target: 500, suffix: '+', label: 'Estudiantes Coached' },
    { target: 92, suffix: '%', label: 'Tasa de Mejora' },
    { target: 15, suffix: '+', label: 'Coaches Challenger' },
    { target: 3500, suffix: '+', label: 'Horas de Sesión' },
]

function formatNum(target: number, current: number): string {
    if (target >= 1000 && current >= 1000) {
        const k = (current / 1000).toFixed(1)
        return (k.endsWith('.0') ? k.slice(0, -2) : k) + 'K'
    }
    return String(current)
}

export default function Stats() {
    const sectionRef = useRef<HTMLElement>(null)
    const [counts, setCounts] = useState(STATS.map(() => 0))
    const [shown, setShown] = useState(STATS.map(() => false))

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) return
                observer.disconnect()
                STATS.forEach((stat, i) => {
                    setTimeout(() => {
                        setShown((prev) => { const n = [...prev]; n[i] = true; return n })
                        const duration = 1800
                        let startTime: number | null = null
                        const raf = (timestamp: number) => {
                            if (!startTime) startTime = timestamp
                            const progress = Math.min((timestamp - startTime) / duration, 1)
                            const eased = 1 - Math.pow(1 - progress, 3)
                            setCounts((prev) => { const n = [...prev]; n[i] = Math.round(eased * stat.target); return n })
                            if (progress < 1) requestAnimationFrame(raf)
                        }
                        requestAnimationFrame(raf)
                    }, i * 150)
                })
            },
            { threshold: 0.25 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative z-10 grid grid-cols-2 md:flex md:justify-center border-t border-red-900/30 bg-[#0a0102]/85 backdrop-blur-[6px]"
        >
            {STATS.map((stat, i) => (
                <div
                    key={stat.label}
                    className={`flex-1 max-w-65 py-7 sm:py-10 px-5 sm:px-11 text-center transition-[opacity,transform] duration-650 ease-[ease]
            ${i % 2 === 0 ? 'border-r border-red-900/25' : ''}
            ${i < 2 ? 'border-b md:border-b-0 border-red-900/25' : ''}
            md:border-r md:last:border-r-0 md:border-b-0`}
                    style={{ opacity: shown[i] ? 1 : 0, transform: shown[i] ? 'translateY(0)' : 'translateY(20px)' }}
                >
                    <div className="font-primary text-[2.2rem] sm:text-[3rem] font-black bg-linear-to-br from-red-400 to-rose-500 bg-clip-text text-transparent mb-1 sm:mb-2 leading-none">
                        {formatNum(stat.target, counts[i] ?? 0)}{stat.suffix}
                    </div>
                    <div className="font-primary text-[.68rem] sm:text-[.78rem] tracking-[2px] sm:tracking-[2.5px] text-[rgba(255,180,180,.55)] uppercase font-semibold">
                        {stat.label}
                    </div>
                </div>
            ))}
        </section>
    )
}
