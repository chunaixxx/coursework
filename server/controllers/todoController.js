const Todo = require('../models/Todo');
const Category = require('../models/Category');
const mongoose = require('mongoose');

module.exports = {
	async create(req, res) {
		try {
			const { desc, category_id } = req.body;
			const user = res.locals.user;

			// Нахождение запрашиваемой категории
			const categoryExists = await Category.findOne({
				_id: category_id,
				user_id: user._id,
			});

			if (categoryExists === null)
				res.status(404).json({ msg: 'Не найдена CATEGORY для TODO' });

			// Создание обьекта TODO
			const todo = new Todo({
				desc,
				category_id: mongoose.Types.ObjectId(category_id),
				user_id: user._id,
				date: new Date(),
			});

			// Сохранение TODO в базу данных
			await todo.save();

			// Отправка ответа
			res.json({ msg: 'TODO успешно создана' });
		} catch (e) {
			console.log(e);
			res.status(500).json({ msg: 'Произошла какая-то ошибка при создании TODO' });
		}
	},

	async read(req, res) {
		try {
			const user = res.locals.user;

			// Нахождение всех категорий пользователя
			const categories = await Category.find({ user_id: user._id });
	
			// Распределение всех TODO по категориям в переменную data
			const data = [];
			for (category of categories) {
				const todos = await Todo.find({
					user_id: user._id,
					category_id: category._id,
				});
	
				data.push({
					_id: category._id,
					title: category.title,
					colorHex: category.colorHex,
					todos,
				});
			}
	
			res.json(data);
		} catch (e) {
			console.log(e);
			res.status(500).json({ msg: 'Произошла ошибка при получении TODO' });
		}
	},

	async update(req, res) {
		try {
			const user = res.locals.user;
			const { todo_id, desc } = req.body;

			const todo = await Todo.updateOne(
				{ _id: todo_id, user_id: user._id },
				{
					desc
				},
			);

			if (todo.n === 0)
				return res.status(404).json({ msg: 'TODO не найдена' });

			res.json({ msg: 'TODO успешно обновлена' });
		} catch (e) {
			console.log(e);
			res.status(500).json({ msg: 'Произошла какая-то ошибка при обновлении TODO' });
		}
	},

	async delete(req, res) {
		try {
			const todo_id = req.body.todo_id;
			const user = res.locals.user;
	
			const removeTodo = await Todo.deleteOne({
				_id: todo_id,
				user_id: user._id
			});

			if (removeTodo.n === 0)
				return res.status(404).json({ msg: 'TODO не найдена'})

			res.json({ msg: 'TODO успешно удалена'})	
		} catch (e) {
			console.log(e);
			res.status(500).json({ msg: 'Произошла какая-то ошибка при удалении TODO' });
		}
	},
};
