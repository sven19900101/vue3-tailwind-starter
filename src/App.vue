<template>
  <section>
    <main class="container mx-auto min-h-screen">
      <router-view class="min-h-screen" />
    </main>
  </section>
</template>
<style lang="postcss">
body::-webkit-scrollbar {
  @apply w-[1px];
}

body::-webkit-scrollbar-track {
  @apply bg-stone-700;
}

body::-webkit-scrollbar-thumb {
  @apply bg-stone-700;
}
</style>
