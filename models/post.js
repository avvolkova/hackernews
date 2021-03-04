const mongoose = require('mongoose');
const { voteSchema } = require('./vote');

const postSchema = mongoose.Schema({
    title: String,
    content: String,
    username: String,
    commentCount: Number,
    votes: [voteSchema],
    createdAt: Date,
    updatedAt: Date
});

postSchema.pre('save', function (next) {
    let now = Date.now();

    this.updatedAt = now;
    // Set a value for createdAt only if it is undefined
    if (typeof this.createdAt === 'undefined') {
        this.createdAt = now;
    }
    // Call the next function in the pre-save chain
    next();
});

const sum = (accumulator, currentValue) => accumulator + currentValue.value;
postSchema.methods.points = function () {
    return this.votes.reduce(sum, 0);
};

postSchema.methods.timeSinceCreation = function () {
    return Math.round((Date.now() - this.createdAt) / 1000 / 60); //60);
};


module.exports = mongoose.model('Post', postSchema);
