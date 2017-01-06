const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    choreId: {
        type: Schema.Types.ObjectId,
        ref: 'Chore'
    },
    completed: {}
});

module.exports = mongoose.model('Userchore', schema);
