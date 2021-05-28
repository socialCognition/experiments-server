const Result = require('../models/result.model.js');

exports.find = (req, res) => {
    if (!req.params.experimentName){
        return res.status(400).send({
            message: "empty experiment name"
        });
    }

    Result.find({ 'experimentName': req.params.experimentName}).then(result => {
        if (!result){
            return res.status(404).send({
                message: "result not found for" + req.params.experimentName
            });
        }

        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Result not found for experiemnt " + req.params.experimentName
            });                
        }
        return res.status(500).send({
            message: "Error retrieving results for experiment " + req.params.experimentName
        });
    })
}

exports.create = (req, res) => {
    fs.appendFileSync("/home/lab/server-logs.txt", "started create function at " + new Date(), () => {})
    if (!req.body.data.results) {
        fs.appendFileSync("/home/lab/server-logs.txt", "got empty results at " + new Date(), () => {})
        return res.status(400).send({
            message: "empty results"
        });
    }

    if (!req.body.data.experimenterName) {
        fs.appendFileSync("/home/lab/server-logs.txt", "got empty experimenter name at " + new Date(), () => {})
        return res.status(400).send({
            message: "empty experimenter name"
        });
    }

    if (!req.body.data.experimentName) {
        fs.appendFileSync("/home/lab/server-logs.txt", "got empty experiment name at " + new Date(), () => {})
        return res.status(400).send({
            message: "empty experimentName"
        });
    }

    const result = new Result({
        experimenterName: req.body.data.experimenterName,
        experimentName: req.body.data.experimentName,
        results: req.body.data.results
    });

    result.save().then(data => {
        fs.appendFile("/home/lab/server-logs.txt", "saved successfully at " + new Date(), () => {})
        res.send(data);
    }).catch(err => {
        fs.appendFile("/home/lab/server-logs.txt", "failed to save " + new Date(), () => {})
        res.status.send({
            message: err.message || "An unknown error occurred while creating the Result."
        })
    })
}