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
            this.__initService();
        },

        __initService: function () {
            this.registerService({
                'set.content.and.type': this.setContent,
                'clear.content': this.clearContent,
                'get.content.type': this.getContentType,
                'set.array.formula': this.setArrayFormula,
                'set.range.content': this.setContentForRange
            });
        },

        setContent: function (value, contentType, row, col) {
            this.__$api.setContent(value, contentType, row, col);
        },

        clearContent: function (start, end) {
            this.__$api.clearContent(start, end);
        },

        getContent: function (row, col) {
            return this.__$api.getContent(row, col);
        },

        getContentInfoByRange: function (start, end) {
            return this.__$api.getContentInfoByRange(start, end);
        },

        getContentType: function (row, col) {
            return this.__$api.getContentType(row, col);
        },

        getContentInfo: function (row, col) {
            return this.__$api.getContentInfo(row, col);
        },

        setArrayFormula: function (formulaText, start, end) {
            this.__$api.setArrayFormula(formulaText, start, end);
        },

        setContentForRange: function (contents, range) {
            this.__$api.setContentForRange(contents, range);
        }
    });
});