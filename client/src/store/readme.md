# 1、添加store模块

	在modules新建js文件，添加内容

	export const useDemoStore = defineStore('demo', {
		state: () => ({
			key: ''
		})
	});

# 2、原store添加

	现有js文件，添加内容

	export const useDemoStore = defineStore('demo', {
		state: () => ({
			key: ''
		})
	});

# 3、使用

	import {
		useDemoStore
	} from '@/store/modules/demo'

	const demoStore = useDemoStore();

## ·标签中

	<div>{{demoStore.key}}</div>

## ·js中

### ·取值
	demoStore.key

### ·修改
	demoStore.key = newValue

