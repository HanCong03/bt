/**
 * @file 列宽计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var OPERAND_TYPE = require('../definition/operand-type');

    module.exports = $$.createClass('FormulaWatcher', {
        base: require('module'),

        init: function () {
            this.__initEvent();
        },

        __initEvent: function () {
            this.on({
                'contentchange': this.__onContentChange,
                'formularemoved': this.__onFormularemoved,
                'formulaadded': this.__watchFormula
            });
        },

        __watchFormula: function (row, col) {
            var formulaBin = this.rs('get.parsed.formula', row, col);
            var cells = getCells(formulaBin);

            if (cells.length === 0) {
                return;
            }

            var heap = this.getActiveHeap();
            var key = row + ',' + col;
            heap[key] = [];

            var pool = heap[key];

            for (var i = 0, len = cells.length; i < len; i++) {
                pool.push({
                    type: 'normal',
                    range: cells[i],
                    source: {
                        row: row,
                        col: col
                    }
                });
            }
        },

        __onFormularemoved: function (row, col) {
            var heap = this.getActiveHeap();
            delete heap[row + ',' + col];
        },

        __recalculate: function (type, cell) {
            if (type === 'normal') {
                this.postMessage('recalculate.formula', cell.row, cell.col);
            } else {
                debugger;
            }
        },

        __onContentChange: function (start, end) {
            var heap = this.getActiveHeap();

            var keys = Object.keys(heap);
            var key;

            for (var i = 0, len = keys.length; i < len; i++) {
                key = keys[i];

                this.__check(heap[key], start, end);
            }
        },

        __check: function (pool, start, end) {
            var current;
            var range = {
                start: start,
                end: end
            };

            for (var i = 0, len = pool.length; i < len; i++) {
                current = pool[i];

                if (isIntersection(range, current.range)) {
                    this.__recalculate(current.type, current.source);
                    return;
                }
            }
        }
    });

    function getCells(stack) {
        var current;
        var cells = [];

        for (var i = 0, len = stack.length; i < len; i++) {
            current = stack[i];

            if (!current) {
                continue;
            }

            if (current.op) {
                parseArgs(cells, current.args);
            } else {
                parseNormal(cells, current);
            }
        }

        return cells;
    }

    function parseArgs(cells, args) {
        for (var i = 0, len = args.length; i < len; i++) {
            parseNormal(cells, args[i]);
        }
    }

    function parseNormal(cells, operand) {
        switch (operand.type) {
            case OPERAND_TYPE.CELL:
                cells.push({
                    start: operand.value,
                    end: operand.value
                });
                break;

            case OPERAND_TYPE.RANGE:
                cells.push(operand.value);
                break;

            case OPERAND_TYPE.UNION:
                for (var j = 0, jlen = operand.value.length; j < jlen; j++) {
                    cells.push(operand.value[j]);
                }
                break;

            default:
            // continue
        }
    }

    function isIntersection(range1, range2) {
        var h1 = range1.end.row - range1.start.row;
        var h2 = range2.end.row - range2.start.row;
        var w1 = range1.end.col - range1.start.col;
        var w2 = range2.end.col - range2.start.col;

        var hDiff = Math.abs(range1.end.col + range1.start.col - range2.end.col - range2.start.col);
        var vDiff = Math.abs(range1.end.row + range1.start.row - range2.end.row - range2.start.row);

        return hDiff <= w1 + w2 && vDiff <= h1 + h2;
    }
});