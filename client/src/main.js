import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import {
	store
} from './store'
import '@/utils/global'

import {
	Quasar,
	Notify,
	Dialog,
	Loading
} from 'quasar'
import zhCN from 'quasar/lang/zh-CN'

// Import Quasar css
import 'quasar/dist/quasar.css'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

const app = createApp(App);

app.use(router);
app.use(store);

app.use(Quasar, {
	// import Quasar plugins and add here
	plugins: {
		Notify,
		Dialog,
		Loading
	},
	config: {
		notify: {
			color: 'primary',
			timeout: 2500
		}
	},
	lang: zhCN
})

app.mount('#app');
