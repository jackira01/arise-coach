<script setup lang="ts">
const ROMAN_TIERS = ['IV', 'III', 'II', 'I']

const props = defineProps<{
  ranks: { name: string; img: string; glow: string; hasTiers: boolean }[]
  rankIndex: number
  rankTier: number
  showTiers: boolean
  large?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:rankIndex', value: number): void
  (e: 'update:rankTier', value: number): void
}>()

function prevRank() {
  emit('update:rankIndex', (props.rankIndex - 1 + props.ranks.length) % props.ranks.length)
}
function nextRank() {
  emit('update:rankIndex', (props.rankIndex + 1) % props.ranks.length)
}
</script>

<template>
  <div class="flex items-center gap-3">
    <button
      @click="prevRank"
      class="w-9 h-9 flex items-center justify-center rounded-full border border-violet-700/25 text-violet-700 font-black text-xl transition-colors hover:bg-violet-700/10 shrink-0"
    >
      ‹
    </button>

    <div class="flex-1 flex flex-col items-center gap-3 py-2">
      <!-- Emblema -->
      <div
        :class="`relative select-none ${large ? 'w-36 h-36' : 'w-24 h-24'}`"
        :style="{ filter: `drop-shadow(0 0 ${large ? '22px' : '16px'} ${ranks[rankIndex].glow}99)`, transition: 'filter 0.3s ease' }"
      >
        <img
          :key="ranks[rankIndex].img"
          :src="ranks[rankIndex].img"
          :alt="ranks[rankIndex].name"
          class="w-full h-full object-contain"
        />
      </div>

      <!-- Nombre + división -->
      <div class="font-primary font-bold tracking-[2px] text-sm uppercase text-[#0d0820] text-center leading-tight">
        {{ ranks[rankIndex].name }}
        <span v-if="showTiers && ranks[rankIndex].hasTiers" class="ml-1.5 text-violet-600">
          {{ ROMAN_TIERS[rankTier] }}
        </span>
      </div>

      <!-- Selector de tier -->
      <div v-if="showTiers && ranks[rankIndex].hasTiers" class="flex gap-1.5">
        <button
          v-for="(tier, ti) in ROMAN_TIERS"
          :key="tier"
          @click="emit('update:rankTier', ti)"
          :class="`w-9 h-7 font-primary text-[.7rem] font-bold tracking-[1px] transition-all duration-200 border ${ti === rankTier ? 'bg-violet-600 text-white border-violet-600 shadow-[0_0_10px_rgba(124,58,237,.35)]' : 'bg-transparent text-[rgba(30,20,70,.55)] border-violet-700/25 hover:border-violet-600 hover:text-violet-700'}`"
          style="clip-path: polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)"
        >
          {{ tier }}
        </button>
      </div>

      <!-- Dots de posición -->
      <div class="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
        <button
          v-for="(_, i) in ranks"
          :key="i"
          @click="emit('update:rankIndex', i)"
          class="h-1.5 rounded-full transition-all duration-300"
          :style="{ width: i === rankIndex ? '16px' : '6px', background: i === rankIndex ? ranks[rankIndex].glow : 'rgba(124,58,237,.22)' }"
        />
      </div>
    </div>

    <button
      @click="nextRank"
      class="w-9 h-9 flex items-center justify-center rounded-full border border-violet-700/25 text-violet-700 font-black text-xl transition-colors hover:bg-violet-700/10 shrink-0"
    >
      ›
    </button>
  </div>
</template>
