<template>
  <div class="h-full pb-[50px]">
    <van-nav-bar :title="$t('qdlb')" />

    <van-pull-refresh
      class="min-h-full bg-gray-100 pb-[50px]"
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="$t('mygdl')"
        @load="onLoad"
      >
        <van-empty v-if="list.length === 0" :description="$t('zwsj')" />

        <template v-else>
          <li
            class="list-none border-b bg-white p-3 last-of-type:border-b-0"
            v-for="item in list"
            :key="item.id"
          >
            <div class="flex items-center justify-between">
              <div class="flex w-1/2">
                <van-tag size="small" :type="returnType(item.state.code)">{{
                  item.state.name
                }}</van-tag>
                <span class="mr-2 line-clamp-1">{{ item.bank }}</span>
              </div>
              <van-button
                v-if="item.state.code === 'ACTIVE'"
                loading-type="spinner"
                @click="handleGrab(item.id)"
                size="small"
                type="success"
                >{{ $t("qd") }}</van-button
              >
            </div>
            <div class="mt-1 flex items-center justify-between">
              <div class="line-clamp-1 w-1/2 text-left text-slate-400">
                {{ item.branch }}
              </div>
              <div class="line-clamp-1 w-1/2 text-right text-red-500">
                {{ currencySymbol }}{{ item.amount }}
              </div>
            </div>
          </li>
        </template>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { getStrongList, grabOrder } from "@/api/orders";
import { showLoadingToast, showSuccessToast, closeToast } from "vant";
import { ref, Ref } from "vue";
import { useOrderStore } from "@/store/order";
import { useAppStore } from "@/store/app";
import { useRouter } from "vue-router";
import { $t } from "@/i18n/index";
const orderStore = useOrderStore();
if (orderStore.orderState.length === 0) {
  orderStore.getOrderState();
}
const appStore = useAppStore();
const currencySymbol = appStore.currencySymbol;
const list: Ref<any[]> = ref([]);
const loading: Ref<boolean> = ref(false);
const finished: Ref<boolean> = ref(false);
const refreshing: Ref<boolean> = ref(false);
const pageNumber: Ref<number> = ref(1);
const pageSize: Ref<number> = ref(10);
const onLoad = async () => {
  if (refreshing.value) {
    list.value = [];
    pageNumber.value = 1;
    refreshing.value = false;
  }
  const res = await getStrongList({
    pageNum: pageNumber.value,
    pageSize: pageSize.value,
  });
  list.value = list.value.concat(res.rows);
  if (list.value.length >= res.total) {
    finished.value = true;
    return;
  }
  loading.value = false;
  pageNumber.value = pageNumber.value + 1;
};
const onRefresh = async () => {
  list.value = [];
  finished.value = false;
  loading.value = true;
  onLoad();
};
const router = useRouter();
const handleGrab = (id: number) => {
  showLoadingToast({
    message: $t("qdz"),
    forbidClick: true,
    duration: 0,
  });
  grabOrder(id)
    .then((res) => {
      showSuccessToast({
        message: $t("qd") + $t("cg"),
        forbidClick: true,
        onClose: () => {
          router.push("/myOrderList");
        },
      });
    })
    .finally(() => {
      setTimeout(() => {
        closeToast();
      }, 1000);
    });
};
const returnType = (code: string) => {
  switch (code) {
    case "ACTIVE":
      return "success";
    case "FREEZE":
      return "primary";
    case "FINISH":
      return "default";
  }
};
</script>

<style scoped></style>
