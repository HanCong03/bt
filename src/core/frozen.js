/**
 * @file 列宽计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Frozen', {
        base: require('module'),

        shadowBox: null,

        frozen: function () {
            var range = this.queryCommandValue('range');
            var visulaData = this.rs('get.visual.data');

            var entry = range.entry;
            var endRow = entry.row - 1;
            var endCol = entry.col - 1;

            if (endRow < visulaData.row || endCol < visulaData.col) {
                debugger;
            }

            this.execCommand('pane', {
                row: visulaData.row,
                col: visulaData.col
            }, {
                row: endRow,
                col: endCol
            });
        },

        frozenFirstRow: function () {
            var visulaData = this.rs('get.visual.data');

            this.execCommand('pane', {
                row: visulaData.row,
                col: -1
            }, {
                row: visulaData.row,
                col: -1
            });
        },

        frozenFirstColumn: function () {
            var visulaData = this.rs('get.visual.data');

            this.execCommand('pane', {
                row: -1,
                col: visulaData.col
            }, {
                row: -1,
                col: visulaData.col
            });
        },

        cancelFrozen: function () {
            this.execCommand('clearpane');
        }
    });
});