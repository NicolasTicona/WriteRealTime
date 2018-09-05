const express = require('express')
const router = express.Router()

const { addMessage, loadMessages } = require('./message.operation')

router.post('/addmessage', (req, res) => {
    let data = req.body
    console.log(data)
    res.json({
        ok: true,
        data
    })
    
    // addMessage(req)
    //     .then(res => {
    //         res.json({
    //             ok: true,
    //             res
    //         })
    //     })

    //     .catch(err => {
    //         res.status(500).json({
    //             ok: false,
    //             error: {
    //                 message: 'No se puedo enviar el mensaje',
    //                 err
    //             }
    //         })
    //     })
})

router.get('/messages', (req, res) => {
    loadMessages
        .then(res => {
            res.json({
                ok: true,
                res
            })
        })

        .catch(err => {
            res.status(400).json({
                ok: false,
                error: {
                    messages: 'No se pudo cargar los mensajes',
                    err
                }
            })
        })
})

module.exports = router