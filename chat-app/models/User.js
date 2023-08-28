const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require("crypto")

// Create Schema for Users
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
    hashed_password: {
        type: String,
        required: "Password is required"
    },
    salt: String,
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
});

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })

UserSchema.path('hashed_password').validate(function (v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required')
    }
}, null)

UserSchema.methods = {
    authenticate: async function (plainText) {
        let currpass = await this.encryptPassword(plainText)
        console.log("currpass",currpass);
        return currpass === this.hashed_password
    },
    encryptPassword: function (password) {
        if (!password) return ''
        try {
                
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            console.log(err);
            return ''
        }
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}


module.exports = User = mongoose.model('User', UserSchema);
