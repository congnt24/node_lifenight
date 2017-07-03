/**
 * Created by apple on 7/3/17.
 */
var db = require('../db/index')
var utility = require('../utilities/utility')


var repo = {}

var place = {
    PLACE_ID: '',
    EMAIL: '',
    DATE: new Date()

}

repo.create = (placeid, email, done) => {
    //check if in that date, user already click going
    db.get().collection('place').findOne({
        PLACE_ID: placeid,
        EMAIL: email,
        DATE: {$lt: new Date(), $gt: (new Date()).minDate()}
    }, (err, doc) => {
        if (err || doc == null) {
            place.PLACE_ID = placeid
            place.EMAIL = email
            db.get().collection('place').insertOne(place, (err2, doc2) => {
                if (err2) {
                    done(err2)
                    return
                }
                console.log('sadsadasdsad');
                done(err2, doc2)
            })
        } else {
            done(1)
        }
    })

}

module.exports = repo