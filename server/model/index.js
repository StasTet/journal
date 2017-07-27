import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const journalSchema = new Schema({
    id:      Number,
    name:    String,
    surname: String,
    age:     Number,
    phone:   Number,
    mark:    String,
    active:  Boolean,
    visible: Boolean
});

export default mongoose.model('Journal', journalSchema);