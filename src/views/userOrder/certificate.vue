<template>
  <div class="bg-gray-100">
    <van-nav-bar title="上传凭证" left-arrow @click-left="onClickLeft" />
    <div class="mt-5 flex flex-col items-center justify-center">
      <van-uploader
        :max-size="10 * 1024 * 1024"
        preview-size="150"
        v-model="fileList"
        :max-count="1"
        :after-read="afterRead"
      />
      <span class="text-sm text-slate-400">{{ $t("scpz") }}</span>
    </div>
    <div class="mt-10 flex justify-center">
      <van-button @click="submit" type="primary">{{ $t("tjpz") }}</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import axios from "axios";
import type { UploaderFileListItem } from "vant";
import { useRoute, useRouter } from "vue-router";
import { showNotify } from "vant";
import { submitCertificate } from "@/api/orders";
const fileList: Ref<any[]> = ref([]);
const uploadUrl = import.meta.env.VITE_APP_UPLOAD_URL + "/common/oss/upload";
const imgUrl: Ref<string> = ref("");
const route = useRoute();
const router = useRouter();
const onClickLeft = () => {
  history.back();
};
const afterRead = (file: UploaderFileListItem) => {
  console.log(file);
  file.status = "uploading";
  // file.message='上传中...'
  const forms = new FormData() as any;
  forms.append("file", file.file);
  axios
    .post(uploadUrl + "?directory=paidan", forms, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        file.status = "done";
        imgUrl.value = res.data.data;
        showNotify({ type: "success", message: res.data.msg });
      } else {
        file.status = "failed";

        showNotify({ type: "danger", message: res.data.msg });
      }
    });
};
const submit = () => {
  let params = {
    id: route.query.id as string,
    img: imgUrl.value,
  };
  submitCertificate(params).then((res) => {
    router.replace({ name: "myOrderlist" });
  });
};
</script>

<style scoped></style>
