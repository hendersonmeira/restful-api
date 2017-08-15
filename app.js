const express = require('express')
const app = express()
const moment = require('moment')
const PORT = 3000;

// Middlewares
const requestCurrentTime = function(req, res, next){
  moment.locale('pt-br')
  req.currentTime = moment().format('LLLL')
  next()
}




// Custom middlewares - registering time and hour from your requisition. 
// Custom logger
const myLogger = function(req, res, next){
  console.log(` ${req.currentTime} ==> ${req.method} ${req.url}`)
  next()
}

app.use(requestCurrentTime)
app.use(myLogger)

//Routes
// GET /
app.get('/', (req, res) => {
  console.log('Bateu na rota rais')
  res.send('resposta pela barra')
})

// ALL
app.all('/costumers', function (req, res, next) {
  next()
})

app.get('/helio', (req, res) => {
  res.send('Respondeu pelo Helio')
})

// GET /costumers
app.get('/costumers', (req, res) => {
  const costumers = [
    {
      id: 1,
      nome: "Pessoa 01",
      email: "pessoa1@email.com"
    },
    {
      id: 2,
      name: "Pessoa 02",
      email: "pessoa2@email.com"
    },
    {
      id: 3,
      name: "Pessoa 03",
      email: "pessoa3@email.com"
    }
  ]

  res.send(costumers)
})

// POST /costumers
app.post('/costumers', function(req, res){
  res.send('POST')
})

// PUT /costumers
app.put('/costumers', function (req, res) {
  res.send('PUT')
})

// Delete /costumers
app.delete('/costumers', function(req, res){
  res.send('DELETE')
})

app.listen(PORT, () => {
  //console.log('servidor rodando na porta ' + PORT)
  // ES6 Template String
  console.log(`Rodando nova mensagem ${PORT} => ok...`)
})

