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


// For posting a tweet
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

function sortTweet(tweets) {
    // console.log(tweets.length);
    for (let i = 0; i < tweets.length; i++) {
        // int ele = arr[i];
        for (let j = i + 1; j < tweets.length; j++) {
            if (tweets[i].createdAt < tweets[j].createdAt) {
                let temp = tweets[i];
                tweets[i] = tweets[j];
                tweets[j] = temp;
            }
        }
    }
    console.log(tweets.length);
    return tweets
}

function getAllTweets(user) {
    const promise = new Promise((resolve, reject) => {
        const tweets = []
        let count = 0
        user.following
            .forEach((id, index, array) => {
                User.findById(id)
                    .then(us => {
                        if (us.posts.length > 0) {
                            count += us.posts.length
                            // console.log(count);
                            us
                                .posts
                                .forEach((post, index2, array2) => {
                                    tweet
                                        .findById(post, "-_id -createdBy")
                                        .then(individualTweet => {
                                            tweets.push(individualTweet)
                                            // console.log(tweets.length);
                                            // if (index === (array.length - 1) && index2 === (array2.length - 1)) {
                                            if (tweets.length === count) {
                                                // resolve(tweets)
                                                resolve(sortTweet(tweets))
                                                // console.log(tweets);
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            resolve([])
                                        })


                                })

                        }
                    }).catch(err => {
                        console.log(err);
                        resolve([])
                    })


                // console.log(count);
                // if (count > 2) {
                //     console.log(typeof tweets, index, array.length);
                //     // resolve(tweets)
                //     // sortTweet(tweets)
                //     console.log(tweets);
                // }
            })

    })

    return promise
}

router.get("/get-all", async (req, res) => {
    const user = req.user
    if (user) {

        getAllTweets(user)
            .then(data => {
                // console.log(data);
                res.json({ ok: true, data })
            })

    } else {
        res.json({ ok: false, msg: "User not found" })
    }

})

module.exports = router