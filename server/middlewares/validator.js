const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const path = require("path")
const User = require("../models/User")

dotenv.config({
    path: path.join(__dirname, "../", ".env")
})

const validator = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]
        if (token) {
            const auth = jwt.verify(token, process.env.JWT_KEY)
            const user = await User.findOne({ username: auth.username }, "-password")
            req.user = user
            next()
        } else {
            res.json({ ok: false, msg: "Token not provided" })
        }
    } catch (err) {
        res.json({ ok: false, msg: "An error occured", error: err })
    }
}

module.exports = validator