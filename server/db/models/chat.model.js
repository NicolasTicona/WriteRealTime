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
    ],
    enabled: {default: true, type: Boolean}
})

const ChatModel = mongoose.model('conversation', chatSchema)

ChatModel.deleteOne({enabled: true}, (err) => {
    if (err) return err
})

ChatModel.create({conversation: [], enabled: true}, (err, conversation) => {
    if (err) return err
})

module.exports = ChatModel