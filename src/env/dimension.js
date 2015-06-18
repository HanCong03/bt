/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Dimension', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        getDimension: function () {
            this.__$api.getDimension();
        }
    });
});