'use client'

import { useEffect, useRef } from 'react'

type RevealDirection = 'left' | 'right' | 'up' | 'down' | 'fade' | 'default'

interface UseRevealOptions {
    direction?: RevealDirection
    delay?: number
    threshold?: number
}

export function useReveal<T extends HTMLElement = HTMLElement>(
    options: UseRevealOptions = {}
) {
    const ref = useRef<T>(null)
    const { direction = 'default', delay = 0, threshold = 0.12 } = options

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const hiddenClasses: string[] = ['opacity-0', 'transition-all', 'duration-700', 'ease-out']
        const visibleClasses = ['opacity-100', 'translate-x-0', 'translate-y-0']

        const dirClass: Record<RevealDirection, string> = {
            left: '-translate-x-12',
            right: 'translate-x-12',
            up: 'translate-y-10',
            down: '-translate-y-10',
            fade: '',
            default: 'translate-y-10',
        }

        const dirCls = dirClass[direction]
        const allHidden = dirCls ? [...hiddenClasses, dirCls] : hiddenClasses

        if (delay) el.style.transitionDelay = `${delay}ms`

        allHidden.forEach((c) => el.classList.add(c))
        visibleClasses.forEach((c) => el.classList.remove(c))

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry) return
                if (entry.isIntersecting) {
                    allHidden.forEach((c) => el.classList.remove(c))
                    visibleClasses.forEach((c) => el.classList.add(c))
                } else {
                    allHidden.forEach((c) => el.classList.add(c))
                    visibleClasses.forEach((c) => el.classList.remove(c))
                }
            },
            { threshold }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [direction, delay, threshold])

    return ref
}
