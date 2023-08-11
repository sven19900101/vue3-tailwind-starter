import { useAppStore } from "@/store/app";
import appConfig from "@/utils/config";
export default () => {
  return new Promise<void>((resolve, reject) => {
    const appStore = useAppStore();
    appStore.setLanguage(appConfig.language || "zh");
    appStore.setCurrencySymbol(appConfig.currencySymbol || "￥");
    resolve();
  });
};
