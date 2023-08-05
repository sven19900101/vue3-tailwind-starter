<template>
  <div class="h-full pb-[50px]">
    <van-nav-bar :title="$t('wddd')" />

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
            <div class="mb-1 flex justify-center">
              <van-count-down
                v-if="
                  item.startTime > 0 &&
                  (item.state.code === 'CREATE' || item.state.code === 'REJECT')
                "
                @finish="countdownFinish"
                :time="item.startTime"
              >
                <template #default="timeData">
                  <div class="flex">
                    <span
                      class="block w-5 rounded-sm bg-blue-600 text-center leading-5 text-white"
                      >{{
                        timeData.hours > 9
                          ? timeData.hours
                          : "0" + timeData.hours.toString()
                      }}</span
                    >
                    <span class="colon mx-1">:</span>
                    <span
                      class="block w-5 rounded-sm bg-blue-600 text-center leading-5 text-white"
                      >{{
                        timeData.minutes > 9
                          ? timeData.minutes
                          : "0" + timeData.minutes.toString()
                      }}</span
                    >
                    <span class="colon mx-1">:</span>
                    <span
                      class="block w-5 rounded-sm bg-blue-600 text-center leading-5 text-white"
                      >{{
                        timeData.seconds > 9
                          ? timeData.seconds
                          : "0" + timeData.seconds.toString()
                      }}</span
                    >
                  </div>
                </template>
              </van-count-down>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex w-1/2">
                <van-tag size="small" :type="returnType(item.state.code)">{{
                  item.state.name
                }}</van-tag>
                <span class="mr-2 line-clamp-1">{{ item.bank }}</span>
              </div>
              <van-button
                v-if="
                  item.state.code === 'CREATE' || item.state.code === 'REJECT'
                "
                loading-type="spinner"
                @click="handleUpload(item.id)"
                size="small"
                type="success"
                >{{ $t("scpz") }}</van-button
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
import { getMyOrderList } from "@/api/orders";
import { ref, Ref } from "vue";
import { useOrderStore } from "@/store/order";
import { useAppStore } from "@/store/app";
import { useRouter } from "vue-router";
const appStore = useAppStore();
const currencySymbol = appStore.currencySymbol;
const list: Ref<any[]> = ref([]);
const loading: Ref<boolean> = ref(false);
const finished: Ref<boolean> = ref(false);
const refreshing: Ref<boolean> = ref(false);
const pageNumber: Ref<number> = ref(1);
const pageSize: Ref<number> = ref(10);
const orderStore = useOrderStore();
if (orderStore.associateType.length === 0) {
  orderStore.getAssociateType();
}

const onLoad = async () => {
  if (refreshing.value) {
    list.value = [];
    pageNumber.value = 1;
    refreshing.value = false;
  }

  const res = await getMyOrderList({
    pageNum: pageNumber.value,
    pageSize: pageSize.value,
  });
  let ary = res.rows.map((item: any) => {
    return {
      ...item,
      startTime:
        Date.parse(item.startTime.replace(/-/g, "/")) - new Date().getTime(),
    };
  });
  list.value = list.value.concat(ary);

  if (list.value.length >= res.total) {
    finished.value = true;
    return;
  }
  loading.value = false;
  pageNumber.value = pageNumber.value + 1;
};
const onRefresh = async () => {
  finished.value = false;
  loading.value = true;
  refreshing.value = true;
  onLoad();
};
const returnType = (code: string) => {
  switch (code) {
    case "CREATE":
      return "success";
    case "CANCEL":
      return "danger";
    case "REJECT":
      return "danger";
    case "REVIEW":
      return "primary";
    case "FINISH":
      return "default";
  }
};
const router = useRouter();
const handleUpload = (id: string | number) => {
  router.push({ name: "certificate", query: { id } });
};
const countdownFinish = () => {
  onRefresh();
  // refreshing.value = true;
  // onLoad();
};
</script>

<style scoped></style>
