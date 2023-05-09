import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 本地运行时的路径
  base: "./",
  // 代理服务器
  server: {
    proxy: {
      '/api': {
        target: 'https://www.guowei.fun',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 将路径/api替换为空
      },
      '/bilibili': {
        target: 'https://api.bilibili.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bilibili/, ""), // 将路径/api替换为空
      },
    }
  },
  // 打包配置
  build: {
    minify: 'terser',// 需要先安装 terser
    // terserOptions: {
    //   compress: {
    //     drop_console: true,//去掉console
    //     drop_debugger: true,//去掉debugger
    //   },
    // },
    rollupOptions: {// 打包配置
      output: {
        manualChunks(id) {// 手动分包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
        chunkFileNames: (chunkInfo) => {// 分包文件名
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
          return `js/${fileName}/[name].[hash].js`;
        }
      }
    }
  }
})
