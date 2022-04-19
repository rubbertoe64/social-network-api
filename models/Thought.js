const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        timestamp: true
    },
    username: {
        type: String,
        required: true,
        ref: 'User'
    },
    reactions: []
    
});

thoughtSchema
    .virtual('reactionCount')
    .get(function (){
        return this.reactions.length
    })