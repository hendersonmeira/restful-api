const PORT = 3000
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const model = mongoose.model
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const currentTime = require('./middlewares/current-time.js')
const myLogger = require('./middlewares/my-logger.js')
const productsSchema = require('./schemas/products.js')
const customerSchema = require('./schemas/costumers.js')

// Mongoose Connection
mongoose.connect('mongodb://localhost/local', { useMongoClient: true })


// Customer Model **** Observation **** Registering the model to use Mongoose. To manipulate Mongo. 
const CostumerModel = mongoose.model('costumers', customerSchema)

// Products Model *** Observation *** Registering the model to use Mongoose. To manipulate Mongo. 
const ProductsModel = mongoose.model('products', productsSchema)
//console.log(CustomerModel)

// Register Middlewares to both applications
app.use(currentTime)
app.use(myLogger)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

// Routes for all
// GET /
app.get('/', (req, res) => {
  const apiInfo = {
    name: 'RESTful API - Products Schema Lesson',
    version: '1.0.0'
  }
  res.send(apiInfo)
})

// ALL /costumers
app.all('/costumers', function (req, res, next) {
  console.log(`${req.method} /costumers`)
  next()
})

// GET /products
app.get('/products', (req, res) => {
  ProductsModel.find({}, function(err, products) {
    if (err) res.sendStatus(404)
      res.status(200).send(products)
  })
})



// GET /costumers
app.get('/costumers', (req, res) => {
  CostumerModel.find({}, function(err, costumers) {
    if (err) res.sendStatus(404)
    res.status(200).send(costumers)
  })
})

// GET /costumers/1
app.get('/costumers/:id', (req, res) => {
 console.log(req.params)
  // Fazendo uma rota para pegar o dado pelo id
  CostumerModel.findById(req.params.id, function(err, costumer) {
if (err) res.sendStatus(404)
  res.status(200).send(costumer)
  }) 
})

// GET /products
app.get('/products:id', (req, res) => {
  ProductsModel.findById(req.params.id, function(err, products) {
    if (err) res.sendStatus(404)
      res.status(200).send(products)
  })
})

// Post /costumers
app.post('/costumers', (req, res) => {
  //console.log(req.body)
  CostumerModel.create(req.body, function(err, costumer) {
    if (err) res.sendStatus(412)
    res.status(201).send(costumer)
  })
})


// POST /products
app.post('/products', (req, res) => {
  ProductsModel.create(req.body, function(err, products) {
    if (err) res.sendStatus(412)
      res.status(201).send(products)
  })
})

// PUT /costumers
app.put('/costumers/:id', (req, res) => {
  //console.log(req.params)
  CostumerModel.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if (err) res.sendStatus(404)
    res.sendStatus(204)
  })
})


// PUT /products/1
app.put('/products/:id', (req, res) => {
  ProductsModel.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if (err) res.sendStatus(404)
    res.sendStatus(204)
  })
})


// DELETE /costumers
app.delete('/costumers/:id', (req, res) => {
  //console.log(req.params)
  CostumerModel.findByIdAndRemove(req.params.id, function(err) {
    if (err) res.sendStatus(404)
    res.sendStatus(204).end()
  })
})


// DELETE /products/1
app.delete('/products/:id', (req, res) => {
ProductsModel.findByIdAndRemove(req.params.id, function(err) {
  if (err) res.sendStatus(404)
    res.sendStatus(204).end()
  })
})



app.listen(PORT, () => {
  // console.log('Servidor rodando na porta ' + PORT + '...')
  // ES6 Template String:
  console.log(`Servidor rodando na porta ${PORT}...`)
})
