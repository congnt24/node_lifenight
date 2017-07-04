/**
 * Created by apple on 6/30/17.
 */
"use strict";
var config = require('../configs/config')
var db = require('../db')
const collection = 'user'

// state == 0: not logged, 1: logged
var user = {
    EMAIL: '',
    PASSWORD: '',
    FIRST_NAME: '',
    LAST_NAME: '',
    DISPLAY_NAME: '',
    STATE: 0,
    CREATE_DATE: new Date(),
    UPDATE_DATE: new Date(),
    LAST_SESSION: new Date(),
    TWITTER_AUTH: false,
    FACEBOOK_AUTH: false,
    GOOGLE_AUTH: false
}

var repository = {}

repository.find = function (email) {
    return db.get().then(db => db.collection(collection).findOne({EMAIL: email}))
}

repository.create = function (email, password, firstName, lastName, displayName, callback) {
    return repository.find(email).then(doc=>{
        if (doc == null) {
            user['EMAIL'] = email
            user['PASSWORD'] = password
            user['FIRST_NAME'] = firstName
            user['LAST_NAME'] = lastName
            user['DISPLAY_NAME'] = displayName
            user['STATE'] = 1
            return db.get().then(db => db.insertOne(user, [{json: true}]))
                .then(doc =>{
                    console.log(doc)
                    return doc
                })
                .catch(err => {console.error(err)})
        }else{
            return new Promise((resolve, reject) => {
                resolve(doc)
            })
        }
    }).catch(err => {
        console.error(err)
        return new Promise((resolve, reject) => {
            reject(err)
        })
    })
}


module.exports = repository

/*user schema
 ID
 NUMBER(18,0)
 DIRECTORY_ID
 NUMBER(18,0)
 Links to CWD_DIRECTORY
 USER_NAME
 VARCHAR(255)
 LOWER_USER_NAME
 VARCHAR(255)
 used for case-insensitive search
 ACTIVE
 NUMBER(9,0)
 CREATED_DATE
 DATE
 UPDATED_DATE
 DATE
 FIRST_NAME
 VARCHAR(255)
 Not used
 LOWER_FIRST_NAME
 VARCHAR(255)
 Not used
 LAST_NAME
 VARCHAR(255)
 Not used
 LOWER_LAST_NAME
 VARCHAR(255)
 Not used
 DISPLAY_NAME
 VARCHAR(255)
 LOWER_DISPLAY_NAME
 VARCHAR(255)
 EMAIL_ADDRESS
 VARCHAR(255)
 LOWER_EMAIL_ADDRESS
 VARCHAR(255)
 CREDENTIAL
 VARCHAR(255)*/
