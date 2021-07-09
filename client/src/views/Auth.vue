<template>
	<main class="auth">
		<transition name="fade">
			<form v-if="showSignIn" class="form" key="signin" @submit.prevent>
				<h2 class="form__title">Войти</h2>

				<label class="form__label">
					<h5 class="form__input-title">Логин</h5>
					<input class="form__input" type="text" autocomplete="off" v-model="loginInput">
				</label>

				<label class="form__label">
					<h5 class="form__input-title">Пароль</h5>
					<input class="form__input" type="password" autocomplete="off" v-model="passwordInput">
				</label>

				<button type="submit" class="form__submit" @click="signin">Войти</button>
				<button class="form__switch" @click="showSignIn = false">Создать аккаунт</button>
			</form>

			<form v-else class="form" key="signup" @submit.prevent="signup">
				<h2 class="form__title">Создать аккаунт</h2>

				<label class="form__label">
					<h5 class="form__input-title">Логин</h5>
					<input class="form__input" type="text" autocomplete="off" v-model="loginInput">
				</label>

				<label class="form__label">
					<h5 class="form__input-title">Пароль</h5>
					<input class="form__input" type="password" autocomplete="off" v-model="passwordInput">
				</label>

				<label class="form__label">
					<h5 class="form__input-title">Повторите пароль</h5>
					<input class="form__input" type="password" autocomplete="off" v-model="repeatPasswordInput">
				</label>

				<button type="submit" class="form__submit">Создать</button>
				<button class="form__switch" @click="showSignIn = true" type="button">Уже есть аккаунт?</button>
			</form>
		</transition>
	</main>
</template>

<script>
export default {
	data: () => ({
		showSignIn: true,
		loginInput: '',
		passwordInput: '',
		repeatPasswordInput: '',
	}),

	methods: {
		signin() {
			this.$store.dispatch('signin', {
				username: this.loginInput,
				password: this.passwordInput
			})
		},

		signup() {
			if (this.passwordInput !== this.repeatPasswordInput) {
				this.$notify({
					type: 'error',
					text: 'Пароли не совпадают'
				})
			} else {
				this.$store.dispatch('signup', {
					username: this.loginInput,
					password: this.passwordInput,
					repeatPassword: this.repeatPasswordInput
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.auth {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.form {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 30px 100px;

		&__title {
			text-align: center;
			margin-bottom: 20px;
			color: #111;
			font-weight: 500;
		}

		&__input-title {
			color: #222;
			font-weight: 400;
			font-size: 1.05em;
		}

		&__input {
			outline: none;
			border: none;

			font-size: 1.3em;
			margin-bottom: 15px;
			border-bottom: 2px solid #636363;
			transition: border-bottom .3s ease;
			padding: 3px;

			&:focus {
				border-bottom: 2px solid #000;
			}
		}

		&__submit {
			background-color: #333;
			color: #fff;
			border: none;
			padding: 5px 0;
			font-size: 1.2em;
			cursor: pointer;
			transition: background-color .3s ease;
			margin-bottom: 10px;

			&:hover {
				background-color: #111;
			}
		}

		&__switch {
			border: none;
			background-color: transparent;
			font-size: 1.1em;
			text-decoration: underline;
			color: #222;
			cursor: pointer;
		}
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
		position: absolute;
	}
</style>