<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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

const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const counts = ref(STATS.map(() => 0))
const shown = ref(STATS.map(() => false))

let observer: IntersectionObserver | null = null

function animateStat(index: number) {
  const duration = 1800
  let startTime: number | null = null
  const target = STATS[index]!.target
  const raf = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    counts.value[index] = Math.round(eased * target)
    if (progress < 1) requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry) return
      if (entry.isIntersecting) {
        visible.value = true
        STATS.forEach((_, i) => {
          setTimeout(() => {
            shown.value[i] = true
            animateStat(i)
          }, i * 150)
        })
        observer?.disconnect()
      }
    },
    { threshold: 0.25 },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="relative z-10 grid grid-cols-2 md:flex md:justify-center border-t border-violet-700/10 bg-white/55 backdrop-blur-[6px]"
  >
    <div
      v-for="(stat, i) in STATS"
      :key="stat.label"
      class="flex-1 max-w-65 py-7 sm:py-10 px-5 sm:px-11 text-center transition-[opacity,transform] duration-650 ease-[ease]"
      :class="[
        i % 2 === 0 ? 'border-r border-violet-700/12' : '',
        i < 2 ? 'border-b md:border-b-0 border-violet-700/12' : '',
        'md:border-r md:last:border-r-0 md:border-b-0',
      ]"
      :style="{ opacity: shown[i] ? 1 : 0, transform: shown[i] ? 'translateY(0)' : 'translateY(20px)' }"
    >
      <div class="font-primary text-[2.2rem] sm:text-[3rem] font-black bg-linear-to-br from-violet-700 to-blue-500 bg-clip-text text-transparent mb-1 sm:mb-2 leading-none">
        {{ formatNum(stat.target, counts[i] ?? 0) }}{{ stat.suffix }}
      </div>
      <div class="font-primary text-[.68rem] sm:text-[.78rem] tracking-[2px] sm:tracking-[2.5px] text-[rgba(60,30,100,.5)] uppercase font-semibold">
        {{ stat.label }}
      </div>
    </div>
  </section>
</template>
