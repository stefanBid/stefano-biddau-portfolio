<template>
  <BaseCard full-custom-content variant="dark">
    <div class="flex items-center gap-4 md:gap-6 u-sb-soft-transition">
      <!-- Icon placeholder -->
      <div class="flex items-center justify-center size-12 sm:size-14 md:size-16 rounded-md bg-sb-muted/25 animate-pulse shadow-md z-10 u-sb-soft-transition">
        &nbsp;
      </div>

      <div class="flex flex-col gap-2 w-full">
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
