<script setup lang="ts">
import Header from '@/components/Header.vue'
import HeroText from '@/components/HeroText.vue'
import HeroChart from '@/components/HeroChart.vue'
import Stats from '@/components/Stats.vue'

// ── PRECIOS ────────────────────────────────────────────────
const INCLUDED_ALL = [
  'Retroalimentación personalizada',
  'Coach en vivo',
  'Entrenamiento personalizado',
  'Análisis previo',
  'Videos personalizados de mejoras',
  'Teorías aplicadas al juego',
  'Práctica guiada',
  'Entendimiento analítico pre y post game',
]

const PLANS = [
  {
    name: 'Silver Pack',
    badge: '',
    price: '200 USD',
    period: '/ mes',
    highlight: false,
    rankImg: '/ranks/silver.webp',
    rankGlow: '#90a4ae',
    detail1: '8 hrs / semana',
    detail2: '5 games',
    detail3: '6 – 8 temas',
    description: 'El punto de partida ideal para comenzar a mejorar con estructura y guía profesional.',
    cta: 'Elegir Silver',
    guarantee: false,
  },
  {
    name: 'Esmerald Pack',
    badge: '',
    price: '300 USD',
    period: '/ mes',
    highlight: false,
    rankImg: '/ranks/emerald.png',
    rankGlow: '#3dba6a',
    detail1: '12 hrs / semana',
    detail2: '10 games',
    detail3: '8 – 10 temas',
    description: 'Para jugadores que quieren progresar de forma constante y afianzar sus bases.',
    cta: 'Elegir Esmerald',
    guarantee: false,
  },
  {
    name: 'Diamond Pack',
    badge: 'RECOMENDADO',
    price: '500 USD',
    period: '/ mes',
    highlight: true,
    rankImg: '/ranks/diamond.png',
    rankGlow: '#4a9ee0',
    detail1: '18 hrs / semana',
    detail2: '15 games',
    detail3: '9 – 10 temas',
    description: 'El equilibrio perfecto entre intensidad y resultados para escalar de rango rápidamente.',
    cta: 'Elegir Diamond',
    guarantee: false,
  },
  {
    name: 'Chall Pack',
    badge: 'RETADOR',
    price: '800 USD',
    period: '/ mes',
    highlight: false,
    rankImg: '/ranks/challenger.png',
    rankGlow: '#ffd600',
    detail1: '32 hrs / semana',
    detail2: '20 games',
    detail3: '12 – 14 temas',
    description: 'El programa más intensivo. Máxima dedicación para quienes van en serio al Retador.',
    cta: 'Ir al Retador',
    guarantee: true,
  },
]

const DISCORD_USER_ID = '1385138655139594283'

function discordUrl(): string {
  return `https://discord.com/users/${DISCORD_USER_ID}`
}

// ── TEMAS ─────────────────────────────────────────────────
const TOPIC_CATEGORIES = [
  {
    title: 'Mentalidad y Control Emocional',
    icon: '🧠',
    topics: [
      'Cómo dejar el tilt',
      'Mentalidad para rankeds',
      'Control emocional en partidas perdidas',
      'Cómo no rendirse (mentalidad comeback)',
      'Manejo de la frustración',
      'Confianza en tus decisiones',
      'Evitar el autosabotaje',
      'Cómo jugar bajo presión',
      'Mentalidad de mejora continua',
      'Cómo aprender de tus derrotas',
    ],
  },
  {
    title: 'Macro Game',
    icon: '🗺️',
    topics: [
      'Cuándo hacer objetivos (dragón, barón)',
      'Rotaciones eficientes',
      'Control de visión (wards)',
      'Prioridad de líneas',
      'Cómo cerrar partidas',
      'Shotcalling básico',
      'Cómo jugar con ventaja',
      'Cómo jugar desde atrás',
      'Map awareness (lectura del mapa)',
      'Control de tempo',
    ],
  },
  {
    title: 'Micro Game y Mecánicas',
    icon: '⚡',
    topics: [
      'Mejora de reflejos',
      'Posicionamiento en teamfights',
      'Uso correcto de habilidades',
      'Trading en línea',
      'Farming (CS perfecto)',
      'Uso de summoners',
      'Cómo kitear correctamente',
      'Mecánicas por rol (top, jungle, mid, adc, support)',
      'Mejora del early game',
      'Dominio del champion pool',
    ],
  },
  {
    title: 'Estrategia de Ranked',
    icon: '🏆',
    topics: [
      'Cómo trakear',
      'Errores comunes por elo',
      'Cómo carrear partidas',
      'Importancia del champion pool',
      'Dodge inteligente',
      'Cómo aprovechar picks fuertes',
      'Win conditions',
      'Cómo impactar el mapa',
      'Jugar solo vs dúo',
      'Zonas de control',
    ],
  },
]
</script>

<template>
  <!-- Fondo fijo -->
  <div
    class="fixed inset-0 z-0 pointer-events-none"
    style="background: radial-gradient(ellipse 60% 55% at 75% 30%, rgba(160,10,10,.5) 0%, transparent 65%), radial-gradient(ellipse 50% 65% at 15% 75%, rgba(100,5,5,.55) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 85% 85%, rgba(80,0,0,.35) 0%, transparent 65%)"
  />

  <Header />

  <!-- ══════════════════ HERO ══════════════════ -->
  <section
    id="inicio"
    class="relative w-full min-h-screen grid grid-cols-1 md:grid-cols-2 items-center pt-16 px-5 sm:px-8 lg:px-13 pb-10 md:pb-0 overflow-hidden z-[2] gap-8 md:gap-0"
  >
    <HeroText class-name="md:pl-10" />
    <div class="relative w-full flex items-center justify-center order-first md:order-last py-4 md:py-8 md:pl-6">
      <div class="w-[85%] sm:w-[70%] md:w-full" style="height: min(85vh, 650px)">
        <HeroChart />
      </div>
    </div>
  </section>

  <!-- STATS -->
  <Stats />

  <!-- ══════════════════ SERVICIOS ══════════════════ -->
  <section id="servicios" class="relative z-[2] py-16 md:py-28 px-5 sm:px-8 lg:px-13">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12 md:mb-20">
        <div class="flex items-center justify-center gap-3 font-primary text-[.78rem] tracking-[4px] uppercase text-red-500 mb-4">
          <span class="w-7 h-px bg-red-500 inline-block" />
          Nuestros Servicios
          <span class="w-7 h-px bg-red-500 inline-block" />
        </div>
        <h2 class="font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold uppercase text-[#fff0f0]">
          ¿Qué incluye el
          <span class="bg-linear-to-r from-red-500 via-rose-400 to-orange-300 bg-clip-text text-transparent">Coaching?</span>
        </h2>
        <p class="font-primary text-[1rem] text-[rgba(255,210,210,.6)] mt-4 max-w-2xl mx-auto leading-relaxed">
          Cada plan incluye un conjunto completo de servicios diseñados para maximizar tu progreso en League of Legends.
        </p>
      </div>

      <!-- Service cards grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div
          v-for="(item, i) in INCLUDED_ALL"
          :key="item"
          v-reveal="i * 60"
          class="bg-red-950/30 backdrop-blur-sm border border-red-800/20 rounded-xl p-5 flex items-start gap-3 shadow-sm hover:shadow-red-950/60 hover:border-red-600/30 transition-all duration-300"
        >
            <span class="text-red-400 mt-0.5 shrink-0">
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/>
            </svg>
          </span>
          <span class="font-primary text-[.9rem] font-semibold text-[#ffe8e8] leading-snug">{{ item }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════ PRECIOS ══════════════════ -->
  <section id="precios" class="relative z-[2] py-16 md:py-28 px-5 sm:px-8 lg:px-13">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div v-reveal class="text-center mb-12 md:mb-20">
        <div class="flex items-center justify-center gap-3 font-primary text-[.78rem] tracking-[4px] uppercase text-red-500 mb-4">
          <span class="w-7 h-px bg-red-500 inline-block" />
          Planes
          <span class="w-7 h-px bg-red-500 inline-block" />
        </div>
        <h2 class="font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold uppercase text-[#fff0f0]">
          Elige Tu
          <span class="bg-linear-to-r from-red-500 via-rose-400 to-orange-300 bg-clip-text text-transparent">Plan</span>
        </h2>
        <p class="font-primary text-[1rem] text-[rgba(255,210,210,.6)] mt-4 max-w-xl mx-auto leading-relaxed">
          Todos los planes incluyen los mismos beneficios. La diferencia está en la intensidad de las sesiones.
        </p>
      </div>

      <!-- Plan cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        <div
          v-for="(plan, i) in PLANS"
          :key="plan.name"
          v-reveal="i * 100"
          :class="[
            'relative flex flex-col rounded-2xl p-6 sm:p-7 border transition-all duration-300',
            plan.highlight
              ? 'bg-linear-to-br from-red-800 to-red-600 border-red-500/40 shadow-[0_0_60px_rgba(180,20,20,.45)] lg:scale-105'
              : 'bg-red-950/30 backdrop-blur-sm border-red-800/20 hover:shadow-red-950/60 hover:border-red-700/35 shadow-[0_0_30px_rgba(0,0,0,.5)]'
          ]"
        >
          <!-- Badge -->
          <div
            v-if="plan.badge"
            :class="[
              'absolute -top-3 left-1/2 -translate-x-1/2 font-primary text-[.62rem] font-black tracking-[3px] uppercase px-4 py-1 rounded-full shadow-lg whitespace-nowrap',
              plan.highlight
                ? 'bg-linear-to-r from-cyan-400 to-blue-400 text-white'
                : 'bg-linear-to-r from-yellow-400 to-amber-400 text-[#1a0f35]'
            ]"
          >
            {{ plan.badge }}
          </div>

          <!-- Rank icon -->
          <div class="flex justify-center mb-4">
            <img
              :src="plan.rankImg"
              :alt="plan.name"
              class="w-16 h-16 object-contain"
              :style="`filter: drop-shadow(0 0 14px ${plan.rankGlow}88)`"
            />
          </div>

          <!-- Plan name -->
          <h3 :class="['font-serif text-[1.35rem] font-bold uppercase text-center leading-tight mb-5', plan.highlight ? 'text-white' : 'text-[#fff0f0]']">
            {{ plan.name }}
          </h3>

          <!-- Details -->
          <div :class="['flex flex-col gap-1.5 mb-4', plan.highlight ? 'text-red-100' : 'text-[rgba(255,210,210,.8)]']">
            <div class="flex items-center gap-2 font-primary text-[.85rem] font-semibold">
              <span>⏱</span> {{ plan.detail1 }}
            </div>
            <div class="flex items-center gap-2 font-primary text-[.85rem] font-semibold">
              <span>🎮</span> {{ plan.detail2 }}
            </div>
            <div class="flex items-center gap-2 font-primary text-[.85rem] font-semibold">
              <span>📚</span> {{ plan.detail3 }} temas
            </div>
          </div>

          <!-- Divider -->
          <div :class="['h-px mb-4', plan.highlight ? 'bg-white/20' : 'bg-red-800/25']" />

          <!-- Price -->
          <div class="text-center mb-4">
            <span :class="['font-primary text-[2.2rem] font-black leading-none', plan.highlight ? 'text-white' : 'text-[#fff0f0]']">{{ plan.price }}</span>
            <span :class="['font-primary text-[.85rem] ml-1', plan.highlight ? 'text-white/60' : 'text-[rgba(255,200,200,.45)]']">{{ plan.period }}</span>
          </div>

          <!-- Description -->
          <p :class="['font-primary text-[.82rem] leading-relaxed text-center mb-6 flex-1', plan.highlight ? 'text-white/75' : 'text-[rgba(255,200,200,.6)]']">
            {{ plan.description }}
          </p>

          <!-- Guarantee badge -->
        

          <!-- CTA -->
          <a
            :href="discordUrl()"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'w-full py-3 font-primary text-[.87rem] font-bold tracking-[2px] uppercase rounded-xl cursor-pointer transition-all duration-250 text-center block',
              plan.highlight
                ? 'bg-white text-red-700 hover:bg-white/90 shadow-[0_4px_20px_rgba(0,0,0,.2)]'
                : 'bg-linear-to-br from-red-700 to-red-500 text-white hover:brightness-110 shadow-[0_0_20px_rgba(180,20,20,.35)]'
            ]"
          >
            {{ plan.cta }}
          </a>
        </div>
      </div>

      <!-- Guarantee banner -->
      <div v-reveal class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 bg-amber-950/40 backdrop-blur-sm border border-amber-400/25 rounded-2xl px-8 py-5 shadow-sm max-w-3xl mx-auto">
        <div class="text-3xl shrink-0">🛡️</div>
        <div>
          <p class="font-primary text-[.82rem] font-black uppercase tracking-[2px] text-amber-400 mb-0.5">Servicio 100% Especializado y Garantizado</p>
          <p class="font-primary text-[.85rem] text-[rgba(200,185,240,.65)] leading-snug">
            Compra el <strong class="text-amber-400">Chall Pack</strong> por 1 mes: si no alcanzas tu meta, <strong class="text-white">te devolvemos el dinero</strong>.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════ TEMAS QUE SE VEN ══════════════════ -->
  <section class="relative z-[2] py-16 md:py-28 px-5 sm:px-8 lg:px-13">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div v-reveal class="text-center mb-12 md:mb-20">
        <div class="flex items-center justify-center gap-3 font-primary text-[.78rem] tracking-[4px] uppercase text-red-500 mb-4">
          <span class="w-7 h-px bg-red-500 inline-block" />
          Currículo
          <span class="w-7 h-px bg-red-500 inline-block" />
        </div>
        <h2 class="font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold uppercase text-[#fff0f0]">
          Temas que
          <span class="bg-linear-to-r from-red-500 via-rose-400 to-orange-300 bg-clip-text text-transparent">se ven</span>
        </h2>
        <p class="font-primary text-[1rem] text-[rgba(255,210,210,.6)] mt-4 max-w-2xl mx-auto leading-relaxed">
          Un temario completo que cubre todas las dimensiones del juego competitivo.
        </p>
      </div>

      <!-- Category cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(cat, i) in TOPIC_CATEGORIES"
          :key="cat.title"
          v-reveal="i * 120"
          class="bg-red-950/30 backdrop-blur-sm border border-red-800/20 rounded-2xl p-8 shadow-sm hover:shadow-red-950/50 hover:border-red-700/30 transition-all duration-300"
        >
          <div class="flex items-center gap-3 mb-6">
            <span class="text-2xl">{{ cat.icon }}</span>
            <h3 class="font-serif text-[1.05rem] font-bold uppercase tracking-[1px] text-[#fff0f0]">{{ cat.title }}</h3>
          </div>
          <ul class="grid grid-cols-1 gap-2">
            <li
              v-for="topic in cat.topics"
              :key="topic"
              class="flex items-center gap-2.5 font-primary text-[.85rem] text-[rgba(255,210,210,.7)]"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              {{ topic }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════ SOBRE NOSOTROS ══════════════════ -->
  <section id="sobre-nosotros" class="relative z-[2] py-16 md:py-28 px-5 sm:px-8 lg:px-13">
    <div class="max-w-4xl mx-auto text-center">
      <div v-reveal class="flex items-center justify-center gap-3 font-primary text-[.78rem] tracking-[4px] uppercase text-red-500 mb-4">
        <span class="w-7 h-px bg-red-500 inline-block" />
        Sobre Nosotros
        <span class="w-7 h-px bg-red-500 inline-block" />
      </div>
      <h2 v-reveal="100" class="font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold uppercase text-[#fff0f0] mb-6">
        Coaches de
        <span class="bg-linear-to-r from-red-500 via-rose-400 to-orange-300 bg-clip-text text-transparent">Élite</span>
      </h2>
      <p v-reveal="200" class="font-primary text-[1.05rem] leading-[1.9] text-[rgba(255,210,210,.65)] max-w-2xl mx-auto mb-10">
        Somos un equipo de coaches con rango Challenger dedicados a transformar tu forma de jugar League of Legends.
        Combinamos análisis estadístico, psicología del rendimiento y entrenamiento práctico para llevarte al siguiente nivel.
      </p>
      <div class="flex flex-wrap gap-4 justify-center">
        <div
          v-for="(val, i) in ['Resultados Garantizados', 'Coaches Challenger', 'Método Probado', 'Comunidad Activa']"
          :key="val"
          v-reveal="300 + i * 80"
          class="px-5 py-2.5 bg-red-950/40 border border-red-800/25 rounded-full font-primary text-[.82rem] font-semibold text-red-400 tracking-[1px] backdrop-blur-sm"
        >
          {{ val }}
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════ REDES SOCIALES ══════════════════ -->
  <section class="relative z-[2] py-16 md:py-28 px-5 sm:px-8 lg:px-13">
    <div class="max-w-4xl mx-auto text-center">
      <div v-reveal class="flex items-center justify-center gap-3 font-primary text-[.78rem] tracking-[4px] uppercase text-red-500 mb-4">
        <span class="w-7 h-px bg-red-500 inline-block" />
        Síguenos
        <span class="w-7 h-px bg-red-500 inline-block" />
      </div>
      <h2 v-reveal="100" class="font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold uppercase text-[#fff0f0] mb-4">
        Nuestras
        <span class="bg-linear-to-r from-red-500 via-rose-400 to-orange-300 bg-clip-text text-transparent">Redes</span>
      </h2>
      <p v-reveal="150" class="font-primary text-[1rem] text-[rgba(255,210,210,.6)] mb-12 max-w-xl mx-auto">
        Contenido, streams y clips de ranked. Síguenos para no perderte nada.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
        <!-- TikTok -->
        <a
          v-reveal="200"
          href="https://www.tiktok.com/@arisedxr"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-4 bg-red-950/30 backdrop-blur-sm border border-red-800/20 rounded-2xl px-8 py-5 w-full sm:w-auto hover:border-red-600/40 hover:shadow-[0_0_30px_rgba(180,20,20,.3)] transition-all duration-300"
        >
          <span class="shrink-0 text-[#fff0f0] group-hover:text-red-400 transition-colors duration-300">
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/>
            </svg>
          </span>
          <div class="text-left">
            <p class="font-primary text-[.7rem] uppercase tracking-[2px] text-[rgba(255,180,180,.5)] mb-0.5">TikTok</p>
            <p class="font-primary text-[.95rem] font-bold text-[#fff0f0] group-hover:text-red-400 transition-colors duration-300">@arisedxr</p>
          </div>
        </a>

        <!-- Twitch -->
        <a
          v-reveal="300"
          href="https://www.twitch.tv/arisexr"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-4 bg-red-950/30 backdrop-blur-sm border border-red-800/20 rounded-2xl px-8 py-5 w-full sm:w-auto hover:border-red-600/40 hover:shadow-[0_0_30px_rgba(180,20,20,.3)] transition-all duration-300"
        >
          <span class="shrink-0 text-[#fff0f0] group-hover:text-red-400 transition-colors duration-300">
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
            </svg>
          </span>
          <div class="text-left">
            <p class="font-primary text-[.7rem] uppercase tracking-[2px] text-[rgba(255,180,180,.5)] mb-0.5">Twitch</p>
            <p class="font-primary text-[.95rem] font-bold text-[#fff0f0] group-hover:text-red-400 transition-colors duration-300">arisexr</p>
          </div>
        </a>

        <!-- YouTube -->
        <a
          v-reveal="400"
          href="https://www.youtube.com/channel/UCmz7fGX6fhIkbBT7XETgsPA"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-4 bg-red-950/30 backdrop-blur-sm border border-red-800/20 rounded-2xl px-8 py-5 w-full sm:w-auto hover:border-red-600/40 hover:shadow-[0_0_30px_rgba(180,20,20,.3)] transition-all duration-300"
        >
          <span class="shrink-0 text-[#fff0f0] group-hover:text-red-400 transition-colors duration-300">
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </span>
          <div class="text-left">
            <p class="font-primary text-[.7rem] uppercase tracking-[2px] text-[rgba(255,180,180,.5)] mb-0.5">YouTube</p>
            <p class="font-primary text-[.95rem] font-bold text-[#fff0f0] group-hover:text-red-400 transition-colors duration-300">AriseXR</p>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="relative z-[2] border-t border-red-900/25 py-8 px-5 sm:px-8 lg:px-13 text-center">
    <p class="font-primary text-[.8rem] text-[rgba(255,180,180,.3)] tracking-[1px]">
      © {{ new Date().getFullYear() }} Tecnologia COL. Todos los derechos reservados.
    </p>
    <p class="font-primary text-[.75rem] text-[rgba(255,180,180,.2)] tracking-[1px] mt-1">
      Desarrollado por
      <a
        href="https://tecnologiacol.lat/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-[rgba(255,180,180,.4)] hover:text-red-400 transition-colors duration-300 underline underline-offset-2"
      >Tecnologia COL</a>
    </p>
  </footer>
</template>
