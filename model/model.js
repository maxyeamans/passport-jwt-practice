const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hook to hash the user's password before their document is created
UserSchema.pre('save', async function(next) {
    const user = this;
    // I think bcrypt has a built-in synchronous version of below named hashSync.
    // Anyway, this is what will hash the password before saving.
    const hash = await bcrypt.hash(this.password, 10);
    // Replace the user-inputted password with the hashed version.
    this.password = hash;
    // Move on to the next middleware function
    next();
});

// This is an instance method to compare the user-submitted password to the stored hash.
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;

    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;