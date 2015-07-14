/**
 * @file 提供批注存取服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Comment', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        setComment: function (content, row, col) {
            this.__$api.setComment(content, row, col);
        },

        clearComment: function (start, end) {
            this.__$api.clearComment(start, end);
        },

        getComment: function (row, col) {
            return this.__$api.getComment(row, col);
        }
    });
});