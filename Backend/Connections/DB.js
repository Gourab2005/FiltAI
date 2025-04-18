const { default: mongoose } = require("mongoose");

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/FiltAI';

mongoose.connect(url)
    .then(()=>{
        console.log('Connected to MongoDB');
    }).catch((err)=>{
        console.error('Error connecting to MongoDB', err);
    });