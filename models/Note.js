const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Please add a title'],
        unique: true,
        maxlength: [40, 'Title cannot be more than 40 characters']
    },
    description: {
        type: String,
        required: true,
        maxlength: [200, 'Descriptoin cannot be more than 200 characters']
    }
})

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema);
