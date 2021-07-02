const authController = require('../controllers/authController');
const todoController = require('../controllers/todoController');
const categoryController = require('../controllers/categoryController');
const reviewController = require('../controllers/reviewController');

const createRoutes = app => {
	// AUTH
	app.post('/api/signin', authController.signin);
	app.post('/api/signup', authController.signup);
	
	// TOOD
	app.post('/api/todo', todoController.create);
	app.get('/api/todo', todoController.read);
	app.put('/api/todo', todoController.update);
	app.delete('/api/todo', todoController.delete);

	// CATEGORY
	app.post('/api/category', categoryController.create);
	app.get('/api/category', categoryController.read);
	app.put('/api/category', categoryController.update);
	app.delete('/api/category', categoryController.delete);

	// REVIEW
	app.post('/api/review', reviewController.create);
	app.get('/api/review', reviewController.read);

	// 404
	app.use((req, res) =>
		res.status(404).json({ msg: 'API по данному адресу не найдено'})
	);	
}

module.exports = createRoutes;