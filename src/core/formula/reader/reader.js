/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Reader', {
        base: require('component'),

        init: function () {
        },

        getValues: function (start, end) {
            return this.queryCommandValue('contents', start, end);
        }
    });
});