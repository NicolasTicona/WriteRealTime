// PORT

process.env.PORT = process.env.PORT || 3000


// ENVIRONMENT

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// Connet DataBase

let urlDB

if( process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/writerealtime'
}else{
    urlDB = process.env.MONGO_URI
}

process.env.urlDB = urlDB