import axios from "axios";
import { showNotify } from "vant";
import { tansParams } from "@/utils/util";
import { useUserStore } from "@/store/user";
import { useAppStore } from "@/store/app";
import pinia from "@/store/index";
import { $t } from "@/i18n/index";
// axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  // 超时
  timeout: 30000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    clientId: "app",
  },
});
const userStore = useUserStore(pinia);
const appStore = useAppStore(pinia);
// request拦截器
service.interceptors.request.use(
  (config) => {
    config.headers["Accept-Language"] = appStore.language || "en";
    if (userStore.token) {
      config.headers["Authorization"] = userStore.token;
    }
    // 是否需要设置 token
    //const isToken = (config.headers || {}).isToken === false
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
    // if (getToken() && !isToken) {
    //   config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    // if (
    //   !isRepeatSubmit &&
    //   (config.method === "post" || config.method === "put")
    // ) {
    //   const requestObj = {
    //     url: config.url,
    //     data:
    //       typeof config.data === "object"
    //         ? JSON.stringify(config.data)
    //         : config.data,
    //     time: new Date().getTime(),
    //   };
    //   const sessionObj = cache.session.getJSON("sessionObj");
    //   if (
    //     sessionObj === undefined ||
    //     sessionObj === null ||
    //     sessionObj === ""
    //   ) {
    //     cache.session.setJSON("sessionObj", requestObj);
    //   } else {
    //     const s_url = sessionObj.url; // 请求地址
    //     const s_data = sessionObj.data; // 请求数据
    //     const s_time = sessionObj.time; // 请求时间
    //     const interval = 1000; // 间隔时间(ms)，小于此时间视为重复提交
    //     if (
    //       s_data === requestObj.data &&
    //       requestObj.time - s_time < interval &&
    //       s_url === requestObj.url
    //     ) {
    //       const message = "数据正在处理，请勿重复提交";
    //       console.warn(`[${s_url}]: ` + message);
    //       return Promise.reject(new Error(message));
    //     } else {
    //       cache.session.setJSON("sessionObj", requestObj);
    //     }
    //   }
    // }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    const msg = res.data.msg || $t("qqcg");
    // 获取错误信息
    // const msg = errorCode[code] || res.data.msg || errorCode["default"];
    // 二进制数据则直接返回
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res.data;
    }
    if (code === 401) {
      showNotify({ type: "danger", message: $t("ddztygqqcxdl") });
      userStore.logOut().then(() => {
        window.location.reload();
      });
      return Promise.reject($t("ddztygqqcxdl"));
    } else if (code === 500) {
      showNotify({ type: "danger", message: msg });
      return Promise.reject(new Error(msg));
    } else if (code === 601) {
      showNotify({ type: "warning", message: msg });
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      showNotify({ type: "danger", message: msg });
      return Promise.reject("error");
    } else {
      // showNotify({ type: "danger", message: "登录状态已过期,请重新登录" });
      // userStore.logOut();
      return Promise.resolve(res.data);
    }
  },
  (error) => {
    console.log("err" + error);
    let { message } = error;
    if (message === "Network Error") {
      message = $t("wlllyc");
    } else if (message.includes("timeout")) {
      message = $t("wlqqcs");
    } else if (message.includes("Request failed with status code")) {
      message = $t("fw") + message.substr(message.length - 3) + $t("yc");
    }

    showNotify({ type: "danger", message });
    return Promise.reject(error);
  },
);

export default service;
