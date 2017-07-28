import mongoose from 'mongoose';
import config from './config.json';

const url = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

export const setUpConnection = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(url, {
        useMongoClient: true
    });
}