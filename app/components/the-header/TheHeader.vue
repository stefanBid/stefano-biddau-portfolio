<!-- app/components/the-header/TheHeader.vue -->

<script setup lang="ts">
interface TheHeaderProps {
  showAnnouncement?: boolean
  routes: Array<{ name: string, path: string }>
  langs: Array<{ code: string, label: string, icon: string }>
}
// Input / Output
const props = withDefaults(defineProps<TheHeaderProps>(), {
  showAnnouncement: false,
})

// eslint-disable-next-line no-unused-vars
defineEmits<{ (e: 'change-lang', langCode: string): void }>()
// Dependencies
const open = useState('header-drawer-open', () => false)
const isMdUp = import.meta.client ? useMediaQuery('(min-width: 768px)') : ref(false)
const currentRoute = useRoute()

// Data

// Events
/** Only client: attach/detach listeners */
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    onClose()
  }
}

const onToggle = (newOpenValue: boolean) => {
  open.value = newOpenValue
  lockScroll(open.value)
}

const onClose = () => {
  open.value = false
  lockScroll(false)
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  lockScroll(false)
})

watch(isMdUp, (newVal) => {
  if (newVal) {
    onClose()
  }
})
</script>

<template>
  <div class="relative z-50">
    <!-- HEADER FIXED -->
    <header
      class="fixed top-0 inset-x-0 h-16 border-b border-sb-border  u-sb-soft-transition"
      :class="props.showAnnouncement && $slots['announcement'] ? 'bg-sb-main' : 'backdrop-blur supports-backdrop-filter:bg-sb-main/60 bg-sb-main/80'"
    >
      <div class=" h-full flex items-center max-w-[1400px] mx-auto justify-between u-sb-soft-transition px-6 md:px-10">
        <NuxtLink class=" font-bebas-neue ty-sb-title tracking-tight hover:opacity-90 u-sb-focus u-sb-soft-transition rounded-xl" to="/">
          Stefano Biddau
        </NuxtLink>

        <!-- Desktop nav -->
        <div class="flex items-center">
          <nav class="hidden md:flex items-center gap-6 bg-sb-surface rounded-xl px-4 py-2">
            <NuxtLink
              v-for="r in routes"
              :key="r.path"
              class="ty-sb-btn-label normal-case! cursor-pointer u-sb-soft-transition u-sb-focus"
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
        <TheHeaderMenuToggle
          class="md:hidden"
          :open="open"
          @toggle="newOpenValue => onToggle(newOpenValue)"
        />
      </div>
    </header>
    <!-- ANNOUNCEMENT SLOT -->
    <transition name="slide-down">
      <div
        v-if="showAnnouncement && $slots['announcement']"
        class="fixed inset-x-0 top-16 bg-sb-surface-2 "
      >
        <slot name="announcement"></slot>
      </div>
    </transition>
    <!-- OVERLAY + DRAWER -->
    <div class="md:hidden">
      <!-- overlay -->
      <div
        aria-hidden="true"
        class="fixed inset-0 top-16 bg-black/50 transition-opacity duration-200"
        :class="open ? 'opacity-100 pointer-events-auto' :'opacity-0 pointer-events-none'"
        @click.stop="onClose()"
      ></div>

      <!-- drawer -->
      <aside
        id="mobile-drawer"
        :aria-modal="open ? 'true' : undefined"
        class="fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 max-w-[85vw] bg-sb-surface border-r border-sb-border shadow-[0_20px_60px_var(--color-sb-shadow)] transition-transform duration-300 will-change-transform"
        :class="open ? 'translate-x-0' : '-translate-x-full'"
        :inert="!open"
        :role="open ? 'dialog' : undefined"
      >
        <div class="flex items-center justify-between px-6 py-3 border-b border-sb-border">
          <span class="ty-label text-sb-muted font-semibold! u-sb-soft-transition">Menu</span>
        </div>

        <nav class="flex flex-col gap-2 p-6">
          <NuxtLink
            v-for="r in routes"
            :key="r.path"
            class="rounded-lg p-3 ty-btn-label cursor-pointer u-sb-soft-transition u-sb-focus"
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
        <div class="flex items-center justify-between px-6 py-3 border-y border-sb-border">
          <span class="ty-label text-sb-muted u-sb-soft-transition font-semibold ">Settings</span>
        </div>
      </aside>
    </div>
  </div>
</template>
