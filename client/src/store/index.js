import { createStore } from 'vuex';
import { VueCookieNext } from 'vue-cookie-next'
import router from '../router'
import { notify } from "@kyvg/vue3-notification";

export default createStore({
	state: {
		token: VueCookieNext.getCookie('token') || null,
		username: VueCookieNext.getCookie('username') || null,
	},

	getters : {
		isLoggedIn: state => !!state.token,
	},

	mutations: {
		setLoggedIn(state, { token, username }) {
			VueCookieNext.setCookie('token', token);
			VueCookieNext.setCookie('username', username);

			state.token = token;
			state.username = username;

			router.push('/')
		},

		logout(state) {
			VueCookieNext.removeCookie('token');
			VueCookieNext.removeCookie('username');

			state.token = null;
			state.username = null;

			router.push('/');

			notify({
				type: 'success',
				text: 'Вы вышли из аккаунта',
			});
		},
	},

	actions: {
		async signin({ commit }, { username, password }) {
			const url = 'http://localhost:3000/api/signin';
			
			try {
				const res = await fetch(url, {
					method: 'POST',
					body: JSON.stringify({ username, password }),
					headers: { 'Content-Type': 'application/json' }
				});

				const data = await res.json();

				if (res.status === 200) {
					const token = data.token;

					notify({
						type: 'success',
						text: 'Вы успешно вошли',
					});

					commit('setLoggedIn', { token, username })
				} else if (res.status === 400) {
					notify({
						type: 'error',
						text: data.msg,
					});
				}
			} catch (e) {
				notify({
					type: 'error',
					text: 'Произошла какая-то ошибка. Проверьте подключение к интернету',
				});
			}
		},

		async signup({ commit }, { username, password, repeatPassword }) {
			const url = 'http://localhost:3000/api/signup';
			
			try {
				const res = await fetch(url, {
					method: 'POST',
					body: JSON.stringify({ username, password, repeatPassword }),
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					},
					cors: 'no-cors',
				})

				const data = await res.json();

				if (res.status === 200) {
					const token = data.token;

					notify({
						type: 'success',
						text: 'Вы успешно создали аккаунт',
					});

					commit('setLoggedIn', { token, username })
				} else if (res.status === 400) {
					notify({
						type: 'error',
						text: data.msg,
					});
				}
			} catch (e) {
				notify({
					type: 'error',
					text: 'Произошла какая-то ошибка. Проверьте подключение к интернету',
				});
			}
		},
	},
	modules: {},
});
