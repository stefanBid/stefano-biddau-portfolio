<template>
  <article class="relative">
    <!-- Timeline Point Skeleton -->
    <div
      class="absolute -left-[33px] md:-left-[51px] top-3.5 sm:top-4.5 md:top-10 flex items-center justify-center pointer-events-none u-sb-soft-transition"
    >
      <!-- Point -->
      <div
        class="relative size-4 md:size-5 bg-sb-muted/30 rounded-full animate-pulse u-sb-soft-transition"
      ></div>
    </div>

    <!-- Content Skeleton -->
    <BaseCard full-custom-content variant="dark">
      <!-- Header: Title + Date -->
      <div class="flex flex-col md:flex-row items-start justify-start sm:justify-between gap-y-0.5 gap-x-4">
        <!-- Title Skeleton -->
        <div class="ty-sb-title bg-sb-muted/20 rounded animate-pulse flex-1 w-full">
          &nbsp;
        </div>
        <!-- Date Skeleton -->
        <div class="ty-sb-label bg-sb-muted/20 rounded animate-pulse w-20">
          &nbsp;
        </div>
      </div>

      <!-- Subtitle Skeleton -->
      <div class="ty-sb-subtitle bg-sb-muted/15 rounded animate-pulse w-1/2 mt-1">
        &nbsp;
      </div>

      <!-- Description Skeleton -->
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

      <!-- Button Skeleton -->
      <div class="ty-sb-label bg-sb-muted/15 rounded animate-pulse w-24 mt-2 px-2 py-1">
        &nbsp;
      </div>
    </BaseCard>
  </article>
</template>
