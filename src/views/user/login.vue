<template>
  <div class="flex justify-center bg-slate-800">
    <div class="w-full">
      <div class="mb-10 mt-24 flex justify-center">
        <div class="bg-img h-52 w-52 bg-contain bg-bottom bg-no-repeat"></div>
      </div>

      <van-form class="px-8" @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="username"
            :label="$t('yhm')"
            :placeholder="$t('qsryhm')"
            :rules="[{ required: true, message: $t('qsryhm') }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            :label="$t('mm')"
            :placeholder="$t('qsrmm')"
            :rules="[{ required: true, message: $t('qsrmm') }]"
          />
        </van-cell-group>
        <div class="p-4">
          <van-button round block type="primary" native-type="submit">
            {{ $t("login") }}
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import { loginValue } from "@/types/index";
import { handleLogin } from "@/api/user";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
const username: Ref<string> = ref("laocai");
const password: Ref<string> = ref("123456");
const userStore = useUserStore();
const router = useRouter();
const onSubmit = (values: loginValue) => {
  handleLogin(values).then((res) => {
    userStore.setToken(res.token);
    router.push("/");
  });
};
</script>

<style scoped>
.bg-img {
  /* background-image: url("https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=666&q=80"); */
  background-image: url("/static/assets/logo.png");
}
</style>
