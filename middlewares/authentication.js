/**
 * Created by apple on 6/30/17.
 */

module.exports = function (req, res, next) {
    if (req.session && req.session.user) {
        console.log('middleware auth: '+req.session.user)
        res.locals.isAuthed = true
        res.locals.username = req.session.user
        next()
    }else{
        res.locals.isAuthed = false
        next()
    }
}
