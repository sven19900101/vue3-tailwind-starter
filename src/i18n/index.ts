import { createI18n } from "vue-i18n";
import en from "@/i18n/language/en";
import zh from "@/i18n/language/zh";
import ja from "./language/ja";
import pinia from "@/store/index";
import { useAppStore } from "@/store/app";
const store = useAppStore(pinia);
let messages = {
  en,
  zh,
  ja,
};

const i18n = () => {
  return createI18n({
    locale: store.language || "en", // 默认语言
    fallbackLocale: "en", // 获取key失败后选择默认语言
    legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
    globalInjection: true, //$t
    silentTranslationWarn: true,
    messages,
  });
};
const $t = (data: string) => i18n().global.t(data);

export { i18n, $t };
