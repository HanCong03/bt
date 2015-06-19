/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Content', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        setContent: function (value, contentType, row, col) {
            this.__$api.setContent(value, contentType, row, col);
        },

        getContent: function (row, col) {
            return this.__$api.getContent(row, col);
        },

        getContentType: function (row, col) {
            return this.__$api.getContentType(row, col);
        },

        getContentInfo: function (row, col) {
            return this.__$api.getContentInfo(row, col);
        }
    });
});