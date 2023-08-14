const user = {
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    username: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    hashed_password: {
        type: String,
        required: "Password is required"
    },
    salt: String,
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
    educator: {
        type: Boolean,
        default: false
    },
}