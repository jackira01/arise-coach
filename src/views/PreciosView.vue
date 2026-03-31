<script setup lang="ts">
import { ref, computed } from 'vue'
import Header from '@/components/Header.vue'
import RankCarousel from '@/components/RankCarousel.vue'

const RANKS = [
  { name: 'Sin Clasificar', img: '/ranks/Unranked.webp', glow: '#bdbdbd', hasTiers: false },
  { name: 'Hierro', img: '/ranks/iron.png', glow: '#c26e55', hasTiers: true },
  { name: 'Bronce', img: '/ranks/bronce.png', glow: '#d4944d', hasTiers: true },
  { name: 'Plata', img: '/ranks/silver.webp', glow: '#90a4ae', hasTiers: true },
  { name: 'Oro', img: '/ranks/gold.webp', glow: '#d4af37', hasTiers: true },
  { name: 'Platino', img: '/ranks/platimun.png', glow: '#4dd0d0', hasTiers: true },
  { name: 'Esmeralda', img: '/ranks/emerald.png', glow: '#3dba6a', hasTiers: true },
  { name: 'Diamante', img: '/ranks/diamond.png', glow: '#4a9ee0', hasTiers: true },
  { name: 'Maestro', img: '/ranks/master.webp', glow: '#ab47bc', hasTiers: false },
  { name: 'Gran Maestro', img: '/ranks/grandmaster.png', glow: '#ef5350', hasTiers: false },
  { name: 'Retador', img: '/ranks/challenger.png', glow: '#ffd600', hasTiers: false },
]

const ROMAN_TIERS = ['IV', 'III', 'II', 'I']

const SKILLS = ['Oleadas', 'Esquiva y kiteo', 'Macro game', 'Micro game', 'Objetivos', 'Farmeo', 'Gankeos']

const SERVERS = ['LAN', 'LAS', 'NA', 'EUW', 'EUNE', 'KR', 'BR', 'JP', 'TR', 'RU', 'OCE']

const ROLES = [
  { id: 'top', label: 'Top' },
  { id: 'jungle', label: 'Jungla' },
  { id: 'mid', label: 'Medio' },
  { id: 'adc', label: 'Bot / ADC' },
  { id: 'support', label: 'Soporte' },
]

const HOUR_OPTIONS = [
  { value: 0.5, label: '30 min', display: '30 min / mes' },
  { value: 1, label: '1 hora', display: '1 hora / mes' },
  { value: 1.5, label: '1.5 horas', display: '1.5 horas / mes' },
  { value: 2, label: '2 horas', display: '2 horas / mes' },
]

const RANK_RATE = [8, 10, 12, 15, 18, 20, 22, 25, 27, 35, 45, 60]

const TABS = ['Coach', 'Boost de Liga'] as const
type Tab = (typeof TABS)[number]

const SERVICE_CONTENT: Record<Tab, { title: string; desc: string; emoji: string }> = {
  Coach: {
    title: 'Sesiones de Coaching Personalizado',
    desc: 'Aprende junto a coaches Challenger con sesiones 1 a 1 adaptadas a tu estilo de juego. Mejora tus mecánicas, visión de mapa y toma de decisiones.',
    emoji: '🎓',
  },
  'Boost de Liga': {
    title: 'Boost de Liga Profesional',
    desc: 'Mejora tu ranking con nuestros boosters profesionales de élite. Proceso seguro, discreto y garantizado. Llega al rango que mereces.',
    emoji: '🚀',
  },
}

interface ServiceState {
  rankIndex: number
  rankTier: number
  rankTargetIndex: number
  rankTargetTier: number
  skills: string[]
  server: string
  roles: string[]
  hours: number
  discount: string
}

function defaultState(): ServiceState {
  return {
    rankIndex: 0,
    rankTier: 0,
    rankTargetIndex: 1,
    rankTargetTier: 0,
    skills: [],
    server: 'LAN',
    roles: [],
    hours: 1,
    discount: '',
  }
}

const activeTab = ref<Tab>('Coach')
const states = ref<Record<Tab, ServiceState>>({
  Coach: defaultState(),
  'Boost de Liga': defaultState(),
})

const s = computed(() => states.value[activeTab.value])

function update(patch: Partial<ServiceState>) {
  states.value[activeTab.value] = { ...states.value[activeTab.value], ...patch }
}

function toggleSkill(skill: string) {
  const skills = s.value.skills.includes(skill)
    ? s.value.skills.filter((x) => x !== skill)
    : [...s.value.skills, skill]
  update({ skills })
}

function toggleRole(roleId: string) {
  if (s.value.roles.includes(roleId)) {
    update({ roles: s.value.roles.filter((x) => x !== roleId) })
  } else if (s.value.roles.length < 2) {
    update({ roles: [...s.value.roles, roleId] })
  }
}

const isBoost = computed(() => activeTab.value === 'Boost de Liga')
const content = computed(() => SERVICE_CONTENT[activeTab.value])

const baseRate = computed(() => RANK_RATE[s.value.rankIndex] ?? 10)
const subtotal = computed(() => Math.round(baseRate.value * s.value.hours * 100) / 100)
const discountValid = computed(() => s.value.discount.trim().toLowerCase() === 'coach10')
const discountAmt = computed(() => (discountValid.value ? Math.round(subtotal.value * 0.1 * 100) / 100 : 0))
const total = computed(() => Math.max(0, subtotal.value - discountAmt.value))

function rankDisplayName(idx: number, tier: number) {
  const r = RANKS[idx]
  return r.hasTiers ? `${r.name} ${ROMAN_TIERS[tier]}` : r.name
}
</script>

<template>
  <!-- Fondo fijo -->
  <div
    class="fixed inset-0 z-0 pointer-events-none"
    style="background: radial-gradient(ellipse 55% 55% at 75% 35%, rgba(60,30,120,.36) 0%, transparent 70%), radial-gradient(ellipse 45% 65% at 20% 75%, rgba(10,30,90,.38) 0%, transparent 70%), radial-gradient(ellipse 35% 40% at 85% 85%, rgba(20,8,60,.28) 0%, transparent 70%)"
  />

  <Header />

  <main class="relative z-10 min-h-screen pt-17">

    <!-- TABS -->
    <div class="sticky top-17 z-50 flex justify-center border-b border-violet-700/15 bg-white/70 backdrop-blur-[10px]">
      <button
        v-for="tab in TABS"
        :key="tab"
        @click="activeTab = tab"
        :class="`px-12 py-4 font-primary text-sm font-bold tracking-[2.5px] uppercase transition-all duration-250 border-b-2 ${activeTab === tab ? 'border-violet-600 text-violet-700' : 'border-transparent text-[rgba(30,20,70,.45)] hover:text-violet-600'}`"
      >
        {{ tab }}
      </button>
    </div>

    <div class="max-w-7xl mx-auto px-8 py-12">

      <!-- ENCABEZADO DEL SERVICIO -->
      <div class="flex items-center justify-between gap-12 mb-14">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3 font-primary text-[.75rem] tracking-[4px] uppercase text-violet-600 mb-4">
            <span class="w-6 h-px bg-violet-600 inline-block" />
            {{ activeTab }}
          </div>
          <h2 class="font-primary text-[clamp(1.9rem,3.2vw,3rem)] font-black leading-none uppercase mb-5 text-[#0d0820]">
            {{ content.title }}
          </h2>
          <p class="font-primary text-[1rem] leading-[1.8] text-[rgba(45,25,80,.65)] max-w-lg">
            {{ content.desc }}
          </p>
        </div>

        <div class="w-72 h-52 shrink-0">
          <div
            class="w-full h-full rounded-2xl border border-violet-700/20 flex items-center justify-center"
            style="background: linear-gradient(135deg, rgba(90,58,214,.1) 0%, rgba(37,99,235,.07) 100%); backdrop-filter: blur(8px)"
          >
            <div class="flex flex-col items-center gap-3 opacity-60">
              <div class="text-7xl select-none">{{ content.emoji }}</div>
              <div class="font-primary text-xs tracking-[3px] uppercase text-[rgba(60,30,100,.65)]">{{ activeTab }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- GRID PRINCIPAL -->
      <div class="grid grid-cols-[1fr_380px] gap-8 items-start">

        <!-- COLUMNA IZQUIERDA -->
        <div class="flex flex-col gap-6">

          <!-- ══ COACH ══ -->
          <template v-if="!isBoost">
            <!-- Rango + Habilidades -->
            <div class="grid grid-cols-2 gap-6 items-start">
              <!-- Card Rango -->
              <div
                class="rounded-xl border border-violet-700/15 overflow-hidden"
                :style="{ background: `linear-gradient(to bottom, ${RANKS[s.rankIndex].glow}80 0%, transparent 50%), rgba(255,255,255,0.68)`, backdropFilter: 'blur(10px)' }"
              >
                <div class="px-5 py-4 border-b border-violet-700/10 flex items-center justify-between">
                  <div class="font-primary font-bold text-sm tracking-[2px] uppercase text-[#0d0820]">Rango Actual</div>
                </div>
                <div class="p-5">
                  <RankCarousel
                    :ranks="RANKS"
                    :rank-index="s.rankIndex"
                    :rank-tier="s.rankTier"
                    :show-tiers="false"
                    :large="true"
                    @update:rank-index="(i) => update({ rankIndex: i })"
                    @update:rank-tier="(t) => update({ rankTier: t })"
                  />
                </div>
              </div>

              <!-- Card Habilidades -->
              <div class="rounded-xl border border-violet-700/15 overflow-hidden" style="background: rgba(255,255,255,0.68); backdrop-filter: blur(10px)">
                <div class="px-5 py-4 border-b border-violet-700/10 flex items-center justify-between">
                  <div class="font-primary font-bold text-sm tracking-[2px] uppercase text-[#0d0820]">Habilidades</div>
                  <div class="font-primary text-xs text-[rgba(30,20,70,.4)]">Selecciona las que te interesan</div>
                </div>
                <div class="p-5">
                  <div class="flex flex-wrap gap-2.5">
                    <button
                      v-for="skill in SKILLS"
                      :key="skill"
                      @click="toggleSkill(skill)"
                      :class="`px-4 py-2 font-primary text-xs font-semibold tracking-[1.5px] uppercase transition-all duration-200 border ${s.skills.includes(skill) ? 'bg-violet-600 text-white border-violet-600 shadow-[0_0_14px_rgba(124,58,237,.35)]' : 'bg-transparent text-[rgba(30,20,70,.6)] border-violet-700/25 hover:border-violet-600 hover:text-violet-700'}`"
                      style="clip-path: polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)"
                    >
                      {{ skill }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Servidor -->
            <div class="rounded-xl border border-violet-700/15 overflow-hidden" style="background: rgba(255,255,255,0.68); backdrop-filter: blur(10px)">
              <div class="px-5 py-4 border-b border-violet-700/10">
                <div class="font-primary font-bold text-sm tracking-[2px] uppercase text-[#0d0820]">Servidor</div>
              </div>
              <div class="p-5">
                <div class="relative">
                  <select
                    :value="s.server"
                    @change="update({ server: ($event.target as HTMLSelectElement).value })"
                    class="w-full appearance-none px-4 py-3 bg-white/60 border border-violet-700/20 text-[#0d0820] font-primary text-sm rounded-lg focus:outline-none focus:border-violet-500 cursor-pointer pr-10 transition-colors"
                  >
                    <option v-for="srv in SERVERS" :key="srv" :value="srv">{{ srv }}</option>
                  </select>
                  <div class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-violet-600 text-sm">▾</div>
                </div>
              </div>
            </div>

            <!-- Card Roles -->
            <div class="rounded-xl border border-violet-700/15 overflow-hidden" style="background: rgba(255,255,255,0.68); backdrop-filter: blur(10px)">
              <div class="px-5 py-4 border-b border-violet-700/10 flex items-center justify-between">
                <div class="font-primary font-bold text-sm tracking-[2px] uppercase text-[#0d0820]">Roles a Entrenar</div>
                <div class="font-primary text-xs text-[rgba(30,20,70,.4)]">Máximo 2 roles</div>
              </div>
              <div class="p-5">
                <div class="flex flex-wrap gap-3">
                  <button
                    v-for="role in ROLES"
                    :key="role.id"
                    @click="toggleRole(role.id)"
                    :disabled="!s.roles.includes(role.id) && s.roles.length >= 2"
                    :class="`px-6 py-2.5 font-primary text-xs font-bold tracking-[1.5px] uppercase transition-all duration-200 border ${s.roles.includes(role.id) ? 'bg-violet-600 text-white border-violet-600 shadow-[0_0_14px_rgba(124,58,237,.35)]' : !s.roles.includes(role.id) && s.roles.length >= 2 ? 'opacity-30 cursor-not-allowed border-violet-700/15 text-[rgba(30,20,70,.4)]' : 'bg-transparent text-[rgba(30,20,70,.6)] border-violet-700/25 hover:border-violet-600 hover:text-violet-700'}`"
                    style="clip-path: polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)"
                  >
                    {{ role.label }}
                  </button>
                </div>
                <p v-if="s.roles.length >= 2" class="mt-3 text-xs font-primary text-[rgba(30,20,70,.4)]">
                  Límite alcanzado. Deselecciona un rol para cambiar.
                </p>
              </div>
            </div>

            <!-- Card Duración -->
            <div class="rounded-xl border border-violet-700/15 overflow-hidden" style="background: rgba(255,255,255,0.68); backdrop-filter: blur(10px)">
              <div class="px-5 py-4 border-b border-violet-700/10 flex items-center justify-between">
                <div class="font-primary font-bold text-sm tracking-[2px] uppercase text-[#0d0820]">Duración de Sesiones</div>
                <div class="font-primary text-xs text-[rgba(30,20,70,.4)]">Horas al mes</div>
              </div>
              <div class="p-5">
                <div class="grid grid-cols-4 gap-3">
                  <button
                    v-for="opt in HOUR_OPTIONS"
                    :key="opt.value"
                    @click="update({ hours: opt.value })"
                    :class="`py-3 px-2 text-center font-primary text-sm font-bold tracking-[1px] uppercase transition-all duration-200 border ${s.hours === opt.value ? 'bg-violet-600 text-white border-violet-600 shadow-[0_0_14px_rgba(124,58,237,.35)]' : 'bg-transparent text-[rgba(30,20,70,.6)] border-violet-700/25 hover:border-violet-600 hover:text-violet-700'}`"
                    style="clip-path: polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)"
                  >
                    {{ opt.label }}
                  </button>
                </div>
              </div>
            </div>
          </template>

          <!-- ══ BOOST DE LIGA ══ -->
          <template v-else>
            <div class="grid grid-cols-2 gap-6 items-start">
              <!-- Rango Actual -->
              <div
                class="rounded-xl border border-violet-700/15 overflow-hidden"
                :style="{ background: `linear-gradient(to bottom, ${RANKS[s.rankIndex].glow}80 0%, transparent 50%), rgba(255,255,255,0.68)`, backdropFilter: 'blur(10px)' }"
              >
                <div class="px-5 py-4 border-b border-violet-700/10">
                  <div class="font-primary font-bold text-sm tracking-[2px] uppercase text-[#0d0820]">Rango Actual</div>
                </div>
                <div class="p-5">
                  <RankCarousel
                    :ranks="RANKS"
                    :rank-index="s.rankIndex"
                    :rank-tier="s.rankTier"
                    :show-tiers="true"
                    @update:rank-index="(i) => update({ rankIndex: i })"
                    @update:rank-tier="(t) => update({ rankTier: t })"
                  />
                </div>
              </div>

              <!-- Rango Deseado -->
              <div
                class="rounded-xl border border-violet-700/15 overflow-hidden"
                :style="{ background: `linear-gradient(to bottom, ${RANKS[s.rankTargetIndex].glow}80 0%, transparent 50%), rgba(255,255,255,0.68)`, backdropFilter: 'blur(10px)' }"
              >
                <div class="px-5 py-4 border-b border-violet-700/10">
                  <div class="font-primary font-bold text-sm tracking-[2px] uppercase text-[#0d0820]">Rango Deseado</div>
                </div>
                <div class="p-5">
                  <RankCarousel
                    :ranks="RANKS"
                    :rank-index="s.rankTargetIndex"
                    :rank-tier="s.rankTargetTier"
                    :show-tiers="true"
                    @update:rank-index="(i) => update({ rankTargetIndex: i })"
                    @update:rank-tier="(t) => update({ rankTargetTier: t })"
                  />
                </div>
              </div>
            </div>

            <!-- Card Servidor -->
            <div class="rounded-xl border border-violet-700/15 overflow-hidden" style="background: rgba(255,255,255,0.68); backdrop-filter: blur(10px)">
              <div class="px-5 py-4 border-b border-violet-700/10">
                <div class="font-primary font-bold text-sm tracking-[2px] uppercase text-[#0d0820]">Servidor</div>
              </div>
              <div class="p-5">
                <div class="relative">
                  <select
                    :value="s.server"
                    @change="update({ server: ($event.target as HTMLSelectElement).value })"
                    class="w-full appearance-none px-4 py-3 bg-white/60 border border-violet-700/20 text-[#0d0820] font-primary text-sm rounded-lg focus:outline-none focus:border-violet-500 cursor-pointer pr-10 transition-colors"
                  >
                    <option v-for="srv in SERVERS" :key="srv" :value="srv">{{ srv }}</option>
                  </select>
                  <div class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-violet-600 text-sm">▾</div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- COLUMNA DERECHA: PAGO -->
        <div class="sticky top-32.5">
          <div
            class="rounded-2xl border border-violet-700/18 overflow-hidden"
            style="background: rgba(255,255,255,0.75); backdrop-filter: blur(14px)"
          >
            <!-- Cabecera -->
            <div
              class="px-6 py-5 border-b border-violet-700/12"
              style="background: linear-gradient(135deg, rgba(90,58,214,.09) 0%, rgba(37,99,235,.05) 100%)"
            >
              <div class="font-primary text-xs tracking-[3px] uppercase text-violet-600 mb-1">Resumen del Pedido</div>
              <div class="font-primary font-black text-xl uppercase text-[#0d0820]">{{ activeTab }}</div>
            </div>

            <!-- Ítems -->
            <div class="px-6 py-5 flex flex-col gap-4">
              <!-- Línea: Servicio -->
              <div class="flex items-start justify-between gap-3">
                <div class="font-primary text-sm text-[rgba(30,20,70,.5)]">Servicio</div>
                <div class="font-primary text-sm font-medium text-[#0d0820] text-right">{{ activeTab }}</div>
              </div>

              <!-- Rango(s) -->
              <template v-if="!isBoost">
                <div class="flex items-start justify-between gap-3">
                  <div class="font-primary text-sm text-[rgba(30,20,70,.5)]">Rango</div>
                  <div class="font-primary text-sm font-medium text-[#0d0820] text-right">{{ rankDisplayName(s.rankIndex, s.rankTier) }}</div>
                </div>
              </template>
              <template v-else>
                <div class="flex items-start justify-between gap-3">
                  <div class="font-primary text-sm text-[rgba(30,20,70,.5)]">Rango Actual</div>
                  <div class="font-primary text-sm font-medium text-[#0d0820] text-right">{{ rankDisplayName(s.rankIndex, s.rankTier) }}</div>
                </div>
                <div class="flex items-start justify-between gap-3">
                  <div class="font-primary text-sm text-[rgba(30,20,70,.5)]">Rango Deseado</div>
                  <div class="font-primary text-sm font-medium text-[#0d0820] text-right">{{ rankDisplayName(s.rankTargetIndex, s.rankTargetTier) }}</div>
                </div>
              </template>

              <div class="flex items-start justify-between gap-3">
                <div class="font-primary text-sm text-[rgba(30,20,70,.5)]">Servidor</div>
                <div class="font-primary text-sm font-medium text-[#0d0820] text-right">{{ s.server }}</div>
              </div>

              <template v-if="!isBoost">
                <div class="flex items-start justify-between gap-3">
                  <div class="font-primary text-sm text-[rgba(30,20,70,.5)]">Duración</div>
                  <div class="font-primary text-sm font-medium text-[#0d0820] text-right">
                    {{ HOUR_OPTIONS.find((h) => h.value === s.hours)?.display ?? '—' }}
                  </div>
                </div>
                <div class="flex items-start justify-between gap-3">
                  <div class="font-primary text-sm text-[rgba(30,20,70,.5)]">Roles</div>
                  <div class="font-primary text-sm font-medium text-[#0d0820] text-right max-w-[58%] leading-snug">
                    {{ s.roles.length > 0 ? s.roles.map((r) => ROLES.find((x) => x.id === r)?.label ?? r).join(', ') : 'Sin seleccionar' }}
                  </div>
                </div>
                <div v-if="s.skills.length > 0" class="flex items-start justify-between gap-3">
                  <div class="font-primary text-xs text-[rgba(30,20,70,.5)]">Habilidades</div>
                  <div class="font-primary text-xs font-medium text-[#0d0820] text-right max-w-[58%] leading-snug">{{ s.skills.join(', ') }}</div>
                </div>
              </template>

              <!-- Subtotal -->
              <div class="border-t border-violet-700/12 pt-4">
                <div class="flex justify-between items-center">
                  <div class="font-primary text-sm text-[rgba(30,20,70,.5)]">Subtotal</div>
                  <div class="font-primary text-lg font-black text-[#0d0820]">${{ subtotal.toFixed(2) }} USD</div>
                </div>
              </div>

              <!-- Código de descuento -->
              <div class="border-t border-violet-700/12 pt-4">
                <div class="font-primary text-xs tracking-[1.5px] uppercase text-[rgba(30,20,70,.45)] mb-2.5">Código de Descuento</div>
                <div class="flex gap-2">
                  <input
                    type="text"
                    :value="s.discount"
                    @input="update({ discount: ($event.target as HTMLInputElement).value })"
                    placeholder="ej. COACH10"
                    class="flex-1 px-3 py-2.5 bg-white/70 border border-violet-700/20 text-[#0d0820] font-primary text-sm rounded-lg focus:outline-none focus:border-violet-500 placeholder-[rgba(30,20,70,.3)] uppercase tracking-widest transition-colors"
                    style="letter-spacing: 0.08em"
                  />
                  <button class="px-4 py-2 bg-violet-600 text-white font-primary text-xs font-bold tracking-[1.5px] uppercase rounded-lg hover:bg-violet-700 transition-colors shrink-0">
                    Aplicar
                  </button>
                </div>
                <div v-if="discountValid && discountAmt > 0" class="mt-2.5 flex items-center gap-1.5 text-xs font-primary text-emerald-600">
                  <span>✓</span>
                  <span>Descuento aplicado — <span class="font-semibold">−${{ discountAmt.toFixed(2) }} USD</span></span>
                </div>
                <div v-if="s.discount.length > 0 && !discountValid" class="mt-2.5 text-xs font-primary text-red-500">
                  Código no válido.
                </div>
              </div>

              <!-- Total -->
              <div class="border-t border-violet-700/15 pt-4">
                <div class="flex items-end justify-between mb-1">
                  <div class="font-primary text-xs tracking-[2px] uppercase text-[rgba(30,20,70,.45)]">Total</div>
                  <div v-if="discountAmt > 0" class="font-primary text-sm text-[rgba(30,20,70,.35)] line-through">${{ subtotal.toFixed(2) }}</div>
                </div>
                <div class="font-primary text-4xl font-black bg-linear-to-br from-violet-700 to-blue-500 bg-clip-text text-transparent leading-none mb-1">
                  ${{ total.toFixed(2) }}<span class="text-xl ml-1 font-bold">USD</span>
                </div>
                <div class="font-primary text-[.68rem] text-[rgba(30,20,70,.38)] mt-1">
                  * Precio en dólares estadounidenses · IVA no incluido
                </div>
              </div>

              <!-- CTA -->
              <button class="mt-1 w-full py-3.5 bg-linear-to-br from-[#3a68c0] to-violet-600 text-white font-primary text-sm font-bold tracking-[2.5px] uppercase cursor-pointer [clip-path:polygon(8px_0%,100%_0%,calc(100%-8px)_100%,0%_100%)] shadow-[0_0_28px_rgba(124,58,237,.45)] transition-[filter,transform] duration-250 hover:brightness-125 hover:-translate-y-0.5">
                Contratar Ahora
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>
