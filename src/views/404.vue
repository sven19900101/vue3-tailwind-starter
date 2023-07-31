<template>
  <div class="flex h-screen flex-col justify-center">
    <div class="text-center text-lg">404</div>
    <div class="text-center text-base">页面找不到了~</div>
    <div class="mt-2 text-center">
      <van-button @click="goHome" round size="small" type="primary"
        >回到首页</van-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goHome = () => {
  router.replace({ path: "/" });
};
</script>
