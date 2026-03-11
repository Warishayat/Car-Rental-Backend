const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const body_parser = require('body-parser')
const ConnectDB = require('./Config/database')
const auth_router = require('./Routes/auth_route');
const contact_router = require('./Routes/contact_route');


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const port = process.env.port || 8000;
app.use(cors({
    origin:"*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders : ["Content-Type", "Authorization"],
}));

ConnectDB();
app.get("/",(req,res)=>{
    res.send(
        "App is working up"
    )
})


app.use('/auth/',auth_router);
app.use('/admin/',contact_router);


app.listen(port,()=>{
    console.log(`App is working on the PORT ${port}`)
})
