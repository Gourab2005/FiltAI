const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    Hospitals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hospital',
        }
    ],
    Apidata: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ApiData',
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};
