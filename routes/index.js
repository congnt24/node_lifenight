"use strict";
var express = require('express');
var router = express.Router();
var request = require('request')
var config = require('../configs/config')
var Twitter = require('node-twitter-api')
var User = require('../models/user')
var Place = require('../models/place')


//setup twitter
var twitter = new Twitter({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callback: config.twitter.callbackUrl
});


/* GET home page. */

router.get('/', function (req, res, next) {
    if (req.query.search) {
        req.session.search = req.query.search
        req.session.save()
        request({method: 'GET', url: config.googlePlace.url + req.query.search}, (err, response, body) => {
            if (err) {

            } else {
                var json = JSON.parse(body.toString()).results
                json.forEach((item) => {
                    item.COUNT = 0
                })

                var i = 0
                json.forEach((item) => {
                    //update count
                    Place.count(item.id).then(doc => {
                        console.log('count = ' + doc)
                        item.COUNT = doc
                        i += 1
                        if (i == json.length) {
                            res.render('index', {
                                title: 'LeftNight',
                                search: req.query.search,
                                photoUrl: config.googlePlace.photoUrl,
                                items: json
                            });
                        }
                    })
                })

            }
        })
    } else {
        res.render('index', {title: 'LeftNight', search: req.params.search, items: []});
    }

});

router.get('/redirect', function (req, res, next) {
    res.redirect('/?search=' + req.session.search)
})


var _requestSecret
router.get('/request-token', function (req, res, next) {
    twitter.getRequestToken(function (err, requestToken, requestSecret) {
        if (err)
            res.status(500).send(err)
        else {
            _requestSecret = requestSecret
            res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken)
        }
    });
})


//handle redirect to access token
router.get('/access-token', function (req, res, next) {
    var oauth_verifier = req.query.oauth_verifier
    var requestToken = req.query.oauth_token
    twitter.getAccessToken(requestToken, _requestSecret, oauth_verifier, function (err, accessToken, accessSecret) {
        if (err) {
            res.status(500).send(err)
        }
        else {
            twitter.verifyCredentials(accessToken, accessSecret, function (err, user) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    User.create(user.screen_name, '', user.name, user.name, user.name).then(doc => {
                        req.session.user = doc.EMAIL ? doc.EMAIL : doc.ops[0].EMAIL
                        req.session.accessToken = accessToken
                        req.session.accessSecret = accessSecret
                        req.session.save()
                        res.redirect('/redirect')
                    })
                }
            })
        }
    })
})

router.get('/add-going/:id', function (req, res, next) {
    console.log(req.params.id)
    console.log(req.session.user)
    Place.create(req.params.id, req.session.user).then(doc => {
        res.redirect('/?search='+req.session.search)
    }).catch(err => {
        res.sendStatus(401)
    })
})


router.get('/test', function (req, res, next) {
    Place.count('asd')
})

module.exports = router;
