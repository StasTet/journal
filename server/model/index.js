import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const journalSchema = new Schema({
    name:    String,
    surname: String,
    age:     Number,
    phone:   String,
    mark:    String,
    active:  Boolean,
    visible: Boolean
});

export default mongoose.model('Journal', journalSchema);