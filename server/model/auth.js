import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        index: { unique: true }
    },
    password: String,
    name: String
});


// UserSchema.methods.comparePassword = function comparePassword(password, callback) {
//     bcrypt.compare(password, this.password, callback);
// };


// /**
//  * The pre-save hook method.
//  */
//     UserSchema.pre('save', (next) => {

//     // proceed further only if the password is modified or the user is new
//     if (!this.isModified('password')) return next();

//         return bcrypt.genSalt((saltError, salt) => {
//             if (saltError) { return next(saltError); }

//             return bcrypt.hash(this.password, salt, (hashError, hash) => {
//             if (hashError) { return next(hashError); }

//             // replace a password string with hash value
//             this.password = hash;

//             return next();
//             });
//         });
//     });


export default mongoose.model('User', UserSchema);