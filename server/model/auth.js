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


UserSchema.methods.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
    UserSchema.pre('save', function saveHook(next) {
        const user = this;
        // proceed further only if the password is modified or the user is new

        if (!user.isModified('password')) return next();

        return bcrypt.genSalt((saltError, salt) => {
            if (saltError) { return next(saltError); }

            return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) { return next(hashError); }

            // replace a password string with hash value
            user.password = hash;
            
            return next();
            });
        });
    });


export default mongoose.model('User', UserSchema);