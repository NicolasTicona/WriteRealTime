const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chatSchema = new Schema({
    conversation: [
        {
            user: String,
            message: {
                date: String,
                body: String
            }
        }
    ]
})

const ChatModel = mongoose.model('conversation', chatSchema)

module.exports = ChatModel