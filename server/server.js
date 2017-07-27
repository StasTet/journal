import express from 'express';
import favicon from 'serve-favicon'
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
// import cors from 'cors';
import methodOverride from 'method-override';
import config from './config/config.json';
// import * as db from './config/db';
import router from './routes';

export const startServer = () => {

	const app = express();

	// db.setUpConnection();

	app.use(express.static(path.join('build')));
	app.use(morgan('dev'));
	app.use(favicon(path.join('./favicon.ico')));
	app.use(bodyParser.urlencoded({'extended':'true'}));
	app.use(bodyParser.json());
	// app.use(cors({ origin: '*' }));
	app.use(methodOverride('X-HTTP-Method-Override'));

	app.get('/', (req, res) => {
		res.sendFile(__dirname + '/build/index.html');
    });
    
	app.use('/api', router);

	app.listen(config.port);
    console.log(`Server is up and running on port ${config.port}`);
}
