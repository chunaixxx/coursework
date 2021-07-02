const authController = require('../controllers/authController');
const todoController = require('../controllers/todoController');
const categoryController = require('../controllers/categoryController');
const reviewController = require('../controllers/reviewController');

// Промежуточный обработчик, проверяющий авторизацию пользователя
const authenticate = require('../middleware/authenticate');

const createRoutes = app => {
	// AUTH
	app.post('/api/signin', authController.signin);
	app.post('/api/signup', authController.signup);
	
	// TOOD
	app.post('/api/todo', authenticate, todoController.create);
	app.get('/api/todo', authenticate, todoController.read);
	app.put('/api/todo', authenticate, todoController.update);
	app.delete('/api/todo', authenticate, todoController.delete);

	// CATEGORY
	app.post('/api/category', authenticate, categoryController.create);
	app.get('/api/category', authenticate, categoryController.read);
	app.put('/api/category', authenticate, categoryController.update);
	app.delete('/api/category', authenticate, categoryController.delete);

	// REVIEW
	app.post('/api/review', authenticate, reviewController.create);
	app.get('/api/review', reviewController.read);

	// 404
	app.use((req, res) =>
		res.status(404).json({ msg: 'API по данному адресу не найдено'})
	);	
}

module.exports = createRoutes;