const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    hospitalname: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    hospitalhead: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    Doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        default: []
    }]    
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = {
    Hospital
};
