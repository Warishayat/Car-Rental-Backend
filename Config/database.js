const mongoose = require('mongoose')
const dotenv = require('dotenv').config();


const ConnectDB = async()=>{
    try {
        const conn =  await mongoose.connect(process.env.DATABASE_URI);
        console.log('mongodb is connected');
    }catch(error) {
        console.log(error)
    }
}

module.exports = ConnectDB;