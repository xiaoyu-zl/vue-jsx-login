import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createStyleImportPlugin, ElementPlusResolve, } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig((v) => {
  return {
    plugins: [vue(),
    vueJsx(),//插件使用
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name: string) => {
            name = name.substring(3, name.length);
            return `element-plus/es/components/${name}/style/index`;
          },
        },
      ],
    }),
    ],
    resolve: {
      alias: [
        {
          find: "@", // 别名
          replacement: resolve(__dirname, "src"), // 别名对应地址
        },
      ],
    },
    server: {
      /** 是否开启 HTTPS */
      https: false,
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true, // host: "0.0.0.0"
      /** 端口号 */
      port: 6752,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      // proxy: {
      //   "/api": {
      //     target: proxyUrl,
      //     ws: true,
      //     /** 是否允许跨域 */
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace("/api", ""),
      //   },
      // },
    },
  }
})
