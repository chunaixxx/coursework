const Category = require('../models/Category');
const Todo = require('../models/Todo');
const mongoose = require('mongoose');

module.exports = {
	async create(req, res) {
		try {
			const data = req.body;
			const user = res.locals.user;
	
			// Создание обьекта TODO
			const category = new Category({
				...data, 
				user_id: user._id
			});
	
			// Сохранение TODO в базу данных
			await category.save()

			res.json({ msg: 'CATEGORY успешно создана'})
		} catch (e) {
			console.log(e)
			res.status(500).json({ msg: 'Произошла какая-то ошибка при создании CATEGORY'})
		}
	},

	async read(req, res) {
		try {
			const user = res.locals.user;

			const categories = await Category.find({ user_id : user._id });
	
			res.json(categories);
		} catch (e) {
			res.status(500).json({ msg: 'Произошла какая-то ошибка при получении CATEGORIES'})
		}
	},

	async update(req, res) {
		try {
			const user = res.locals.user;
			const { category_id, title, colorHex } = req.body;

			const category = await Category.updateOne(
				{ _id: category_id, user_id: user._id }, // Какой обьект обновить
				{ colorHex, title },					// Что в этом обьекте обновить
			);

			if (category.n === 0)
				return res.status(404).json({ msg: 'CATEGORY не найдена'})

			res.json({ msg: 'CATEGORY успешно обновлена'})	
		} catch(e) {
			console.log(e);
			res.status(500).json({ msg: 'Произошла какая-то ошибка при обновлении CATEGORY'})
		}
	},

	async delete(req, res) {
		try {
			const category_id = req.body.category_id;
			const user = res.locals.user;

			// Удалить запрошенную категорию
			const category = await Category.remove({
				_id: category_id,
				user_id: user._id
			});

			if (category.n === 0)
				return res.status(404).json({ msg: 'CATEGORY не найдена'})

			// Удалить все TODO из этой категории
			await Todo.remove({ 
				category_id: mongoose.Types.ObjectId(category_id), 
				user_id: user._id 
			});

			res.json({ msg: 'CATEGORY успешно удалена' })
		} catch(e) {
			console.log(e);
			res.status(500).json({ msg: 'Произошла какая-то ошибка при удалении CATEGORY' })
		}
	}
}