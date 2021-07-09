<template>
	<main class="about">
		<div class="about__inner">
			<h1 class="title">Инженерное проектирование</h1>
			<ul class="list">
				<li class="list__item">Тема: TODO-лист</li>
				<li class="list__item">Студент: Кириллов Даниил Павлович</li>
				<li class="list__item">Группа: 201-322</li>
				<li class="list__item">Почта: <a href="mailto:kirillov.danek@gmail.com">kirillov.danek@gmail.com</a></li>
			</ul>
		</div>
	</main>
</template>

<style lang="scss" scoped>
	.about {
		width: 100%;
		height: 100%;
		padding: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.title {
		margin-bottom: 10px;
		font-weight: 500;
	}

	.list {
		list-style-type: none;

		&__item {
			font-weight: 400;
			margin-bottom: 10px;
			font-size: 1.5em;
			color: #222;
		}
	}
</style>
