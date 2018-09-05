const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/writerealtime', {useNewUrlParser: true})
    .then( () => {
        console.log('Mongo OK');
    })
    .catch( (err) => {
        console.log(err);
    })