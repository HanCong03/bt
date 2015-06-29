/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    module.exports = $$.createClass('RowColumn', {
        base: require('module'),

        shadowBox: null,

        init: function () {
            this.__initService();
        },

        __initService: function () {
            this.registerService({
                'get.up.row': this.getRowForUp,
                'get.down.row': this.getRowForDown,
                'get.left.column': this.getColumnForLeft,
                'get.right.column': this.getColumnForRight
            });
        },

        /**
         * 从给定的行开始，获取向上移动count条可见行后的行索引。
         * @param row
         * @param count
         * @returns {*}
         */
        getRowForUp: function (row, count) {
            while (count-- > 0 && row > 0) {
                row--;

                if (this.queryCommandValue('hiddenrow', row)) {
                    count++;
                    continue;
                }
            }

            return row;
        },

        /**
         * 从给定的行开始，获取向下移动count条可见行后的行索引。
         * @param row
         * @param count
         * @returns {*}
         */
        getRowForDown: function (row, count) {
            while (count-- > 0 && row < MAX_ROW_INDEX) {
                row++;

                if (this.queryCommandValue('hiddenrow', row)) {
                    count++;
                    continue;
                }
            }

            return row;
        },

        /**
         * 从给定的列开始，获取向左移动count条可见列后的列索引。
         * @param col
         * @param count
         * @returns {*}
         */
        getColumnForLeft: function (col, count) {
            while (count-- > 0 && col > 0) {
                col--;

                if (this.queryCommandValue('hiddencolumn', col)) {
                    count++;
                    continue;
                }
            }

            return col;
        },

        /**
         * 从给定的列开始，获取向右移动count条可见列后的列索引。
         * @param col
         * @param count
         * @returns {*}
         */
        getColumnForRight: function (col, count) {
            while (count-- > 0 && col < MAX_COLUMN_INDEX) {
                col++;

                if (this.queryCommandValue('hiddencolumn', col)) {
                    count++;
                    continue;
                }
            }

            return col;
        }
    });
});