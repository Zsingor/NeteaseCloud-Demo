import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

import postCssPxToRem from 'postcss-pxtorem'

import Icons from 'unplugin-icons/vite'
// 引入loader
import {FileSystemIconLoader} from "unplugin-icons/loaders";
// 引入 Icon自动引入解析器
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    // 使用自动引入插件
    Components({
      // 配置解析器
      resolvers: [
        // Icon自动引入解析器
        IconsResolver({
          // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
          prefix: 'icon',
          // 当图标集名字过长时，可使用集合别名
          alias: {
            system: 'system-uicons'
          },
          // 标识自定义图标集
          customCollections: ['main','item','footer','detail','search']
        }),
        // Vant自动引入解析器
        VantResolver()
      ]
    }),
    Icons({ 
      compiler: 'vue3',
      // 自动安装
      autoInstall: true,
      // 自定义图标加载
      customCollections: {
        // 给svg文件设置fill="currentColor"属性，使图标的颜色具有适应性
        main: FileSystemIconLoader('./src/assets/svg/main', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
        item: FileSystemIconLoader('./src/assets/svg/itemMusic', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
        footer: FileSystemIconLoader('./src/assets/svg/footer', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
        detail: FileSystemIconLoader('./src/assets/svg/detail', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
        search: FileSystemIconLoader('./src/assets/svg/search', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
      }
     }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  server:{
    port:7040
  },

  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 50,
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: ['norem'], // 过滤掉norem-开头的class，不进行rem转换
        }),
      ],
    },
  },

  
})
