module.exports = (app) => {
    const results = require('../controllers/result.controller.js');

    // create a new result
    app.post('/results', results.create);

    app.get('/results/:experimentName', results.find)
}