const _ = require('lodash');
const express = require('express');
const bodyparser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Quote } = require('./models/quotes.js');
var { User } = require('./models/user');

var app = express();
app.use(bodyparser.json());
const port = process.env.PORT || 3000;

app.post('/quotes', (req, res) => {
    var quote = new Quote({
        text: req.body.text,
        author: req.body.author,
        submitted: new Date().getTime(),
    });
    quote.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });

});

app.get('/quotes', (req, res) => {
    Quote.find().then((quotes) => {
        res.send({ quotes });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/quotes/getone/:author', (req, res) => {
    var author = req.params.author;



    Quote.findOne({ 'author': { $regex: new RegExp("^" + author.toLowerCase() + "*", "i") } }).then((quote) => {
        if (!quote) {
            return res.status(404).send();
        }
        res.send({ quote });
    }).catch((e) => {
        res.status(400).send();
    });
});



app.get('/quotes/:author', (req, res) => {
    var quotes = [];
    var author = req.params.author;
    var cursor = Quote.find({ 'author': { $regex: new RegExp("^" + author.toLowerCase() + "*", "i") } }).cursor();
    cursor.on('data', function (doc) {
        //   var element = {}
        //   element.text = doc.text,
        //   element.author = doc.author,
        quotes.push(doc);
    });
    cursor.on('close', function () {
        res.send(quotes);

    });
});

app.delete('/quotes/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Quote.findByIdAndRemove(id).then((quote) => {
        if (!quote) {
            return res.status(404).send();
        }

        res.send({ quote });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/quotes/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'author']);
    console.log(body);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (body.text != undefined) {
        Quote.findByIdAndUpdate(id, { $set: body }, { new: true }).then((quote) => {
            if (!quote) {
                return res.status(404).send();
            }

            res.send({ quote });
        }).catch((e) => {
            res.status(400).send();
        });
    } else
        console.log('Try Again');
});



app.listen(port, () => {
    console.log(`Started up at port 3000`,port);
});
