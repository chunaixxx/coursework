const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signinLogger = require('../loggers/signinLogger');
const signupLogger = require('../loggers/signupLogger');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
	async signin(req, res) {
		try {
			const { username, password } = req.body;

			// Поиск соответсвующего пользователя
			const candidate = await User.findOne({ username });

			if (candidate?.password === password) {
				// Генерация JWT-токена
				const token = jwt.sign({ username, password }, JWT_SECRET);

				// Логирование входа
				signinLogger(candidate);

				// Установка токена и отправка ответа
				res.json({ 
					token,
					username
				});
			} else {
				res.status(400).json({ msg: 'Неправильный логин или пароль' });
			}
		} catch (e) {
			console.log(e);
			res.status(500).json({ msg: 'Произошла ошибка при авторизации' });
		}
	},

	async signup(req, res) {
		try {
			const { username, password, repeatPassword } = req.body;

			console.log(req.body)

			// Если пользователь уже существует, то вернуть ответ
			const userExists = await User.findOne({ username });
			if (userExists)
				return res.status(400).json({ msg: 'Пользователь уже существует' });

			// Если пароли не совпадают, то вернуть ответ
			if (password !== repeatPassword)
				return res.status(400).json({ msg: 'Пароли не совпадают' });

			// Создание обьекта пользователя
			const user = new User({ username, password });

			// Сохранение пользователя в базу данных
			await user.save();

			// Логирование регистрации пользователя
			signupLogger(user);

			// Генерация JWT-токена
			const token = jwt.sign({ username, password }, JWT_SECRET);

			res.json({ 
				token,
				username
			});
		} catch (e) {
			res.status(500).json({ msg: 'Произошла ошибка при регистрации' });
		}
	},
};
