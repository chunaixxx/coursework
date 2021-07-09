<template>
	<main class="todo">
		<form class="form" @submit.prevent>
			<input class="form__input" placeholder="Название списка" type="text" v-model="categoryInput">
			<button class="form__submit" @click="addCategory(); categoryInput = ''">Добавить</button>
		</form>

		<div class="list-container">
			<div class="list" v-for="category in data" :key="category._id">
				<div class="list__header">
					<h3 class="list__title">{{ category.title }}</h3>
					
					<button class="list__delete" @click="deleteCategory(category._id)">
						<img class="item__delete-icon" src="delete-icon.svg" alt="">
					</button>
				</div>

				<div
					v-for="todo in category.todos" :key="todo._id"
				>
					<div class="item">
						<div class="item__inner">
							<div class="item__desc">{{ todo.desc }}</div>
						</div>

						<button class="item__delete" @click="deleteTodo(todo._id)">
							<img class="item__delete-icon" src="delete-icon.svg" alt="">
						</button>
					</div>
				</div>

				<form class="form" @submit.prevent>
					<input class="form__input" placeholder="Описание задачи" type="text" v-model.trim="addTodoInputs[category._id]">
					<button class="form__submit" @click="addTodo(category._id, addTodoInputs[category._id]); addTodoInputs[category._id] = ''">Добавить</button>
				</form>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	async mounted() {
		this.updateData();
	},

	data: () => ({
		categoryInput: '',
		addTodoInputs: {},
		data: []
	}),

	methods: {
		// Display none ghost of task
		modifyDragItem: (e) => e.setDragImage(document.createElement('div'), 0, 0),

		async addCategory() {
			await fetch('http://localhost:3000/api/category', {
				method: 'POST',
				body: JSON.stringify({
					title: this.categoryInput,
				}),
				headers: { 
					'Authorization': this.$store.state.token,
					'Content-Type': 'application/json'
				} 
			})

			this.updateData();
		},

		async addTodo(category_id, desc) {
			await fetch('http://localhost:3000/api/todo', {
				method: 'POST',
				body: JSON.stringify({
					category_id, desc
				}),
				headers: { 
					'Authorization': this.$store.state.token,
					'Content-Type': 'application/json'
				} 
			});

			this.updateData();
		},

		async updateData() {
			const res = await fetch('http://localhost:3000/api/todo', { 
				method: 'GET',
				headers: { Authorization: this.$store.state.token } 
			})
			
			const data = await res.json();

			this.data = data;
		},

		async deleteTodo(todo_id) {
			await fetch('http://localhost:3000/api/todo', {
				method: 'DELETE',
				body: JSON.stringify({ todo_id }),
				headers: { 
					'Authorization': this.$store.state.token,
					'Content-Type': 'application/json'
				} 
			});

			this.updateData();
		},

		async deleteCategory(category_id) {
			await fetch('http://localhost:3000/api/category', {
				method: 'DELETE',
				body: JSON.stringify({ category_id }),
				headers: { 
					'Authorization': this.$store.state.token,
					'Content-Type': 'application/json'
				} 
			});

			this.updateData();
		},
	},
}
</script>

<style lang="scss" scoped>
	.todo {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30px;
		height: 100vh;
		overflow-y: scroll;
	}

	.form {
		display: flex;
		align-items: center;
		height: 40px;
		margin-top: 10px;
		width: 100%;

		&__input {
			width: 100%;
			height: 100%;

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
			height: 100%;
			padding: 5px 30px;
			border: none;
			cursor: pointer;
		}
	}

	.add-list-btn {
		font-size: 1.5em;
		text-decoration: none;
		font-weight: 300;
		color: #fff;
		background-color: #4bb543;
		border-radius: 3px;
		padding: 7px 30px;
		box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.3);
		transition: all .25s ease;
		border: none;
		margin-bottom: 10px;
		cursor: pointer;

		&:hover {
			transform: translateY(-5px);
			box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
		}
	}

	.list-container {
		width: 100%;
	}

	.list {
		width: 100%;
		margin: 30px 0;

		&__header {
			display: flex;
			justify-content: space-between;
		}

		&__delete {
			outline: none;
			background-color: transparent;
			border: 0;
			cursor: pointer;
			font-size: 1.3em;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 20px;
		}

		&__title {
			font-size: 1.5em;
			margin-bottom: 10px;
			font-weight: 400;
		}
	}

	.item {
		background: #fff;
		padding: 17px 15px;
		margin-top: 5px;

		display: flex;
		align-items: center;
		justify-content: space-between;

		&__inner {
			display: flex;
			align-items: center;
		}

		&__done {
			margin-right: 10px;
		}

		&:hover &__delete {
			opacity: 1;
		}

		&__delete {
			outline: none;
			background-color: transparent;
			border: 0;
			cursor: pointer;
			font-size: 1.3em;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 20px;
			
			opacity: 0;
			transition: opacity .25s ease;
		}

		&__delete-icon {
			width: 20px;
		}
	}
</style>