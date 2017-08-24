var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI);
// mongoose.connect('mongodb://rakesh:rakranjan@ds157233.mlab.com:57233/quotesapp');



module.exports = {mongoose};