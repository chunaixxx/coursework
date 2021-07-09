<template>
	<Header />

	<router-view />

	<notifications />
</template>

<script>
import Header from './components/Header';

export default {
	components: { Header },
};
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700&display=swap');

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		font-family: 'Montserrat', 'Arial', sans-serif;
		background-color: #ebebeb;
	}

	#app {
		display: grid;
		grid-template-columns: 280px 1fr;
		grid-template-rows: 1fr;
		min-height: 100vh;
	}

	a {
		color: inherit;
	}
</style>
