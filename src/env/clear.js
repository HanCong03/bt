/**
 * @file 提供样式存取服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Clear', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        clearAll: function (start, end) {
            this.__$api.clearAll(start, end);
        }
    });
});