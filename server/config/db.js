import mongoose from 'mongoose';
// import config from './config.json';

// const url = `mongodb://${config.db.user}:${config.db.pass}@${config.db.host}:${config.db.port}/${config.db.key}`;
const url = 'mongodb://localhost:27017/journal';

export const setUpConnection = () => {
    console.log(url)
    mongoose.connect(url, {
        useMongoClient: true
    });
}