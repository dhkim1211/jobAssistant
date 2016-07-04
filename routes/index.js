var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

module.exports = function(passport) {
	/* GET login page. */
	router.get('/', function(req, res) {
	// Display the Login page with any flash message, if any
	res.render('signin', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
	successRedirect: '/index2',
	failureRedirect: '/',
	failureFlash : true 
	}));

	/* GET Registration Page */
	router.get('/register', function(req, res){
	res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/register', passport.authenticate('signup', {
	successRedirect: '/index2',
	failureRedirect: '/signup',
	failureFlash : true 
	}));

	/* Handle Logout */
	router.get('/logout', function(req, res) {
	  req.logout();
	  res.redirect('/');
	});

	/* GET home page. */
	router.get('/', function(req, res, next) {
	res.sendfile('index.html');
	});

	//GET JOBS FROM INDEED
	router.get('/v1/jobsearch/', function(req, res) {
	var jobs = [];
	rp({
	    url: 'http://api.indeed.com/ads/apisearch', //URL to hit
	    qs: {
		    publisher: 3660184810998158,
	    	v: 2,
		    format: 'json',
		    userip: "1.2.3.4",
		    useragent: "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36",
		    q: req.query.keyword,
		    l: req.query.location,
		    co: req.query.country
		},
		headers: {useragent: "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36"},
		method: 'GET'
	}, function(error, response, body){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log(response.statusCode, body);
	        body = JSON.parse(body);
	        for (var i = 0; i < body.results.length; i++) {
	        	var job = {title: '', location: '', createdAt: '', description: '', url: '', company: ''};
	        	job.title = body.results[i].jobtitle;
	        	job.company = body.results[i].company;
	        	job.location = body.results[i].formattedLocation;
	        	job.createdAt = body.results[i].date;
	        	job.description = body.results[i].snippet;
	        	job.url = body.results[i].url;
	        	jobs.push(job);
	        }

	        //res.render('jobs', {results: body});
	        //res.send(jobs);
	    }

	}).then(function() {
		rp({
	    url: 'https://jobs.github.com/positions.json', //URL to hit
	    qs: {
		    description: req.query.keyword,
		    location: req.query.location
		},
		headers: {useragent: "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36"},
		method: 'GET'
	}, function(error, response, body){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log(response.statusCode, body);
	        body = JSON.parse(body);
	        for (var i = 0; i < body.length; i++) {
	        	var job = {title: '', location: '', createdAt: '', description: '', url: '', company: ''};
	        	job.title = body[i].title;
	        	job.company = body[i].company;
	        	job.location = body[i].location;
	        	job.createdAt = body[i].created_at;
	        	job.description = body[i].description;
	        	job.url = body[i].url;
	        	jobs.push(job);
	        }
	        
	        //res.send(jobs);
	        //res.render('jobs', {results:jobs});
	        res.send(jobs);
	    }

	});
	})
	})

	//GET JOBS FROM COMPANY NAME (INDEED)
	router.get('/v1/jobsearchbyco/', function(req, res) {
	var jobs = [];
	rp({
	    url: 'http://api.indeed.com/ads/apisearch', //URL to hit
	    qs: {
		    publisher: 3660184810998158,
	    	v: 2,
		    format: 'json',
		    userip: "1.2.3.4",
		    useragent: "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36",
		    q: req.query.company
		},
		headers: {useragent: "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36"},
		method: 'GET'
	}, function(error, response, body){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log(response.statusCode, body);
	        body = JSON.parse(body);
	        for (var i = 0; i < body.results.length; i++) {
	        	var job = {title: '', location: '', createdAt: '', description: '', url: '', company: ''};
	        	job.title = body.results[i].jobtitle;
	        	job.company = body.results[i].company;
	        	job.location = body.results[i].formattedLocation;
	        	job.createdAt = body.results[i].date;
	        	job.description = body.results[i].snippet;
	        	job.url = body.results[i].url;
	        	jobs.push(job);
	        }

	        //res.render('jobs', {results: body});
	        //res.send(jobs);
	    }

	}).then(function() {
		rp({
	    url: 'https://jobs.github.com/positions.json', //URL to hit
	    qs: {
		    description: req.query.company
		},
		headers: {useragent: "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36"},
		method: 'GET'
	}, function(error, response, body){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log(response.statusCode, body);
	        body = JSON.parse(body);
	        for (var i = 0; i < body.length; i++) {
	        	var job = {title: '', location: '', createdAt: '', description: '', url: '', company: ''};
	        	job.title = body[i].title;
	        	job.company = body[i].company;
	        	job.location = body[i].location;
	        	job.createdAt = body[i].created_at;
	        	job.description = body[i].description;
	        	job.url = body[i].url;
	        	jobs.push(job);
	        }
	        
	        //res.send(jobs);
	        //res.render('jobs', {results:jobs});
	        res.send(jobs);
	    }

	});
	})
	})

	//GET JOB PROGRESS INFO FROM GLASSDOOR
	router.get('/v1/jobprogress/', function(req, res) {
	request({
	    url: 'http://api.glassdoor.com/api/api.htm', //URL to hit
	    qs: {
	    	v: 1,
		    format: 'json',
		    't.p': 74729,
		    't.k': 'hhZU6UhBBX1',
		    userip: "0.0.0.0",
		    useragent: "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36",
		    action: 'jobs-prog',
		    jobTitle: req.query.jobtitle
		},
		headers: {useragent: "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36"},
		method: 'GET'
	}, function(error, response, body){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log(response.statusCode, body);
	        body = JSON.parse(body);
	        //res.render('careers', {results: body});
	        res.send(body);
	    }

	});
	})

	//GET COMPANIES FROM GLASSDOOR
	router.get('/v1/employers/', function(req, res) {
	request({
	    url: 'http://api.glassdoor.com/api/api.htm', //URL to hit
	    qs: {
	    	v: 1,
		    format: 'json',
		    't.p': 74729,
		    't.k': 'hhZU6UhBBX1',
		    userip: "0.0.0.0",
		    useragent: "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36",
		    action: 'employers',
		    q: req.query.keyword,
		    l: req.query.location
		},
		headers: {useragent: "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36"},
		method: 'GET'
	}, function(error, response, body){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log(response.statusCode, body);
	        body = JSON.parse(body);
	        //res.render('employers', {results: body});
	        res.send(body);
	    }

	});
	})

	router.get('/v1/glasssearch/', function(req, res) {
	request({
	    url: 'http://api.glassdoor.com/api/api.htm', //URL to hit
	    qs: {
	    	v: 1,
		    format: 'json',
		    't.p': 74729,
		    't.k': 'hhZU6UhBBX1',
		    userip: "0.0.0.0",
		    useragent: "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36",
		    action: 'jobs-stats',
		    l: 'los angeles',
		    jt: 'developer',
		    radius: 50,
		    returnJobTitles: true,
		    returnEmployers: true,
		    returnCities: true
		},
		headers: {useragent: "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36"},
		method: 'GET'
	}, function(error, response, body){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log(response.statusCode, body);
	        res.send(body);
	    }

	});
	})
}

