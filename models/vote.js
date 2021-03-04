const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
    value: { type: Number, default: 1 },
});

module.exports = {
    voteSchema,
    Vote: mongoose.model('Vote', voteSchema)
};
