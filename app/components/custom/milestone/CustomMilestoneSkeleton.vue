<template>
  <article class="relative">
    <!-- Timeline Point Skeleton -->
    <div
      class="absolute -left-[33px] sm:-left-[51px] top-3.5 sm:top-4.5 md:top-10 flex items-center justify-center pointer-events-none u-sb-soft-transition"
    >
      <!-- Point -->
      <div
        class="relative size-4 sm:size-5 bg-sb-muted/30 rounded-full animate-pulse u-sb-soft-transition"
      ></div>
    </div>

    <!-- Content Skeleton -->
    <BaseCard full-custom-content variant="dark">
      <!-- Title Skeleton: ty-sb-title = text-2xl sm:text-3xl md:text-4xl -->
      <div class="ty-sb-title bg-sb-muted/20 rounded animate-pulse w-3/4">
        &nbsp;
      </div>

      <!-- Subtitle Skeleton: ty-sb-subtitle = text-base sm:text-lg md:text-xl -->
      <div class="ty-sb-subtitle bg-sb-muted/15 rounded animate-pulse w-1/2 mt-1">
        &nbsp;
      </div>

      <!-- Description Skeleton: ty-sb-paragraph = text-sm sm:text-base md:text-lg -->
      <div class="space-y-2 mt-3 md:mt-4">
        <div class="ty-sb-paragraph bg-sb-muted/10 rounded animate-pulse w-full">
          &nbsp;
        </div>
        <div class="ty-sb-paragraph bg-sb-muted/10 rounded animate-pulse w-full">
          &nbsp;
        </div>
        <div class="ty-sb-paragraph bg-sb-muted/10 rounded animate-pulse w-2/3">
          &nbsp;
        </div>
      </div>

      <!-- Button Skeleton: ty-sb-label = text-xs sm:text-sm -->
      <div class="ty-sb-label bg-sb-muted/15 rounded animate-pulse w-24 mt-2 px-2 py-1">
        &nbsp;
      </div>
    </BaseCard>
  </article>
</template>
