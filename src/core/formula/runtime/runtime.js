/**
 * @file 公式运行时系统
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        __onContentChange: function (start, end) {
            //console.log(arguments)

            var rangeType = $$.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    break;

                case 'row':
                    break;

                case 'column':
                    break;

                case 'range':
                    this.__clearRange(start, end);
                    break;
            }

            console.log(rangeType)

        },

        __clearRange: function (start, end) {
            console.log(start, end)
            var cache = this.getActiveHeap().cache;

            var dependent = cache.dependent;
            var cell = cache.cell;

            var rowDeps = dependent.row;
            var columnDeps = dependent.column;
            var rangeDeps = dependent.range;

            var deps;

            // row values clear
            for (var i = start.row, limit = end.row; i <= limit; i++) {
                if (!rowDeps[i]) {
                    continue;
                }

                deps = rowDeps[i];

                for (var j = 0, jlen = deps.length; j < jlen; j++) {
                    this.__clearValues(deps[j].range);
                }
            }

            // column values clear
            for (var i = start.col, limit = end.col; i <= limit; i++) {
                if (!columnDeps[i]) {
                    continue;
                }

                deps = columnDeps[i];

                for (var j = 0, jlen = deps.length; j < jlen; j++) {
                    this.__clearValues(deps[j].range);
                }
            }

            // range values clear
            $$.iterator(start, end, function (row, col) {
                var current;

                for (var i = 0, len = rangeDeps.length; i < len; i++) {
                    current = rangeDeps[i];

                    if (current.start.row <= row && current.end.row >= row
                        && current.start.col <= col && current.end.col >= col) {
                        this.__clearValues(current.range);
                    }
                }
            }, this);


            // cell ref clear
            $$.iterator(start, end, function (row, col) {
                if (cell[row] && cell[row][col]) {
                    delete cell[row][col];
                }
            });
        },

        __clearValues: function (range) {
            var cache = this.getActiveHeap().cache;
            var values = cache.values;

            for (var i = range.start.row, limit = range.end.row; i <= limit; i++) {
                for (var j = range.start.col, jlimit = range.end.col; j <= jlimit; j++) {
                    delete values[i][j];
                }
            }
        }
    };
});