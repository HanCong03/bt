/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Workbook', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        getActiveSheetIndex: function () {
            return this.__$api.getActiveSheetIndex();
        },

        addSheet: function (sheetName) {
            return this.__$api.addSheet(sheetName);
        },

        getSheetNames: function () {
            return this.__$api.getSheetNames();
        },

        switchSheet: function (index) {
            return this.__$api.switchSheet(index);
        }
    });
});