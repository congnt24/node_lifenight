/**
 * Created by apple on 7/1/17.
 */

"use strict";
var mongodb = require('mongodb').MongoClient

var state = {
    db: null
}

exports.connect = (url, done) => {
    if(state.db) return done()
    state.db = mongodb.connect(url, (err, db) => {
        if (err) return done(err)
        state.db = db
        done()
    })
}


exports.get = () => {
    return state.db
}

exports.close = done => {
    if (state.db) {
        state.db.close((err, result) => {
            state.db = null
            done(err, result)
        })
    }
}