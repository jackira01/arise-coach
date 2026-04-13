'use client'

import { useEffect, useRef } from 'react'

const RUNE_PATHS = [
    'M10 2L12 8L18 8L13 12L15 18L10 14L5 18L7 12L2 8L8 8Z',
    'M10 0L12 7L19 7L14 11L16 18L10 13L4 18L6 11L1 7L8 7Z',
    'M5 0L10 5L15 0L15 5L20 10L15 10L15 15L10 10L5 15L5 10L0 10L5 5Z',
    'M10 1L13 7L20 7L15 12L17 19L10 15L3 19L5 12L0 7L7 7Z',
    'M10 2C10 2 14 6 18 6C18 10 14 14 10 18C6 14 2 10 2 6C6 6 10 2 10 2Z',
]

const RUNES = Array.from({ length: 38 }, (_, i) => ({
    id: i,
    top: `${(i * 17 + 3) % 100}%`,
    left: `${(i * 23 + 7) % 100}%`,
    size: 13 + (i % 17),
    duration: `${5 + (i % 10)}s`,
    delay: `${(i * 0.4) % 4}s`,
    opacity: 0.05 + ((i % 9) * 0.009),
    path: RUNE_PATHS[i % RUNE_PATHS.length]!,
}))

export default function RuneBackground() {
    return (
        <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
            {RUNES.map((r) => (
                <svg
                    key={r.id}
                    style={{
                        position: 'absolute',
                        top: r.top,
                        left: r.left,
                        width: r.size,
                        height: r.size,
                        opacity: r.opacity,
                        animation: `runeDrift ${r.duration} ease-in-out ${r.delay} infinite alternate`,
                    }}
                    viewBox="0 0 20 20"
                    fill="rgba(255,100,100,0.6)"
                >
                    <path d={r.path} />
                </svg>
            ))}
        </div>
    )
}
