const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const cors = require("cors")

//Routes
const register = require("./Routes/register")
const { login } = require("./Routes/login")
const tweet = require("./Routes/Tweet")
const follow = require("./Routes/follow")
const validate = require("./Routes/validate")
const getUser = require("./Routes/getUser")

//middlewares
const validator = require("./middlewares/validator")
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

app.use(cors())
app.use(express.json())
app.use("/register", register)
app.use("/login", login)
app.use("/tweet", validator, tweet)
app.use("/follow", validator, follow)
app.use("/validate", validator, validate)
app.use("/get-user", validator, getUser)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})