'use strict';
const fileService = require("./fileService");
const moment = require('moment');
const {stringify} = require('flatted');

const logError = (action, req, message) => {
    var experimenterName = req.body.data.experimenterName;
    var experimentName = req.body.data.experimentName;
    var participantId = req.body.data.subjectId ? req.body.data.subjectId : "";

    saveLog("Error", experimentName, experimenterName, action, req, participantId, message);
}

const logSuccess = (action, req, message) => {
    var experimenterName = req.body.data.experimenterName;
    var experimentName = req.body.data.experimentName;
    var participantId = req.body.data.subjectId ? req.body.data.subjectId : "";

    saveLog("Success", experimentName, experimenterName, action, req, participantId, message);
}

const logInfo = (action, req, message) =>  {
    var experimenterName = req.body.data.experimenterName;
    var experimentName = req.body.data.experimentName;
    var participantId = req.body.data.subjectId ? req.body.data.subjectId : "";

    saveLog("Info", experimentName, experimenterName, action, req, participantId, message);
}

function saveLog(type, experimentName, experimenterName, action, request, participantId, message)  {
    var log = {
        "type": type,
        "date": moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
        "experimentName": experimentName,
        "experimenterName": experimenterName,
        "action": action,
        "message": message,
        "participantId": participantId,
        "request": stringify(request)
    }

    fileService.writeLog(log);
}

exports.getLogs = () => {
    return fileService.getExistingLogs();
}

exports.logInfo = logInfo;
exports.logError = logError;
exports.logSuccess = logSuccess;