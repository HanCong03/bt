/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var Context = require('./context/context');

    module.exports = require('utils').createClass('Btable', {
        __$ctx: null,

        constructor: function () {
            this.__$ctx = new Context();
        }
    });
});
