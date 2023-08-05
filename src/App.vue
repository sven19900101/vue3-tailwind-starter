<template>
  <van-config-provider>
    <section>
      <main class="container mx-auto min-h-screen">
        <router-view class="h-screen" />
      </main>
    </section>
  </van-config-provider>
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
