/**
 * @file 插入行列，单元格
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Writable', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        isWritable: function (start, end) {
            return this.__$api.isWritable(start, end);
        }
    });
});