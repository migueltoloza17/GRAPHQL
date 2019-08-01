
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
name: String,
email: String,
password: String,
img:{
    type: String,
    default: ''
}
});

userSchema.pre('save', function(next){
const user = this;
console.log(user);
const saltRounds = 10;
bcrypt.genSalt(saltRounds, function(err, salt) {
    if(err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
    if(err) return next(err);
    user.password = hash;
    return next();
    })
})
})

const User = mongoose.model('user', userSchema);

module.exports = User