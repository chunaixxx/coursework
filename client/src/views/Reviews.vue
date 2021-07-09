<template>
	<main class="reviews">
		<h2 class="reviews__title">Отзывы</h2>

		<div class="reviews-container">
			<div class="review" v-for="review in reviews" :key="review._id">
				<div class="review__author">{{ review.author }}</div>
				<div class="review__desc">{{ review.desc }}</div>

				<div class="review__footer">
					<div class="review__grade">Оценка пользователя: {{ review.grade }}/5</div>
					<div class="review__date">{{ (new Date(review.date)).toLocaleDateString() }}</div>
				</div>
			</div>
		</div>

		<form class="form" @submit.prevent v-if="isLoggedIn">
			<div class="form__container">
				<input class="form__input" placeholder="Описание" type="text" v-model.trim="desc">

				<select class="form__select" v-model="grade">
					<option value="" disabled selected>Оценка</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
			</div>

			<button class="form__submit" @click="addReview(); desc = ''">Отправить</button>
		</form>
	</main>
</template>

<script>
import { notify } from "@kyvg/vue3-notification";
export default {
	data: () => ({
		reviews: [],

		desc: '',
		grade: ''
	}),

	methods: {
		async updateData() {
			const res = await fetch('http://localhost:3000/api/review');
			const reviews = await res.json();
			this.reviews = reviews;
		},

		async addReview() {
			try {
				const res = await fetch('http://localhost:3000/api/review', {
					method: 'POST',
					body: JSON.stringify({ 
						desc: this.desc, 
						grade: this.grade,
					}),
					headers: { 
						'Authorization': this.$store.state.token,
						'Content-Type': 'application/json'
					} 
				})

				if (res.status === 200) {
					this.updateData();

					notify({
						type: 'success',
						text: 'Вы успешно оставили отзыв',
					});
				} else {
					throw Error();
				}
			} catch(e) {
					notify({
					type: 'error',
					text: 'Произошла ошибка при написании отзыва',
				});
			}

		},
	},
	
	computed: {
		isLoggedIn() {
			return this.$store.getters.isLoggedIn;
		},
	},

	mounted() {
		this.updateData();
	},
}
</script>

<style lang="scss" scoped>
	.reviews {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30px;
		height: 100vh;
		overflow-y: scroll;

		&__title {
			font-weight: 300;
			font-size: 1.5em;
			margin-bottom: 20px;
		}
	}

	.reviews-container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.review {
		background-color: #fff;
		width: 100%;
		padding: 15px 20px;
		margin-bottom: 20px;

		&__author {
			font-weight: 500;
			font-size: 1.3em;
			margin-bottom: 5px;
		}

		&__desc {
			margin-bottom: 10px;
		}

		&__footer {
			display: flex;
			justify-content: space-between;
		}
	}

	.form {
		margin-top: 10px;
		width: 100%;

		&__container {
			display: flex;
			margin-bottom: 5px;
		}

		&__input {
			width: 100%;
			height: 40px;

			outline: none;
			border: none;

			font-size: 1.2em;
			border-bottom: 2px solid #636363;
			transition: border-bottom .3s ease;
			padding: 5px;

			&:focus {
				border-bottom: 2px solid #000;
			}
		}

		&__select {
			height: 40px;

			outline: none;
			border: none;

			font-size: 1.2em;
			border-bottom: 2px solid #636363;
			transition: border-bottom .3s ease;
			padding: 5px;

			&:focus {
				border-bottom: 2px solid #000;
			}
		}

		&__submit {
			background-color: #1e1e1e;
			color: #fff;
			font-size: 1.1em;
			font-weight: 200;
			width: 100%;
			padding: 5px 30px;
			border: none;
			cursor: pointer;
		}
	}
</style>