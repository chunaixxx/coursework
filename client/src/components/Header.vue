<template>
	<header class="header">
		<router-link to="/" class="logo">
			<img class="logo__img" src="logo.png" alt="">
			<div class="logo__name">polytodo</div>
		</router-link>

		<nav class="header__nav">
			<router-link class="header__link" to="/">Главная</router-link>
			<router-link class="header__link" to="/todo" v-if="isLoggedIn">Задачи</router-link>
			<router-link class="header__link" to="/reviews">Отзывы</router-link>
			<router-link class="header__link" to="/about">О работе</router-link>
		</nav>

		<div v-if="isLoggedIn" class="header__bottom">
			<div class="header__welcome">Привет, {{ username }}</div>

			<button class="header__logout-btn" @click="logout">
				<img src="@/assets/logout.svg" class="header__logout-icon" />
			</button>
		</div>
		<router-link v-else to="/auth" class="header__link">Войти</router-link>
	</header>
</template>

<script>
export default {
	name: 'Header',

	computed: {
		isLoggedIn() {
			return this.$store.getters.isLoggedIn;
		},

		username() {
			return this.$store.state.username;
		},
	},

	created() {

	},

	methods: {
		logout() {
			this.$store.commit('logout');
		},
	},
};
</script>

<style scoped lang="scss">
.header {
	height: 100%;
	padding: 30px 0;

	font-weight: 300;

	color: #fff;
	background-color: #1e1e1e;
	box-shadow: 2px 0px 11px 0px rgba(34, 60, 80, 0.2);

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	&__nav {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__link {
		color: #fff;
		text-decoration: none;
		font-size: 1.3em;

		position: relative;

		&:before {
			transition: width .25s ease;
			height: 1px;
			width: 0%;
			background-color: #fff;
			position: absolute;
			content: '';
			bottom: -2px;
			left: 0px;
		}

		&:hover:before {
			width: 100%;
		}

		&.router-link-active:before {
			width: 100%;
		}

		&:not(:last-child) {
			margin-bottom: 20px;
		}
	}

	&__bottom {
		font-size: 1.3em;

		display: flex;
		align-items: center;
	}

	&__welcome {
		margin-right: 10px;
	}

	&__logout-btn {
		display: flex;
		align-items: center;
		justify-content: center;

		border: none;
		background-color: transparent;
		cursor: pointer;

		padding: 3px;
	}

	&__logout-icon {
		width: 17px;
	}
}

.logo {
	font-size: 1.5em;
	text-align: center;
	text-decoration: none;
	color: #fff;
	font-weight: 300;

	display: flex;
	align-items: center;

	&__img {
		width: 45px;
	}

	&__name {
		margin-left: 12px;
	}
}
</style>
