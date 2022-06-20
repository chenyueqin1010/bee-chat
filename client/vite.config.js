import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import visualizer from 'rollup-plugin-visualizer'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
// import legacy from '@vitejs/plugin-legacy'
import {
	DateFormat
} from './src/utils/dateFormat'

const path = require('path')

let options = {
	base: './',
	server: {
		host: '0.0.0.0',
		port: 3001,
		proxy: { //代理配置
			// '/mock': ''
		}
	},
	plugins: [
		vue({
			template: { transformAssetUrls }
		}),
		AutoImport({ //模块自动引入
			imports: [
				'vue',
				'vue-router',
				'pinia',
				{
					'@/utils/axios': ['$http'], //$http可直接使用
				}
			],
			dts: 'src/auto-imports.d.ts'
		}),
		quasar()
	],
	resolve: {
		//配置快捷路径
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	css: {
		preprocessorOptions: {
			less: {
				modifyVars: {
					// 'primary-color': '#e60000' //主题色配置
				},
				javascriptEnabled: true
			}
		}
	},
	build: {
		rollupOptions: { //打包配置
			output: {
				assetFileNames: `assets/[name].[hash].${DateFormat('yyyyMMdd_hhmmss')}[extname]`, //css、images
				chunkFileNames: `assets/[name].[hash].${DateFormat('yyyyMMdd_hhmmss')}.js`, //js
				entryFileNames: `assets/[name].[hash].${DateFormat('yyyyMMdd_hhmmss')}.js` //index.js
			}
		}
	}
}

//report模式打包启用visualizer
if (process.env.NODE_ENV === 'report') {
	options.plugins.push(visualizer({
		filename: './node_modules/.cache/visualizer/stats.html',
		open: true,
		gzipSize: false,
		brotliSize: false,
	}));
}
//兼容低版本浏览器(不支持IE11)
/* options.plugins.push(legacy({
	targets: ['>1%,last 1 version,ie >= 11'],
	additionalLegacyPolyfills: ['regenerator-runtime/runtime']
})); */


// https://vitejs.dev/config/
export default defineConfig(options)
