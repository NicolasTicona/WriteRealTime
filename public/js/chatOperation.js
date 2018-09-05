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
        })
        // ===============================
        
        
        // Body Message
        var text = ''

        // Listen Message
        socket.on('receiveMessage', (message) =>{
            zoneOnline.append(`<div class="message" style="text-align:left"><p class="friend"> 
                                    <span class="name">${message.name}</span>
                                    <span class="text">${message.text}</span>
                                    <span class="date">${message.date}</span>
                                   </p></div>`)
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
                    // .then( (res) => {
                    //     console.log('Message Send OK');
                    //     console.log(res)
                    // })

                    // .catch( (err) => {
                    //     console.log('Message Send BAD!')
                    //     console.log(err);
                    // })

                socket.emit('sendMessage', {name, text, date: dateNow()})
                zoneOnline.append(`<div class="message" style="text-align:right"><p class="yo"> 
                                    <span class="name">${name}</span>
                                    <span class="text">${text}</span>
                                    <span class="date">${dateNow()}</span>
                                   </p></div>`)



            }
        })

        const dateNow = () => {
            let date = new Date()
            return `${date.getHours()}:${date.getMinutes()}` 
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
        
        // ===============================
        