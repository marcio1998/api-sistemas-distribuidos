const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Criação do schema de campos que vão ser salvos no banco de dados.
const ClientSchema = new Schema({
    name:{
        type:String,
    },
    telephone:{
        type: String,
    },
    email:{
        type:String,
    }
})

const Client = mongoose.model('client', ClientSchema)

module.exports = Client;