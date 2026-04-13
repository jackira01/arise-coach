<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'

let lenis: Lenis | null = null
let rafId: number | null = null

onMounted(() => {
  lenis = new Lenis({
    lerp: 0.1,           // suavidad (0 = instantáneo, 1 = nunca llega)
    smoothWheel: true,
    syncTouch: false,    // touch nativo en móvil
  })

  // Soporte para anchor links (#seccion) del Header
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      const id = (anchor as HTMLAnchorElement).getAttribute('href')!
      const target = document.querySelector(id)
      if (target && lenis) lenis.scrollTo(target as HTMLElement, { offset: -68 })
    })
  })

  function raf(time: number) {
    lenis!.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
  lenis?.destroy()
  lenis = null
})
</script>

<template>
  <div class="bg-[#080102] text-[#fff0f0] font-primary min-h-screen">
    <RouterView />
  </div>
</template>

<style scoped></style>
