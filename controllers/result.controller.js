const Result = require('../models/result.model.js');
//const security = require ('../config/security.config.js');
const logger = require("../logger/logger");

exports.getLogs = (req, res) => {
    var logs = logger.getLogs();

    res.send(logs);
}

exports.findAllExperimenters = (req, res) => {
    Result.distinct("experimenterName").then(result => {
        if (!result){
            return res.status(404).send({
                message: "no experimenters found" 
            });
        }

        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "no experimenters found"
            });                
        }
        return res.status(500).send({
            message: "Error retrieving experimenters"
        });
    })
}

exports.findByExprimenter = (req, res) => {
    if (!req.params.experimenterName){
        return res.status(400).send({
            message: "empty experimenter name"
        });
    }

    Result.distinct("experimentName", { 'experimenterName': req.params.experimenterName}).then(result => {
        if (!result){
            return res.status(404).send({
                message: "result not found for" + req.params.experimenterName
            });
        }

        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Result not found for experiemnter " + req.params.experimenterName
            });                
        }
        return res.status(500).send({
            message: "Error retrieving results for experimenter " + req.params.experimentNamer
        });
    })
}

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
    logger.logInfo("create", req, "starting create process");
    if (!req.body.data.experimenterName) {
        logger.logError("create", req, "Experimenter name missing");
        return res.status(400).send({
            message: "empty experimenter name"
        });
    }

    if (!req.body.data.experimentName) {
        logger.logError("create", req, "Experiment name missing");
        return res.status(400).send({
            message: "empty experimentName"
        });
    }

    const result = new Result({
        experimenterName: req.body.data.experimenterName,
        experimentName: req.body.data.experimentName,
        subjectId: req.body.data.subjectId ? req.body.data.subjectId : "",
        condition: req.body.data.condition ? req.body.data.condition : "",
        version: req.body.data.version ? req.body.data.version : "", 
        results: req.body.data.results ? req.body.data.results : ""
    });

    result.save().then(data => {
        logger.logSuccess("create", req, "Saved new result");
        res.send(data);
    }).catch(err => {
        logger.logError("create", req, err);
        res.status.send({
            message: err.message || "An unknown error occurred while creating the Result."
        })
    })
}