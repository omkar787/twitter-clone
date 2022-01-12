const router = require('express').Router()
// const validator = require("../middlewares/validator")

router.get("/", (req, res) => {
    req.user ? res.json({ ok: true }) : res.json({ ok: false })
})


module.exports = router