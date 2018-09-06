var socket = io()


        var formWrite;
        var fieldText;
        var zoneOnline;
        var formName;
        var name;

        const InicializeApp = () => {
            
            formWrite = $('#formWrite')
            fieldText = $('#fieldText')
            zoneOnline = $('#zoneOnline')
                zoneOnline.hide()

            formName = $('#formName')
            name = ''

        }

        InicializeApp()

        // Server Hello
        socket.on('server_hello', (data) => {
            console.log(data)
        })

        // Login
        // ===============================
        formName.on('submit', (e) => {
            e.preventDefault()

            name = $('#fieldName').val()
            zoneOnline.show()

            loadMessagesDB(name)
        })
        // ===============================
        
        
        // Body Message
        var text = ''

        // Listen Message
        socket.on('receiveMessage', (message) =>{
            
            renderMessage(message, 'friend')                                   
        })


        formWrite.on('submit', (e) => {
            e.preventDefault()

            text = fieldText.val()
            fieldText.val('')

            if(text){
                // Emit Message

                let message = {
                    user: name,
                    date: dateNow(),
                    body: text
                }

                addMessageDB(message)


                socket.emit('sendMessage', message)
                renderMessage(message, 'yo')

            }
        })

        const dateNow = () => {
            let date = new Date()
            let hours = date.getHours()
            let minutes
            if(date.getMinutes() < 10){
                minutes = '0'+ date.getMinutes()
            }else{
                minutes = date.getMinutes()
            }

            return `${hours}:${minutes}` 
        }
        
        const renderMessages = (user_name, messages) => {

            let messageRender = {}

            for(let message of messages){

                if(user_name === message.user){
                    messageRender = {
                        user: message.user,
                        body: message.message.body,
                        date: message.message.date
                    }

                    renderMessage(messageRender, 'yo')
                }

                else{
                    messageRender = {
                        user: message.user,
                        body: message.message.body,
                        date: message.message.date
                    }

                    renderMessage(messageRender, 'friend')
                }

            }

        }

        const renderMessage = (message, from) => {
            if(from === 'yo'){
                zoneOnline.append(`<div class="message" style="text-align:right"><p class="${from}"> 
                <span class="name">${message.user}</span>
                <span class="text">${message.body}</span>
                <span class="date">${message.date}</span>
               </p></div>`)
            }else{
                zoneOnline.append(`<div class="message" style="text-align:left"><p class="${from}"> 
                <span class="name">${message.user}</span>
                <span class="text">${message.body}</span>
                <span class="date">${message.date}</span>
               </p></div>`)
            }
        }


        // DB Operations
        // ===============================
        const addMessageDB = (message) => {
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3000/addmessage',
                    dataType: 'json',
                    data: message,
                    success: function(res) {
                        console.log(res)    
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            
        }

        const loadMessagesDB = (user_name) => {

            $.ajax({
                type: 'GET',
                url: 'http://localhost:3000/loadmessages',
                dataType: 'json',
                success: function(data){
                    renderMessages(user_name, data.conversation[0].conversation)
                },
                error: function(err){
                    console.log(err);
                }
            })

        }

        // ===============================
        