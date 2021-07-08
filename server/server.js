const express = require('express');
const app = express();
const cors = require('cors')

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const cookieParser = require('cookie-parser')

// Конфиг
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

// Промежуточные обработчики
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

// Подключение роутов
const createRoutes = require('./core/routes')(app)

// Подключение к БД, запуск сервера
mongoose.connect(
	MONGODB_URL,
	{ useUnifiedTopology: true, useNewUrlParser: true },
	err => {
		if (err) {
			return console.log(err)
		} else {
			console.log('\x1b[36m[MONGODB]', `\x1b[0mConnected to ${ MONGODB_URL }`);

			app.listen(PORT, () => 
				console.log('\x1b[36m[SERVER]', `\x1b[0mStarted on localhost:${ PORT }`)
			);
		}
	}
)


