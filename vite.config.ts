import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import topLevelAwait from "vite-plugin-top-level-await";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(
    mode,
    mode === "production" && process.env.plat
      ? resolve(__dirname, `./platform-static/${process.env.plat}`)
      : process.env.plat
      ? resolve(__dirname, `./platform-static/${process.env.plat}`)
      : process.cwd(),
    "",
  );

  return {
    define: {
      "process.env": env,
    },
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
      //main.ts 动态引入文件
      topLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: "__tla",
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: (i) => `__tla_${i}`,
      }),
    ],
    publicDir:
      mode === "production" && process.env.plat
        ? resolve(__dirname, `./platform-static/${process.env.plat}/public`)
        : resolve(
            __dirname,
            process.env.plat
              ? `./platform-static/${process.env.plat}/public`
              : "./public",
          ),
    envDir:
      mode === "production" && process.env.plat
        ? resolve(__dirname, `./platform-static/${process.env.plat}`)
        : process.env.plat
        ? resolve(__dirname, `./platform-static/${process.env.plat}`)
        : __dirname,
    css: {
      devSourcemap: true,
    },
    build: {
      emptyOutDir: true,
      outDir: process.env.plat
        ? resolve(__dirname, `./dist/派单_${process.env.plat}_H5`)
        : resolve(__dirname, "./dist/dist"),
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3008,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        "/dev-api": {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, ""),
        },
      },
    },
  };
});
