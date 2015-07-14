/**
 * @file 提供格式刷服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('FormatBrush', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        brush: function (fromRange, toRange) {
            this.__$api.brush(fromRange, toRange);
        }
    });
});