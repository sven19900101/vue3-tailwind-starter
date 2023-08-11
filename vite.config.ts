import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const platform = process.env.plat;
  let platformParts = platform && platform.split("-");
  const env = loadEnv(
    mode,
    mode === "production" && platform
      ? resolve(__dirname, `./platform-static/${platform}`)
      : platform
      ? resolve(__dirname, `./platform-static/${platform}`)
      : process.cwd(),
    "",
  );

  return {
    // define: {
    //   "process.env": env,
    // },
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    publicDir:
      mode === "production" && platform
        ? resolve(__dirname, `./platform-static/${platform}/public`)
        : resolve(
            __dirname,
            platform ? `./platform-static/${platform}/public` : "./public",
          ),
    envDir:
      mode === "production" && platform
        ? resolve(__dirname, `./platform-static/${platform}`)
        : platform
        ? resolve(__dirname, `./platform-static/${platform}`)
        : __dirname,
    css: {
      devSourcemap: true,
    },
    build: {
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: "static/js/[name].[hash].js",
          chunkFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/assets/[name].[hash][extname]",
        },
      },
      outDir: platform
        ? resolve(
            __dirname,
            `./dist/派单_${platformParts[1]}_${platformParts[2]}_H5`,
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
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, ""),
        },
      },
    },
  };
});
