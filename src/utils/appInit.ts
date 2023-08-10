import { appConfig } from "@/main";
import { useAppStore } from "@/store/app";
export default () => {
  return new Promise<void>((resolve, reject) => {
    const appStore = useAppStore();
    appStore.setLanguage(appConfig.language || "zh");
    appStore.setCurrencySymbol(appConfig.currencySymbol || "￥");
    resolve();
  });
};
