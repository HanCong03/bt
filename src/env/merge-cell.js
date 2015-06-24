/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('MergeCell', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        mergeCell: function (start, end) {
            this.__$api.mergeCell(start, end);
        },

        unmergeCell: function (start, end) {
            this.__$api.unmergeCell(start, end);
        },

        toggleMergeCell: function (start, end) {
            this.__$api.toggleMergeCell(start, end);
        },

        getMergeCells: function (start, end) {
            return this.__$api.getMergeCells(start, end);
        }
    });
});