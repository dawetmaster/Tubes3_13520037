const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    dna: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.models.Disease || mongoose.model('Disease', DiseaseSchema);