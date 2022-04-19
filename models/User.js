const { Schema, model } = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// Schema to create User model
const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
        trim: true},

    email: {
        type: String, 
        required: true,
        unique: true,   
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},

    thoughts:[{ 
        type: Schema.Types.ObjectId, 
        ref: 'Thoughts' }],
    
    friends:[{ 
        type: Schema.Types.ObjectId, 
        ref: 'Thoughts' }],

    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
        

  
    });

userSchema
  .virtual('friendCount')
  .get(function () {
      return this.friends.length
  })
 
// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
