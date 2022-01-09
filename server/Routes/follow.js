const router = require("express").Router()
const { body, validationResult } = require("express-validator")
const mongoose = require("mongoose")
const User = require("../models/User")

const addUsers = (user1, user2) => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const userOne = await User.findOne({ username: user1 })
            const userTwo = await User.findOne({ username: user2 })

            if (!userOne.following.includes(userTwo._id)) {
                userOne.following.push(userTwo._id)
            }
            if (!userTwo.followers.includes(userOne._id)) {
                userTwo.followers.push(userOne._id)
            }

            await userOne.save()
            await userTwo.save()

            console.log(userOne, userTwo);
            resolve({ ok: true, msg: "Followed Successfully" })
        } catch (err) {
            reject({ ok: false, msg: "An error occured", error: err })
        }
    })

    return promise
}

router.get("/", (req, res) => {
    res.sendStatus(404)
})

router.post("/",
    body("username").exists(),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.json({ ok: false, msg: "An error occurred", error: errors.array() })
        }
        if (req.body.username !== req.user.username) {
            const response = await addUsers(req.user.username, req.body.username)
            res.json(response)
        } else {
            res.json({ ok: false, msg: "Can't follow yourself" })
        }

    })

module.exports = router