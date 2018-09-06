const express = require('express')
const router = express.Router()

const { addMessage, loadMessages } = require('./message.operation')

router.post('/addmessage', (req, res) => {
    
    addMessage(req)
        .then(data => {
            res.json({
                ok: true,
                data
            })
        })

        .catch(err => {
            res.status(500).json({
                ok: false,
                error: {
                    message: 'No se puedo enviar el mensaje',
                    err
                }
            })
        })

    })

router.get('/loadmessages', (req, res) => {
    loadMessages()
        .then(conversation => {
            res.json({
                ok: true,
                conversation
            })
        })

        .catch(err => {
            res.status(400).json({
                ok: false,
                error: {
                    messages: 'No se pudieron cargar los mensajes',
                    err
                }
            })
        })
})

module.exports = router