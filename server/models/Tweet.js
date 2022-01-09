const mongoose = require("mongoose")

const TweetSchema = mongoose.Schema({
    msg: {
        type: String,
        required: true,
        maxlength: 140,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
    },
    createdBy: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: new Date()
    }
})

module.exports = mongoose.model("tweet", TweetSchema)