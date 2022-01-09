const router = require("express").Router()
const { body, validationResult } = require("express-validator")
const tweet = require("../models/Tweet")
const User = require("../models/User")


const addPost = (txt, objId) => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const post = await tweet.create({
                msg: txt,
                createdBy: objId
            })
            if (post) {
                resolve({ ok: true, data: post })
            } else {
                reject({ ok: false, msg: "An error occured" })
            }
        } catch (err) {
            console.log(err);
            reject({ ok: false, msg: "An error occured", error: err })
        }
    })

    return promise
}

const addPostToUser = (userId, postId) => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(userId)
            user.posts.push(postId)
            await user.save()
            resolve({ ok: true, msg: "Post Successfully created" })
        } catch (err) {
            console.log(err);
            reject({ ok: false, error: err })
        }

    })

    return promise
}
router.get("/", (req, res) => {
    res.sendStatus(404)
})

router.post("/add",
    body("msg").trim().isLength({ max: 140 }),
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.json({ ok: false, msg: "An error occured", errors: errors.array() })
            }
            const txt = req.body["msg"]
            const objId = req.user._id.toString()
            const post = await addPost(txt, objId)

            console.log(post);

            if (post.ok) {
                const done = await addPostToUser(objId, post.data._id)
                const obj = { msg: post.data.msg, likes: post.data.likes }
                res.json({ ...done, data: obj })
            } else {
                res.json(post)
            }

        } catch (err) {
            console.log(err);
            res.json({ ok: false, msg: "An error occured", error: err })
        }
    })

module.exports = router