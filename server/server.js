const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)


// Statics
app.use(express.static('public'))

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



// Listennig
server.listen(process.env.PORT || 3000, () =>{
    console.log('Server running');
})