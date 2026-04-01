<script setup lang="ts">
defineProps<{ className?: string }>()
</script>

<template>
  <div
    :class="`relative z-10 opacity-0 animate-[textReveal_1s_cubic-bezier(.22,1,.36,1)_.3s_forwards] ${className ?? ''}`"
  >
    <!-- Eyebrow -->
    <div class="flex items-center gap-3 font-primary text-[.72rem] sm:text-[.78rem] tracking-[3px] sm:tracking-[4px] uppercase text-red-500 mb-4 sm:mb-5.5">
      <span class="w-6 sm:w-7 h-px bg-red-500 inline-block" />
      League of Legends Coaching
    </div>

    <!-- H1 -->
    <h1 class="font-serif text-[clamp(2rem,6vw,4.2rem)] font-bold leading-[1.1] uppercase mb-5 sm:mb-6.5">
      <span class="text-[#fff0f0]">
        Tu Camino a<br />Challenger Con El
      </span>
      <br />
      <span class="bg-linear-to-r from-red-500 via-rose-400 to-orange-300 bg-clip-text text-transparent">
        Mejor Coaching
      </span>
    </h1>

    <!-- Descripción -->
    <p class="font-primary text-[.95rem] sm:text-[1.02rem] leading-[1.8] text-[rgba(255,210,210,.7)] max-w-full sm:max-w-107.5 mb-8 sm:mb-10.5">
      Mejora tus mecánicas, visión de juego y mentalidad con planes de
      entrenamiento personalizados. Lleva tu juego al siguiente nivel y deja
      de estar estancado.
    </p>

    <!-- CTAs -->
    <div class="flex gap-3 flex-wrap">
      <a
        href="#precios"
        class="px-5 sm:px-7 py-3 sm:py-3.25 bg-transparent text-red-400 border border-red-600/35 cursor-pointer font-primary text-[.88rem] sm:text-[.95rem] font-semibold tracking-[2px] uppercase [clip-path:polygon(8px_0%,100%_0%,calc(100%-8px)_100%,0%_100%)] transition-[border-color,color,background-color] duration-250 hover:border-red-400 hover:text-red-300 hover:bg-red-500/10"
      >
        Ver Servicios
      </a>
    </div>
  </div>
</template>
