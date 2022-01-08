const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")
const { body, validationResult } = require('express-validator')



const save = (username, email, password) => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const salt = bcrypt.genSaltSync(5)
            const hash = bcrypt.hashSync(password.toString(), salt)
            let result = await User.create({
                username,
                email,
                password: hash
            })

            result.password = null
            console.log(result);
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })

    return promise
}

router.get("/", (req, res) => {
    res.sendStatus(404)
})

router.post("/",
    body("username").trim().isLength({ min: 3 }),
    body('email').normalizeEmail().isEmail(),
    body('password').isLength({ min: 5 }),
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({ ok: false, errors: errors.array() })
        }
        const { username, email, password } = req.body

        save(username, email, password)
            .then((data, err) => {
                err ? res.json({ ok: false, err }) : res.json({ ok: true, data })
            })
            .catch(err => {
                console.log(err);
                res.json({ ok: false, msg: "An error occured", error: err })
            })
    })

module.exports = router