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
        request({method: 'GET', url: config.googlePlace.url + req.query.search}, (err, response, body) => {
            if (err) {

            } else {
                var json = JSON.parse(body.toString())
                res.render('index', {
                    title: 'LeftNight',
                    search: req.query.search,
                    photoUrl: config.googlePlace.photoUrl,
                    items: json.results
                });
            }
        })
    } else {
        res.render('index', {title: 'LeftNight', search: req.params.search, items: []});
    }

});


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
                    User.find(user.screen_name, function (err, docs) {
                        if (err || docs == null) {
                            //if not have in db, save to db
                            User.create(user.screen_name, '', user.name, user.name, user.name, function (err, docs) {
                                if (err) {
                                    res.status(500).send(err)
                                } else {
                                    //save session
                                    req.session.user = docs.ops[0].EMAIL
                                    req.session.save()
                                    res.redirect('/')
                                }
                            })
                        } else {
                            //login
                            console.log(docs.EMAIL);
                            req.session.user = docs.EMAIL
                            req.session.save()
                            res.redirect('/')
                        }

                        req.session.accessToken = accessToken
                        req.session.accessSecret = accessSecret
                        req.session.save()
                    })
                }
            })
        }
    })
})

router.get('/add-going/:id', function (req, res, next) {
    Place.create(req.params.id, req.session.user, (err, doc) => {
        if (err) {
            res.sendStatus(401)
        } else {
            console.log(doc);
            res.redirect('/')
        }
    })
})

module.exports = router;
