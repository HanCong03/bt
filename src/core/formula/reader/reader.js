/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Reader', {
        base: require('component'),

        init: function () {
        },

        getValues: function (start, end) {
            return this.queryCommandValue('rangecontentinfo', start, end);
        },

        getValue: function (row, col) {
            return this.queryCommandValue('contentinfo', row, col);
        },

        getName: function (name) {
            var sheetIndex = this.queryCommandValue('activesheetindex');
            return this.queryCommandValue('validname', name, sheetIndex);
        }
    });
});