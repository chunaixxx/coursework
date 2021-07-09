import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/About.vue'),
	},
	{
		path: '/auth',
		name: 'Auth',
		component: () => import('../views/Auth.vue'),
		meta: {
			requiresGuest: true,
		},
	},
	{
		path: '/todo',
		name: 'Todo',
		component: () => import('../views/Todo.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/reviews',
		name: 'Reviews',
		component: () => import('../views/Reviews.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (store.getters.isLoggedIn) {
			next();
			return;
		}
		next('/auth');
	}

	if (to.matched.some((record) => record.meta.requiresGuest)) {
		if (!store.getters.isLoggedIn) {
			next();
			return;
		}
		next('/');
	}

	next();
});

export default router;
