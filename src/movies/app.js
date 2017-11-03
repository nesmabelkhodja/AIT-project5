// app.js
const express = require('express');
require('./db');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');

const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/movies', function(req, res) {
	let criteria = {};  
	if (typeof (req.query.director) !== 'undefined'  && (req.query.director).length>0){
	  	criteria = {director: req.query.director};
	  	console.log(criteria); 
	  }

  Movie.find(criteria, function(err, movies, count) {
    if(err) {
      res.send(err); 
    }
    res.render( 'index', {
      movies: movies
    });
  });
});

app.post('/movies', function(req, res) {
		new Movie({
		title: req.body.title,
		director: req.body.director,
		year: req.body.date
	}).save(function(err, movies, count){

	res.redirect('/movies');
	});
});

app.listen(3000);