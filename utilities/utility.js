/**
 * Created by apple on 7/3/17.
 */
//Array
Array.prototype.flatten = function (array) {
    return array.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? toFlatten.flatten : toFlatten);
    }, []);
}
// (function (global) {
//     var Arr = {
//         flatten: function (arr) {
//             return arr.reduce(function (flat, toFlatten) {
//                 return flat.concat(Array.isArray(toFlatten) ? Arr.flatten(toFlatten) : toFlatten);
//             }, []);
//         }
//     }
//
//     global.Arr = Arr
// })(this)

//Date
Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

Date.prototype.minDate = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate())
}