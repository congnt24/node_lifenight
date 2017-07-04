/**
 * Created by apple on 6/29/17.
 */
var twitter = {
    consumerKey: '9d1pMJZ6yxC0J43FTFjTOTLQb',
    consumerSecret: 'vQSBGrTEjLlthorw2DsUORQR752hAJN0sWKOiGMvjPVmMcbv64',
    callbackUrl: 'https://congntlifenight.herokuapp.com/access-token'
}

var googlePlaceKey = 'AIzaSyDZ3Lf6HqFloLrOXrTaY-KmBzYTgBWb5Pk'
var googlePlace = {
    url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?&key='+googlePlaceKey+'&query=restaurants in ',
    photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&key='+googlePlaceKey+'&photoreference='
}

var mongo = {
    url: 'mongodb://test:123456@ds129442.mlab.com:29442/congntdevdb'
}

module.exports = {twitter, googlePlace, mongo}
//photo reference
//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400
// &photoreference=CmRaAAAA7GHiy4aFoVtoJg8cN59fkUMyjX-T37Ug8aAtafttgMLMI4IuLmtzR8xnVpEGH21bYzq7G_AfbuDPsK9yHk2s3EgtBDjKvPQNevj54Pcrr295uttV_QMGhj0U5Oy7CjEXEhB6yyA8HHmGSEJzwx75el0SGhSgxluPvN5RbaIl6IWRTffUn2b9NQ
// &key=AIzaSyBu4nSwHTsmLNX-O8s3zTZjraqHu81IB9g