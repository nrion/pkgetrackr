function handleCoveredAreasTasks(app, db) {
  app.get('/getCoveredAreas', (request, response) => {
    db.collection('coveredAreas').find().toArray((readErr, areas) => {
      if (readErr) { 
        console.log('error retrieving covered areas ', readErr) 
      }
      response.json(areas)
    })
  })
}

module.exports = handleCoveredAreasTasks;