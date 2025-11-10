<!-- app/components/the-header/TheHeader.vue -->

<script setup lang="ts">
// Dependencies
const open = useState('header-drawer-open', () => false)
const isMdUp = import.meta.client ? useMediaQuery('(min-width: 768px)') : ref(false)
const currentRoute = useRoute()

// Data
const routes = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
]

// Events
/** Only client: attach/detach listeners */
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    close()
  }
}

const onToggle = () => {
  open.value = !open.value
  _lockScroll(open.value)
}

const onClose = () => {
  open.value = false
  _lockScroll(false)
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  _lockScroll(false)
})

watch(isMdUp, (newVal) => {
  if (newVal) {
    onClose()
  }
})

// Private methods

/** Only client: lock scroll */
const _lockScroll = (locked: boolean) => {
  if (import.meta.client) {
    document.documentElement.style.overflow = locked ? 'hidden' : ''
  }
}
</script>

<template>
  <div class="relative z-50">
    <!-- HEADER FIXED -->
    <header class="fixed inset-x-0 top-0 h-16 border-b border-sb-border bg-sb-main/80 backdrop-blur supports-backdrop-filter:bg-sb-main/60">
      <div class=" h-full flex items-center justify-between px-6 md:px-10">
        <NuxtLink class=" font-bebas-neue ty-sb-title tracking-tight hover:opacity-90 sb-focus" to="/">
          Stefano Biddau
        </NuxtLink>

        <!-- Desktop nav -->
        <div class="flex items-center">
          <nav class="hidden md:flex items-center gap-6 bg-sb-surface rounded-xl px-4 py-2">
            <NuxtLink
              v-for="r in routes"
              :key="r.path"
              class="ty-sb-btn-label normal-case! cursor-pointer transition-all duration-200 ease-in-out sb-focus"
              :class="{
                'text-sb-contrast/80 hover:text-sb-contrast font-normal!': currentRoute.path !== r.path,
                'text-sb-accent font-bold!': currentRoute.path === r.path,
              }"
              :to="r.path"
            >
              {{ r.name }}
            </NuxtLink>
          </nav>
          <!--
            <BaseDropdownMenu
              class="ml-4"
              :items="[
                { id: 'profile', label: 'Profile' },
                { id: 'account', label: 'Account' },
                { id: 'logout', label: 'Logout' },
              ]"
              label="Settings"
              @select="item => console.log(item)"
            />
          -->
        </div>
        <!-- Mobile: hamburger -->
        <button
          aria-controls="mobile-drawer"
          :aria-expanded="open ? 'true' : 'false'"
          aria-label="Open menu"
          class="md:hidden ty-btn-label inline-flex items-center  rounded-xl p-1  text-sb-contrast/90 hover:text-sb-contrast sb-focus"
          @click="onToggle()"
        >
          <svg
            aria-hidden="true"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </header>

    <!-- OVERLAY + DRAWER -->
    <div class="md:hidden">
      <!-- overlay -->
      <div
        aria-hidden="true"
        class="fixed inset-0 top-16 bg-black/50 transition-opacity duration-200"
        :class="open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
        @click.stop="onClose()"
      ></div>

      <!-- drawer -->
      <aside
        id="mobile-drawer"
        :aria-modal="open ? 'true' : undefined"
        class="fixed top-16 left-0 h-[calc(100%-4rem)] w-72 max-w-[85vw] bg-sb-surface border-r border-sb-border shadow-[0_20px_60px_var(--color-sb-shadow)] transition-transform duration-300 will-change-transform"
        :class="open ? 'translate-x-0 ' : '-translate-x-full'"
        :inert="!open"
        :role="open ? 'dialog' : undefined"
      >
        <div class="flex items-center justify-between px-4 py-3 border-b border-sb-border">
          <span class="ty-label text-sb-muted font-semibold">Menu</span>
        </div>

        <nav class="flex flex-col gap-2 p-4">
          <NuxtLink
            v-for="r in routes"
            :key="r.path"
            class="rounded-lg px-3 py-3 ty-btn-label cursor-pointer"
            :class="{
              'hover:bg-sb-surface-2': currentRoute.path !== r.path,
              'bg-sb-accent font-bold!': currentRoute.path === r.path,
            }"
            :to="r.path"
            @click="onClose()"
          >
            {{ r.name }}
          </NuxtLink>
        </nav>
        <div class="flex items-center justify-between px-4 py-3 border-y border-sb-border">
          <span class="ty-label text-sb-muted font-semibold">Settings</span>
        </div>
      </aside>
    </div>
  </div>
</template>
