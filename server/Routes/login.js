const router = require("express").Router()
const User = require("../models/User")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const path = require('path')
const dotenv = require("dotenv")

dotenv.config({
    path: path.join(__dirname, "../", ".env")
})

const getFollowersUsername = (followers) => {
    let follows = []
    let count = 0
    return new Promise((resolve, reject) => {
        try {
            if (followers.length > 0) {
                followers.forEach(async element => {
                    const { username } = await User.findById(element)
                    follows.push(username)
                    count++
                    if (count === followers.length) {
                        resolve(follows)
                    }
                });
            } else {
                resolve([])
            }
        } catch (err) {
            console.log(err);
            resolve([])
        }
    })

}

const getFollowingsUsername = (followings) => {
    let following = []
    let count = 0
    return new Promise((resolve, reject) => {
        try {
            if (followings.length > 0) {
                followings.forEach(async element => {
                    const { username } = await User.findById(element)
                    following.push(username)
                    count++
                    if (count === followings.length) {
                        resolve(following)
                    }
                });
            } else {
                resolve([])
            }
        } catch (err) {
            console.log(err);
            resolve([])
        }
    })

}

const login = (username, password) => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ username: username })
            if (user) {
                const validate = bcrypt.compareSync(password.toString(), user.password)

                if (validate) {
                    const followers = await getFollowersUsername(user.followers)
                    const followings = await getFollowingsUsername(user.following)

                    console.log(followers);
                    console.log(followings);

                    const token = jwt.sign({
                        username: user.username,
                        emai: user.email,
                        followers: followers,
                        following: followings
                    },
                        process.env.JWT_KEY)
                    resolve(token)


                } else {
                    reject({ msg: "Password wrong" })
                }
            } else {
                reject({ msg: "User not found" })
            }
        } catch (err) {
            console.log(err);
            reject({ error: err })
        }
    })

    return promise
}
router.get("/", (req, res) => {
    res.sendStatus(404)
})

router.post("/",
    body("username").trim().isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({ ok: false, errors: errors.array() })
        }
        const { username, password } = req.body

        login(username, password)
            .then((data, err) => {
                err ? res.json({ ok: false, error: err }) : res.json({ ok: true, data })
            })
            .catch(err => {
                res.json({ ok: false, error: err })
            })


    })
module.exports = router