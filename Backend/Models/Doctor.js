const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    doctorname: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    availability: [{
        day: { type: String },
        slots: [String]
    }],
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = {
    Doctor
};
