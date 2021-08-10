const mongoose = require('mongoose');

const ResultSchema = mongoose.Schema({
    experimenterName: String,
    experimentName: String,
    subjectId: String,
    condition: String,
    version: String,
    results: Object,
}, {
    timestamps: true
});

module.exports = mongoose.model('Result', ResultSchema);