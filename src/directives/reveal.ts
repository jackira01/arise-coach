import type { Directive, DirectiveBinding } from 'vue'

// ── Tipos ──────────────────────────────────────────────────────────────────
interface RevealEl extends HTMLElement {
    _revealObserver?: IntersectionObserver
}

type RevealModifiers = {
    left?: boolean
    right?: boolean
    up?: boolean   // entra desde abajo (por defecto)
    down?: boolean // entra desde arriba
    fade?: boolean // solo fade, sin traslación
}

// ── Clases de estado inicial por dirección ─────────────────────────────────
function getHiddenClasses(modifiers: RevealModifiers): string[] {
    const base = ['opacity-0', 'transition-all', 'duration-700', 'ease-out']

    if (modifiers.left) return [...base, '-translate-x-12']
    if (modifiers.right) return [...base, 'translate-x-12']
    if (modifiers.down) return [...base, '-translate-y-10']
    if (modifiers.fade) return [...base]
    // default: desde abajo hacia arriba
    return [...base, 'translate-y-10']
}

const VISIBLE_CLASSES = ['opacity-100', 'translate-x-0', 'translate-y-0']

function applyHidden(el: HTMLElement, modifiers: RevealModifiers) {
    VISIBLE_CLASSES.forEach((c) => el.classList.remove(c))
    getHiddenClasses(modifiers).forEach((c) => el.classList.add(c))
}

function applyVisible(el: HTMLElement, modifiers: RevealModifiers) {
    getHiddenClasses(modifiers).forEach((c) => el.classList.remove(c))
    VISIBLE_CLASSES.forEach((c) => el.classList.add(c))
}

// ── Directiva ──────────────────────────────────────────────────────────────
export const vReveal: Directive = {
    mounted(el: RevealEl, binding: DirectiveBinding) {
        const modifiers = binding.modifiers as RevealModifiers

        // delay opcional por binding.value (ej. v-reveal="200" → 200ms)
        const delay: number = typeof binding.value === 'number' ? binding.value : 0
        if (delay) el.style.transitionDelay = `${delay}ms`

        // Estado inicial oculto
        applyHidden(el, modifiers)

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                if (!entry) return
                if (entry.isIntersecting) {
                    applyVisible(el, modifiers)
                } else {
                    // Revertir solo si el elemento salió (permite re-animación en scroll)
                    applyHidden(el, modifiers)
                }
            },
            { threshold: 0.12 },
        )

        observer.observe(el)
        el._revealObserver = observer
    },

    unmounted(el: RevealEl) {
        el._revealObserver?.disconnect()
        delete el._revealObserver
    },
}
