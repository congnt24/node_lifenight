/**
 * Created by apple on 7/3/17.
 */
"use strict";
var db = require('../db/index')
var utility = require('../utilities/utility')

var mongodb = require('mongodb').MongoClient

var repo = {}

repo.count = (placeid) => {
    return db.get().then((db) => db.collection('place').find({PLACE_ID: placeid}).count()).then((doc) => {

        return doc
    }, (err) => {
        console.error(err);
    }).catch((err) => {
        console.error(err)
    })

}

repo.create = (placeid, email) => {
    //check if in that date, user already click going
    return db.get().then((db) => {
        return db.collection('place').findOne({
            PLACE_ID: placeid,
            EMAIL: email,
            DATE: {$lt: new Date(), $gt: (new Date()).minDate()}
        })
    }).then((doc) => {
        if (doc == null) {
            var place = {
                PLACE_ID: placeid,
                EMAIL: email,
                DATE: new Date()

            }
            return db.get().then(db2 => db2.collection('place').insertOne(place))
        } else {
            return new Promise((resolve, reject) => {
                reject(doc)
            })
        }
    }).catch((err) => {
        console.error(err)
    })
}

module.exports = repo