'use client'

import { useState } from 'react'
import Image from 'next/image'

const RANKS = [
    { name: 'Iron', img: '/ranks/iron.png', glow: '#8B7355' },
    { name: 'Bronze', img: '/ranks/bronze.png', glow: '#cd7f32' },
    { name: 'Silver', img: '/ranks/silver.webp', glow: '#90a4ae' },
    { name: 'Gold', img: '/ranks/gold.png', glow: '#FFD700' },
    { name: 'Platinum', img: '/ranks/platinum.png', glow: '#00b4d8' },
    { name: 'Emerald', img: '/ranks/emerald.png', glow: '#3dba6a' },
    { name: 'Diamond', img: '/ranks/diamond.png', glow: '#4a9ee0' },
    { name: 'Master', img: '/ranks/master.png', glow: '#9b59b6' },
    { name: 'Grandmaster', img: '/ranks/grandmaster.png', glow: '#e74c3c' },
    { name: 'Challenger', img: '/ranks/challenger.png', glow: '#ffd600' },
]

const TIERS = ['IV', 'III', 'II', 'I']

export default function RankCarousel() {
    const [current, setCurrent] = useState(0)
    const [tier, setTier] = useState(0)

    const rank = RANKS[current]!

    return (
        <div className="flex flex-col items-center gap-6 py-8">
            {/* Main display */}
            <div
                className="relative w-48 h-48 flex items-center justify-center rounded-full bg-black/30 border border-white/10"
                style={{ boxShadow: `0 0 60px ${rank.glow}55` }}
            >
                <Image
                    src={rank.img}
                    alt={rank.name}
                    width={120}
                    height={120}
                    className="object-contain"
                    style={{ filter: `drop-shadow(0 0 20px ${rank.glow}88)` }}
                />
            </div>

            {/* Rank name */}
            <h3 className="font-serif text-xl font-bold uppercase text-[#fff0f0]">
                {rank.name} {TIERS[tier]}
            </h3>

            {/* Tier selector */}
            <div className="flex gap-2">
                {TIERS.map((t, i) => (
                    <button
                        key={t}
                        onClick={() => setTier(i)}
                        className={`px-3 py-1 rounded-full font-primary text-xs font-bold tracking-wider transition-all duration-200 ${tier === i
                                ? 'bg-red-600 text-white'
                                : 'bg-red-950/40 text-red-400 border border-red-800/30 hover:border-red-600/50'
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-6">
                <button
                    onClick={() => setCurrent((c) => (c - 1 + RANKS.length) % RANKS.length)}
                    className="w-10 h-10 rounded-full bg-red-950/50 border border-red-800/25 flex items-center justify-center text-red-400 hover:border-red-600/50 transition-all duration-200"
                >
                    ←
                </button>
                {/* Dots */}
                <div className="flex gap-1.5">
                    {RANKS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`rounded-full transition-all duration-200 ${i === current ? 'w-4 h-2 bg-red-500' : 'w-2 h-2 bg-red-800/50'
                                }`}
                        />
                    ))}
                </div>
                <button
                    onClick={() => setCurrent((c) => (c + 1) % RANKS.length)}
                    className="w-10 h-10 rounded-full bg-red-950/50 border border-red-800/25 flex items-center justify-center text-red-400 hover:border-red-600/50 transition-all duration-200"
                >
                    →
                </button>
            </div>
        </div>
    )
}
