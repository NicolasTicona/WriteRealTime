const express = require('express')
const app = express()
const server = require('http').Server(app)

const io = require('socket.io')(server)

const bodyParser = require('body-parser')


// Statics
app.use(express.static('public'))

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Routes
app.use(require('./routes/message/message.route'))

// Socket
io.on('connection', (client) => {

    console.log('Nueva conexión');
    // Server greet new Conexion
    io.emit('server_hello', {hello: 'hello'})

    client.on('sendMessage', (message) =>{
        client.broadcast.emit('receiveMessage', message)
    })

    client.on('disconnect', () =>{
        console.log('Conexión perdida');
    })
})

// Connect DB
require('./db/connection')

// Listennig
server.listen(process.env.PORT || 3000, () =>{
    console.log('Server running');
})