const Review = require('../models/Review');
module.exports = {
	async create(req, res) {
		try {
			const { desc, grade } = req.body;
			const user = res.locals.user;
	
			// Создание нового отзыва
			const review = new Review({
				author: user.username,
				desc,
				grade,
				user_id: user._id,
				date: new Date()
			});
	
			// Сохранение отзыва в базу данных
			await review.save()

			res.json({ msg: 'Отзыв успешно оставлен'})
		} catch (e) {
			console.log(e)
			res.status(500).json({ msg: 'Произошла какая-то ошибка при написании отзыва'})
		}		
	},

	async read(req, res) {
		try {
			const reviews = await Review.find();
			res.json(reviews);
		} catch (e) {
			res.status(500).json({ msg: 'Произошла ошибка при получении отзывов'})	
		}
	},
}