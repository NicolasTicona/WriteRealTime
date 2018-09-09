const ChatModel = require('../../db/models/chat.model')

const addMessage = (req) => {
    return new Promise((resolve, reject) => {
        
        ChatModel.findOne({enabled: true}, {conversation: true})   
            .exec((err, conversation) => {
                if (err) reject(err)
                else {
                    let lengthMessages = conversation.conversation.length + 1

                    if(lengthMessages === 30) {
                        ChatModel.updateOne({enabled: true}, {conversation: []}, (err, conversation) => {
                            if (err) reject(err)
                            else console.log('La DB ha sido borrada', conversation);
                        })
                    }
                }
            })
            
        
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