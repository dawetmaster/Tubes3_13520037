const mongoose = require('mongoose');

const CheckHistorySchema = new mongoose.Schema ({
    date: {
        type: Date,
        required: true,
    },
    patient_name: {
        type: String,
        required: true,
    },
    disease_name: {
        type: String,
        required: true,
        unique: true
    },
    result: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.models.CheckHistory || mongoose.model('CheckHistory', CheckHistorySchema);