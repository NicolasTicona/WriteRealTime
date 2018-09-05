const ChatModel = require('../../db/models/chat.model')

const addMessage = (req) => {
    return new Promise((resolve, reject) => {
        resolve(req.body)
    })
}

const loadMessages = () => {
    return new Promise((resolve, reject) => {
        resolve('ok')
    })
} 

module.exports = {
    addMessage, 
    loadMessages
}