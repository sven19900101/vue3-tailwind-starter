<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item
        @click="tabClick('grabList')"
        name="grabList"
        icon="home-o"
        >{{ $t("sy") }}</van-tabbar-item
      >
      <van-tabbar-item
        @click="tabClick('myOrderlist')"
        name="myOrderlist"
        icon="todo-list-o"
        >{{ $t("wddd") }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, watch } from "vue";
import { useRouter, useRoute, RouteRecordName } from "vue-router";
const route = useRoute();
const active: Ref<RouteRecordName | undefined | null> = ref(route.name);
const router = useRouter();
const tabClick = (name: string) => {
  active.value = name;
  router.push({ name });
};
watch(
  () => route.name,
  () => {
    active.value = route.name;
  },
);
</script>

<style scoped></style>
