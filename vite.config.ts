import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
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
        ? resolve(
            __dirname,
            `./dist/派单_${process.env.plat}_H5`.replace(/-/g, "_"),
          )
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
          target: "http://192.168.0.4:8083/",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, ""),
        },
      },
    },
  };
});
