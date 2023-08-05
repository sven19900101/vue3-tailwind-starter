<template>
  <div class="flex h-screen flex-col justify-center">
    <div class="text-center text-lg">404</div>
    <div class="text-center text-base">{{ $t("ymzbdl") }}~</div>
    <div class="mt-2 text-center">
      <van-button @click="goHome" round size="small" type="primary">{{
        $t("hdsy")
      }}</van-button>
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
