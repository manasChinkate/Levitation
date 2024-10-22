
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const { registerUser } = require('./controller/RegisterUser');
const { loginUser } = require('./controller/LoginUser');



require('dotenv').config()
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true // Allow cookies to be sent cross-origin
}));

const database = process.env.URI

app.listen(PORT, () => {
    console.log(`Levitation app listening on port ${PORT}`)
})

mongoose.connect(database)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });


//routes

app.post('/register',registerUser)
app.post('/login',loginUser)