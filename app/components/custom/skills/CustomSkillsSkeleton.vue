<template>
  <BaseCard
    full-custom-content
    variant="dark"
  >
    <div class="flex items-center gap-4 md:gap-6 u-sb-soft-transition">
      <!-- Icon placeholder -->
      <div class="flex items-center justify-center size-12 sm:size-14 md:size-16 rounded-md bg-sb-muted/25 animate-pulse shadow-md z-10 u-sb-soft-transition shirink-0">
        <Icon class="size-7 sm:size-8 md:size-9 text-sb-contrast u-sb-soft-transition animate-pulse" name="solar:bolt-line-duotone" />
      </div>

      <div class="flex flex-col gap-2 flex-1">
        <!-- Title placeholder -->
        <div class="h-5 sm:h-6 bg-sb-muted/20 rounded animate-pulse w-2/3"></div>
        <!-- Level placeholder -->
        <div class="flex gap-1 mt-1">
          <div
            v-for="n in 5"
            :key="n"
            class="size-3.5 rounded-sm bg-sb-muted/30 animate-pulse u-sb-soft-transition"
          ></div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>
