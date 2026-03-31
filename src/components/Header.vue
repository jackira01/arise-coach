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
    class="fixed top-0 left-0 right-0 z-[200] bg-[#080102]/94 backdrop-blur-[12px] border-b border-red-800/20"
  >
    <div class="flex items-center justify-between h-16 px-5 sm:px-8 lg:px-13">
      <!-- Logo -->
      <RouterLink
        to="/"
        class="flex items-center no-underline"
        @click="closeMenu"
      >
        <img
          src="/logo.png"
          alt="AriseXR"
          class="h-8 sm:h-9 w-auto object-contain"
        />
      </RouterLink>

      <!-- Desktop nav links -->
      <ul class="hidden md:flex gap-8 lg:gap-11 list-none">
        <li v-for="link in NAV_LINKS" :key="link.label">
          <a
            :href="link.href"
            class="text-[rgba(255,190,190,.5)] font-primary text-[.85rem] lg:text-[.9rem] font-semibold tracking-[2px] uppercase no-underline transition-colors duration-250 hover:text-red-400"
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
          class="block w-6 h-0.5 bg-[#fff0f0] transition-all duration-300 origin-center"
          :class="menuOpen ? 'rotate-45 translate-y-2' : ''"
        />
        <span
          class="block w-6 h-0.5 bg-[#fff0f0] transition-all duration-300"
          :class="menuOpen ? 'opacity-0 scale-x-0' : ''"
        />
        <span
          class="block w-6 h-0.5 bg-[#fff0f0] transition-all duration-300 origin-center"
          :class="menuOpen ? '-rotate-45 -translate-y-2' : ''"
        />
      </button>
    </div>

    <!-- Mobile menu -->
    <div
      class="md:hidden overflow-hidden transition-all duration-300 ease-out"
      :class="menuOpen ? 'max-h-60 border-t border-red-800/15' : 'max-h-0'"
    >
      <ul class="flex flex-col list-none px-5 py-4 gap-1 bg-[#080102]/98">
        <li v-for="link in NAV_LINKS" :key="link.label">
          <a
            :href="link.href"
            class="block py-3 px-2 text-[rgba(255,190,190,.6)] font-primary text-[.95rem] font-semibold tracking-[2px] uppercase no-underline border-b border-red-800/12 last:border-b-0 transition-colors duration-200 hover:text-red-400"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
