const moment = require('moment')


// Middlewares
// Custom CurrentTime
const requestCurrentTime = function (req, res, next) {
  moment.locale('pt-br')
  req.currentTime = moment().format('lll')
  next()
}


module.exports = requestCurrentTime
