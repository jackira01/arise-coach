<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Precios', href: '#precios' },
  { label: 'Sobre Nosotros', href: '#sobre-nosotros' },
]

const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[200] bg-white/90 backdrop-blur-[10px] border-b border-violet-700/10"
  >
    <div class="flex items-center justify-between h-16 px-5 sm:px-8 lg:px-13">
      <!-- Logo -->
      <RouterLink
        to="/"
        class="flex items-center gap-2.5 no-underline font-primary text-[1rem] sm:text-[1.2rem] font-bold tracking-[2px] sm:tracking-[3px] text-[#1a0f35] uppercase"
        @click="closeMenu"
      >
        <div
          class="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-black text-[1rem] sm:text-[1.1rem] text-white bg-linear-to-br from-[#5a8fd6] to-[#3a5fa0] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] shadow-[0_0_18px_rgba(90,143,214,.6)]"
        >
          C
        </div>
        Coaching
      </RouterLink>

      <!-- Desktop nav links -->
      <ul class="hidden md:flex gap-8 lg:gap-11 list-none">
        <li v-for="link in NAV_LINKS" :key="link.label">
          <a
            :href="link.href"
            class="text-[rgba(30,20,70,.55)] font-primary text-[.85rem] lg:text-[.9rem] font-semibold tracking-[2px] uppercase no-underline transition-colors duration-250 hover:text-violet-700"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- Hamburger button (mobile) -->
      <button
        class="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 cursor-pointer"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="menuOpen = !menuOpen"
      >
        <span
          class="block w-6 h-0.5 bg-[#1a0f35] transition-all duration-300 origin-center"
          :class="menuOpen ? 'rotate-45 translate-y-2' : ''"
        />
        <span
          class="block w-6 h-0.5 bg-[#1a0f35] transition-all duration-300"
          :class="menuOpen ? 'opacity-0 scale-x-0' : ''"
        />
        <span
          class="block w-6 h-0.5 bg-[#1a0f35] transition-all duration-300 origin-center"
          :class="menuOpen ? '-rotate-45 -translate-y-2' : ''"
        />
      </button>
    </div>

    <!-- Mobile menu -->
    <div
      class="md:hidden overflow-hidden transition-all duration-300 ease-out"
      :class="menuOpen ? 'max-h-60 border-t border-violet-700/10' : 'max-h-0'"
    >
      <ul class="flex flex-col list-none px-5 py-4 gap-1 bg-white/95">
        <li v-for="link in NAV_LINKS" :key="link.label">
          <a
            :href="link.href"
            class="block py-3 px-2 text-[rgba(30,20,70,.65)] font-primary text-[.95rem] font-semibold tracking-[2px] uppercase no-underline border-b border-violet-700/8 last:border-b-0 transition-colors duration-200 hover:text-violet-700"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
