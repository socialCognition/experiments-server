const mongoose = require('mongoose');

const ResultSchema = mongoose.Schema({
    experimenterName: String,
    experimentName: String,
    results: Object,
}, {
    timestamps: true
});

module.exports = mongoose.model('Result', ResultSchema);