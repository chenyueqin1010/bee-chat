import {
	createRouter,
	createWebHashHistory
} from 'vue-router';

let routes = [];

const router_modules =
	import.meta.globEager("./modules/*.js");

Object.values(router_modules).map((o) => {
	routes = routes.concat(o.default);
});

// app router
const router = createRouter({
	history: createWebHashHistory(), //default hash mode
	routes,
	strict: true,
	scrollBehavior: () => ({
		left: 0,
		top: 0
	})
});

router.beforeEach((to, from, next) => {
	// 判断有没有登录
	if (!localStorage.getItem('USER_INFO')) {
		to.name === "Login" ? next() : router.replace('/login');
	} else {
		to.name === "Login" ? router.replace('/') : next();
	}
});

export default router;
