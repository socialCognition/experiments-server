'use strict';

const fs = require('fs');
const moment = require('moment');

const path = "/home/lab/logs/server-logs.json";
const writeLog = (log) => {
    var logs = getExistingLogs();

    logs = cleanOldLogs(logs);
    logs.push(log);

    var stringLogs = JSON.stringify(logs)

    fs.writeFileSync(path, stringLogs);
}

const getExistingLogs = ()  => {
    var rawLogs = fs.readFileSync(path);

    return JSON.parse(rawLogs);
}

function cleanOldLogs(logs) {
    var newLogs = [];

    for (var i = 0; i < logs.length; i++){
        if (!shouldDeleteLog(logs[i])){
            newLogs.push(logs[i]);
        }
    }

    return newLogs;
}

function shouldDeleteLog(log) {
    var date = moment(log.date);
    
    return moment().diff(date, 'months') > 1;
}

exports.getExistingLogs = getExistingLogs;
exports.writeLog = writeLog;