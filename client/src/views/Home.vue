<template>
	<main class="home">
		<h1 class="home__title">Добро пожаловать в polytodo</h1>
		<h2 class="home__subtitle">Простое приложение для ведения списков рабочих дел</h2>
		<router-link to="/todo" class="home__link-add">Попробовать</router-link>

		<div class="home__link-block">
			<a class="home__link" href="https://github.com/chunaixxx/coursework" target="_blank">Github</a>
			|
			<a class="home__link" href="https://t.me/chunaichunai" target="_blank">Telegram</a>
			|
			<a class="home__link" href="https://vk.com/chunaipalich" target="_blank">VK</a>
		</div>
	</main>
</template>

<script>
export default {
	name: 'Home',
};
</script>

<style lang="scss">
	.home {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	

		&__title {
			color: #111;
			font-weight: 500;
			font-size: 2.2em;
			margin-bottom: 5px;
		}

		&__subtitle {
			color: #333;
			font-weight: 300;
			font-size: 1.8em;
			margin-bottom: 15px;
		}

		&__link-add {
			font-size: 1.5em;
			text-decoration: none;
			font-weight: 300;
			color: #fff;
			background-color: #4bb543;
			border-radius: 3px;
			padding: 7px 45px;
			box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.3);
			transition: all .25s ease;

			&:hover {
				transform: translateY(-5px);
				box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
			}
		}

		&__link-block {
			margin-top: 15px;
			display: flex;
			font-size: 1.1em;
		}

		&__link {
			margin: 0 10px;
		}
	}
</style>
