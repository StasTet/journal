import express from 'express';
import favicon from 'serve-favicon'
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import passport from 'passport';
import localLoginStrategy from './passport/local-login';
import localSignupStrategy from './passport/local-signup';

import authCheckMiddleware from './middleware/auth-check';

import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import wpConfig from '../webpack.config.js'
import webpack from 'webpack';

import cors from 'cors';
import methodOverride from 'method-override';
import config from './config/config.json';
import { setUpConnection } from './config/db';
import apiRoutes from './routes/api';
import authRoutes from './routes/auth';

export const startServer = () => {

    const app = express();

    setUpConnection();

    const compiler = webpack(wpConfig);

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: wpConfig.output.publicPath
    }));
    
    app.use(webpackHotMiddleware(compiler));

    app.use(express.static(path.join('build')));
    app.use(morgan('dev'));
    app.use(favicon(path.join('./favicon.ico')));
    app.use(bodyParser.urlencoded({'extended':'true'}));
    app.use(bodyParser.json());
    app.use(cors({ origin: '*' }));
    app.use(methodOverride('X-HTTP-Method-Override'));

    // pass the passport middleware
    app.use(passport.initialize());


    // load passport strategies
    passport.use('local-signup', localSignupStrategy);
    passport.use('local-login', localLoginStrategy);

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/build/index.html');
    });

    // pass the authenticaion checker middleware
    app.use('/api', authCheckMiddleware);
    
    app.use('/api', apiRoutes);

    app.use('/auth', authRoutes);

    app.use('*', (req, res) => {
           res.status(404);
        res.send('<h1>Page Not Found</h1><p>Go to <a href="/">main page</a></p>');
    });

    app.listen(config.port, (error) => {
        if (error) {
            return console.error(error);
        }

        return console.log(`Server is up and running on port ${config.port}`);
    });
    
}
