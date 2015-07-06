/**
 * @file 提供样式存取服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('TypeStyle', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        getTypeHorizontalAlignments: function (row, col) {
            return this.__$api.getHorizontalForType(row, col);
        }
    });
});