const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

// Промежуточный обработчик, проверяющий авторизацию пользователя
const authenticate = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		const decoded = jwt.verify(token, JWT_SECRET);

		const candidate = await User.findOne({ username: decoded.username });

		if (candidate.password === decoded.password) {
			res.locals.user = candidate;
			next();
		} else {
			res.status(401).json({ msg: 'Пароль был изменен. Авторизуйтесь' });
		}
	} catch (e) {
		res.status(401).json({ msg: 'Авторизуйтесь' });
	}
};

module.exports = authenticate;
