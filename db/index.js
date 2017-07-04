/**
 * Created by apple on 7/1/17.
 */

"use strict";
var mongodb = require('mongodb').MongoClient
var config = require('../configs/config')


var state = {
    db: null
}

// exports.connect = (url, done) => {
//     if (state.db) return done()
//     state.db = mongodb.connect(url, (err, db) => {
//         if (err) return done(err)
//         state.db = db
//         done()
//     })
// }
//

exports.get = () => {
    if (state.db) {
        return new Promise((resolve, reject) => {
            resolve(state.db)
        })
    }
    return new Promise((resolve, reject) => {
        mongodb.connect(config.mongo.url, (err, db) => {
            if (err) {
                reject(err)
            } else {
                console.log('DB connection successful');
                state.db = db
                resolve(db)
            }
        })
    })
}

exports.close = done => {
    if (state.db) {
        state.db.close((err, result) => {
            state.db = null
            done(err, result)
        })
    }
}