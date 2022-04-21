const { Schema, model , Types} = require('mongoose');
const moment = require('moment')

const reactionSchema = new Schema({
    reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    } ,
    reactionBody: {
        type: String,
        required: true,
        max_length: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
},
{
    toJSON: {
        getters: true
    }
}
)    


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true,
        ref: 'user'
    },
    reactions: [reactionSchema]
    
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
});

thoughtSchema
    .virtual('reactionCount')
    .get(function (){
        return this.reactions.length
    });





const Thought = model('thought', thoughtSchema)

module.exports = Thought;