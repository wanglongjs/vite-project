import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path, { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    eslintPlugin({
      // 配置选项
      cache: false// 禁用 eslint 缓存
    }),
    vueJsx({
      // 配置选项
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      styles: resolve('src/styles')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import \'@/styles/variables.scss\';'
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3001,
    open: true, // 运行自动打开浏览器
    proxy: {
      '/kleng': {
        target: 'http://47.94.146.82:9001',
        changeOrigin: true,
        rewrite: path =>
          path.replace(new RegExp('^' + 'kleng'), '')
      }
    }
  }
})
