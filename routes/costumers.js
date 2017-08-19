module.exports = function(app, CostumerModel) {
  // DELETE /costumers
  app.delete('/costumers/:id', (req, res) => {
    //console.log(req.params)
    CostumerModel.findByIdAndRemove(req.params.id, function (err) {
      if (err) res.sendStatus(404)
      res.sendStatus(204).end()
    })
  })
}
