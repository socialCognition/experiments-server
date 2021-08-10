module.exports = (app) => {
    const results = require('../controllers/result.controller.js');

    // create a new result
    app.post('/results', results.create);

    app.get('/results/:experimentName', results.find)

    app.get('/results/experimenters/getExperimenters', results.findAllExperimenters)

    app.get('/results/experimenters/name/:experimenterName', results.findByExprimenter)
}