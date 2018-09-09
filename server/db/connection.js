require('../config/config')

const mongoose = require('mongoose')

mongoose.connect(process.env.urlDB, {useNewUrlParser: true})
    .then( () => {
        console.log('Mongo OK');
    })
    .catch( (err) => {
        console.log(err);
    })