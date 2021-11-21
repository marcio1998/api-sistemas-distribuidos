//usando as dependencias instaladas
// nodemon, express e Mongoose, pois foi utilizado um banco de dados não-relacional o mongo.
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Client = require('./models/client')

//atribuir o express a variavel app
const app = express()

//conexão com o banco de dados mongo
mongoose.connect('mongodb://localhost:27017/apiRest')
mongoose.Promise - global.Promise


//definindo os dados recebidos para json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//caso ocorra erros
app.use(function (err, req, res, next) {
    res.status(422).send({ error: err.message })
})


app.listen(process.env.port || 4000, function () {
    console.log("Servidor Iniciado")
})




app.get('/clientes', (req, res,) => {
    Client.findOne({ _id: req.query.id }).then(function (client) {
        if(client != []){
            res.send(client)
        }else{
            res.json({
                message: "Cliente não Encontrado"
            })
        }
    }).catch(function () {
        res.json({
            message: "Erro ao Solicitar cliente por ID"
        })
    })
})

app.get('/', (req, res,) => {
    Client.find({}).then(function (clients) {
        res.send(clients)
    }).catch(function () {
        res.json({
            message: "Erro ao Solicitar todos os cadastros de clientes"
        })
    })
})

app.post('/clientes', (req, res,) => {
    cabecalho = JSON.stringify(req.headers)
    console.log(req.headers['content-type'])
    if (req.headers['content-type'] != "application/json") {
        res.json({
            message: "use Json"
        })
        return
    } else {
        Client.create(req.body).then(function (client) {
            res.send(client)
        }).catch(function () {
            res.json({
                messgaege: "Erro Ao Salvar No Banco de Dados. Observe o Formato e os Dados que devem ser enviados"
            })
        })
    }

})


app.put('/clientes', (req, res) => {
    if (req.headers['content-type'] != "application/json") {
        res.json({
            message: "use Json"
        })
        return
    } else {
        Client.findOneAndUpdate({ _id: req.query.id }, {
            name: req.body.name,
            telephone: req.body.telephone,
            email: req.body.email
        }).then(function (client) {
            if(client != []){
            res.json({
                message: "Atualizado Com Sucesso",
                ...req.body
            })}else{
                res.json({
                    message: "Cliente não Encontrado"
                })
            }
        }).catch(function () {
            res.json({
                message: "Erro Ao Atualizar"
            })
        })
    }
})

app.delete('/clientes', (req, res) => {
    Client.findOneAndDelete({ _id: req.query.id }, req.body).then(function (client) {
        if(client != []){
            res.send(client)
        }else{
            res.json({
                message: "Cliente não Encontrado"
            })
        }
    }).catch(function () {
        res.json({
            message: "Erro Ao Deletar"
        })
    })
})

app.get('/clientes/nome/', (req, res,) => {
    Client.find({ name: req.query.name }).then(function (client) {
        if(client != []){
            res.send(client)
        }else{
            res.send({
                message: "Cliente não Encontrado"
            })
        }
    }).catch(function () {
        res.json({
            message: "Erro ao Solicitar cliente por Nome"
        })
    })
})

app.get('/clientes/email/', (req, res,) => {
    Client.find({ email: req.query.email }).then(function (client) {
        if(client != []){
            res.send(client)
        }else{
            res.json({
                message: "Cliente não Encontrado"
            })
        }
    }).catch(function () {
        res.json({
            message: "Erro ao Solicitar cliente por Email"
        })
    })
})
