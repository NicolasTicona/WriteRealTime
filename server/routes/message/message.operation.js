const ChatModel = require('../../db/models/chat.model')

const addMessage = (req) => {
    return new Promise((resolve, reject) => {
        
        let data = req.body

        let conversation = {
            user: data.user,
            message: {
                date: data.date,
                body: data.body
            }
        }


        ChatModel.updateOne({enabled: true}, {$push: {conversation}}, (err, message) => {
            if (err) reject(err)
            else resolve(message)
        })

    })
}

const loadMessages = () => {
    return new Promise((resolve, reject) => {
        
        ChatModel.find({}, (err, conversation) => {
            if (err) reject(err)
            else resolve(conversation)
        })

    })
} 

module.exports = {
    addMessage, 
    loadMessages
}