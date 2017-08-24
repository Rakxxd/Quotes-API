var mongoose =  require('mongoose');

var Quote = mongoose.model('Quote',{
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    submitted: {
        type: Number
    }
});

module.exports = {Quote};