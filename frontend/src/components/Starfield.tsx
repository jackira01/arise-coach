'use client'

import { useEffect, useRef } from 'react'

interface Star {
    x: number
    y: number
    r: number
    alpha: number
    speed: number
    dir: number
}

export default function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let rafId: number
        const stars: Star[] = []

        function resize() {
            if (!canvas) return
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        function initStars() {
            if (!canvas) return
            stars.length = 0
            for (let i = 0; i < 260; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: 0.4 + Math.random() * 1.2,
                    alpha: 0.04 + Math.random() * 0.96,
                    speed: 0.003 + Math.random() * 0.008,
                    dir: Math.random() > 0.5 ? 1 : -1,
                })
            }
        }

        function draw() {
            if (!canvas || !ctx) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (const s of stars) {
                s.alpha += s.speed * s.dir
                if (s.alpha >= 1 || s.alpha <= 0.04) s.dir *= -1
                ctx.beginPath()
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,220,220,${s.alpha})`
                ctx.fill()
            }
            rafId = requestAnimationFrame(draw)
        }

        resize()
        initStars()
        draw()

        window.addEventListener('resize', () => { resize(); initStars() })

        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    )
}
