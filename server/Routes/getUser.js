const router = require('express').Router()
const User = require("../models/User")

router.get("/", async (req, res) => {
    try {
        const users = await User.find({}, "-_id -email -password -followers -following -posts -__v")

        res.json(users)
    } catch (error) {
        res.json([])
    }
})


module.exports = router