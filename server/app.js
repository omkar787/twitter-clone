const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const register = require("./Routes/register")
const login = require("./Routes/login")

dotenv.config()

mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch(err => {
        console.log("Database connection failed " + err);
    })

const app = express()

app.use(express.json())
app.use("/register", register)
app.use("/login", login)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})