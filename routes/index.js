var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

module.exports = function(passport) {

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
	successRedirect: '/profile',
	failureRedirect: '/',
	failureFlash : true 
	}));

	/* Handle Registration POST */
	router.post('/register', passport.authenticate('register', {
	successRedirect: '/login',
	failureRedirect: '/register',
	failureFlash : true 
	}));

	/* Handle Logout */
	router.get('/logout', function(req, res) {
	  req.logout();
	  res.redirect('/');
	});

	router.get('/v1/profile/', isAuthenticated, function(req, res) {
		var User = require('../models/user.js');
	    User.find({username: req.user.username}, function(err, data) {
	      if (err) {throw err;}
	      res.send(data);
	    })
	})

	//CHECK IF USER IS LOGGED IN
	router.get('/checklogin/',function(req,res){
		if (req.user)
			{res.send(true);}
		else
			{res.send(false);}
	});

	/* GET home page. */
	router.get('/', function(req, res, next) {
		res.sendfile('./public/index.html');
	});

	//GET ALL JOBS BY USER
	router.get('/v1/jobs/', isAuthenticated, function(req, res) {
		var Job = require('../models/job.js');
		Job.find({username: req.user.username}, function(err, data) {
			if (err) {throw err;}
			res.send(data);
		})
	})

	//GET ONE JOB BY USER
	router.get('/v1/jobs/details', isAuthenticated, function(req, res) {
		var Job = require('../models/job.js');
		Job.findById(req.query.id, function(err, data) {
			if (err) {throw err;}
			res.send(data);
		})
	})

	//EDIT DUE DATE FOR SPECIFIC JOB
	// router.put('/v1/jobs/updatejob/:id', function(req, res) {
	// 	var Job = require('../models/job.js');
	// 	Job.findById(req.params.id, function(err, data) {
	// 		console.log(req.params.id);
	// 		if (data) {
	// 			data.duedate = req.body.duedate;
	// 			data.status = req.body.status;
	// 			data.contact = req.body.contact;
	// 			data.comments = req.body.comment;
	// 			console.log(data);

	// 			data.save(function(err){
	// 			  if (err) {
	// 			    console.log("Error in saving job");
	// 			    throw err;
	// 			  }
	// 			  console.log("Jobs Saved!");
	// 			  res.sendStatus(200);
	// 		  	})
	// 	  	}	
				
	// 		else {
	// 			console.log("Job Not Found");
	// 			res.sendStatus(500);
	// 		}
	// 	})
	// })

	//EDIT DUE DATE FOR SPECIFIC JOB
	router.put('/v1/jobs/updatejob/:id', function(req, res) {
		var Job = require('../models/job.js');
		Job.findByIdAndUpdate(req.params.id, {$set: {status: req.body.status, duedate: req.body.duedate, contact: req.body.contact, comments: req.body.comment}}, function(err, data) {
			console.log(req.params.id)
			console.log(req.body.status)
			console.log(req.body.duedate)
			console.log(req.body.comment)
			console.log(req.body.contact)
			res.sendStatus(200);
		})
	})
	

	//POST NEW JOB
	router.post('/v1/jobs/', function(req, res) {
		console.log(req.body);
		var Job = require('../models/job.js');
		
		var newJob = new Job();

		newJob.username = req.user.username;
		newJob.jobtitle = req.body.jobtitle;
		newJob.company = req.body.company;
		newJob.location = req.body.location;
		newJob.description = req.body.description;
		newJob.comments = '';
	    newJob.haveapplied = false;
	    newJob.duedate = null;
	    newJob.contact = '';
	    newJob.url = req.body.url;
    	newJob.followupdate = null;
    	newJob.status = 'Interested';
	    console.log(newJob)
		newJob.save(function(err){
		  if (err) {
		    console.log("Error in saving job");
		    throw err;
		  }
		  console.log("Job Updated!");
		  res.sendStatus(200);
		})
	})

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
	        	var regExp = /\<([^>]+)\>/g;
	        	job.description.replace(regExp, "");
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
	        	var regExp = /\<([^>]+)\>/g;
	        	job.description.replace(regExp, "");
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
	        	var regExp = /\<([^>]+)\>/g;
	        	job.description.replace(regExp, "");
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
	        	var regExp = /\<([^>]+)\>/g;
	        	job.description.replace(regExp, "");
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

	return router;
}

