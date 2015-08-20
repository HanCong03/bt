/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var OPERAND_TYPE = require('../definition/operand-type');
    var ERROR_TYPE = require('definition/error-type');

    module.exports = {
        process: function (formulaBin) {
            var result = [];

            formulaBin = format(formulaBin);

            for (var i = 0, len = formulaBin.length; i < len; i++) {
                result.push(process(result, formulaBin[i]));
            }

            return result;
        }
    };

    function format(formulaBin) {
        var result = [];
        var current;

        for (var i = 0, len = formulaBin.length; i < len; i++) {
            current = formulaBin[i];

            result.push({
                op: current.op,
                args: formatArgs(current.args)
            })
        }

        return result;
    }

    function formatArgs(args) {
        var result = [];
        var current;

        for (var i = 0, len = args.length; i < len; i++) {
            current = args[i];

            if (current.type === 'ref') {
                result[i] = {
                    type: OPERAND_TYPE.CELL,
                    value: {
                        row: current.info.row.index,
                        col: current.info.col.index
                    }
                };
            } else {
                result[i] = current;
            }
        }

        return result;
    }

    function process(stack, code) {
        switch (code.op) {
            case ':':
                return processRange(stack, code.args);
                break;

            case ' ':
                return processIntersection(stack, code.args);
                break;

            case ',':
                return processUnion(stack, code.args);
        }

        return code;
    }

    function processRange(stack, args) {
        var op1 = args[0];
        var op2 = args[1];
        var index;

        if (op1.type === 'addr') {
            index = op1.value;
            op1 = stack[op1.value];
            stack[index] = null;
        }

        if (op2.type === 'addr') {
            index = op2.value;
            op2 = stack[op2.value];
            stack[index] = null;
        }

        if (!checkType(op1) || !checkType(op2)) {
            return {
                type: OPERAND_TYPE.ERROR,
                value: ERROR_TYPE.VALUE
            };
        }

        if (op1.type === OPERAND_TYPE.RANGE) {
            op1 = op1.value.start;
        } else if (op1.type === OPERAND_TYPE.UNION) {
            op1 = getUnionMinCell(op1);
        } else {
            op1 = op1.value;
        }

        if (op2.type === OPERAND_TYPE.RANGE) {
            op2 = op2.value.end;
        } else if (op2.type === OPERAND_TYPE.UNION) {
            op2 = getUnionMaxCell(op2);
        } else {
            op2 = op2.value;
        }

        var minRow = Math.min(op1.row, op2.row);
        var maxRow = Math.max(op1.row, op2.row);
        var minCol = Math.min(op1.col, op2.col);
        var maxCol = Math.max(op1.col, op2.col);

        if (minRow === maxRow && minCol === maxCol) {
            return {
                type: OPERAND_TYPE.CELL,
                value: {
                    row: minRow,
                    col: minCol
                }
            };
        }

        return {
            type: OPERAND_TYPE.RANGE,
            value: {
                start: {
                    row: minRow,
                    col: minCol
                },
                end: {
                    row: maxRow,
                    col: maxCol
                }
            }
        };
    }

    function processIntersection(stack, args) {
        var op1 = args[0];
        var op2 = args[1];
        var index;

        if (op1.type === 'addr') {
            index = op1.value;
            op1 = stack[op1.value];
            stack[index] = null;
        }

        if (op2.type === 'addr') {
            index = op2.value;
            op2 = stack[op2.value];
            stack[index] = null;
        }

        if (!checkType(op1) || !checkType(op2)) {
            return {
                type: OPERAND_TYPE.ERROR,
                value: ERROR_TYPE.VALUE
            };
        }

        if (op1.type === OPERAND_TYPE.UNION || op2.type === OPERAND_TYPE.UNION) {
            return __processIntersection(op1, op2);
        }

        var range1;
        var range2;

        if (op1.type === OPERAND_TYPE.RANGE) {
            range1 = op1.value;
        } else {
            range1 = {
                start: op1.value,
                end: op1.value
            };
        }

        if (op2.type === OPERAND_TYPE.RANGE) {
            range2 = op2.value;
        } else {
            range2 = {
                start: op2.value,
                end: op2.value
            };
        }

        var startRow = Math.max(range1.start.row, range2.start.row);
        var startCol = Math.max(range1.start.col, range2.start.col);
        var endRow = Math.min(range1.end.row, range2.end.row);
        var endCol = Math.min(range1.end.col, range2.end.col);

        if (startRow === endRow && startCol === endCol) {
            return {
                type: OPERAND_TYPE.CELL,
                value: {
                    row: startRow,
                    col: startCol
                }
            };
        }

        if (startRow > endRow || startCol > endCol) {
            return {
                type: OPERAND_TYPE.ERROR,
                value: ERROR_TYPE.NUL
            };
        }

        return {
            type: OPERAND_TYPE.RANGE,
            value: {
                start: {
                    row: startRow,
                    col: startCol
                },
                end: {
                    row: endRow,
                    col: endCol
                }
            }
        };
    }

    /**
     * 处理操作数是并集集合的交集
     * @param op1
     * @param op2
     * @private
     */
    function __processIntersection(op1, op2) {
        if (op1.type === OPERAND_TYPE.CELL) {
            op1 = [{
                start: op1.value,
                end: op1.value
            }];
        } else if (op1.type === OPERAND_TYPE.RANGE) {
            op1 = [op1.value];
        } else {
            op1 = op1.value;
        }

        if (op2.type === OPERAND_TYPE.CELL) {
            op2 = [{
                start: op2.value,
                end: op2.value
            }];
        } else if (op2.type === OPERAND_TYPE.RANGE) {
            op2 = [op2.value];
        } else {
            op2 = op2.value;
        }

        var result = null;
        var current1;
        var current2;

        for (var i = 0, len = op1.length; i< len; i++) {
            current1 = op1[i];

            for (var j = 0, jlen = op2.length; j < jlen; j++) {
                current2 = op2[j];

                if (result) {
                    return {
                        type: OPERAND_TYPE.ERROR,
                        value: ERROR_TYPE.VALUE
                    };
                }

                result = getIntRange(current1, current2);
            }
        }


        if (!result) {
            return {
                type: OPERAND_TYPE.ERROR,
                value: ERROR_TYPE.NUL
            };
        }

        return result;

        function getIntRange(range1, range2) {
            var startRow = Math.max(range1.start.row, range2.start.row);
            var startCol = Math.max(range1.start.col, range2.start.col);
            var endRow = Math.min(range1.end.row, range2.end.row);
            var endCol = Math.min(range1.end.col, range2.end.col);

            if (startRow === endRow && startCol === endCol) {
                return {
                    type: OPERAND_TYPE.CELL,
                    value: {
                        row: startRow,
                        col: startCol
                    }
                };
            }

            if (startRow > endRow || startCol > endCol) {
                return null;
            }

            return {
                type: OPERAND_TYPE.RANGE,
                value: {
                    start: {
                        row: startRow,
                        col: startCol
                    },
                    end: {
                        row: endRow,
                        col: endCol
                    }
                }
            };

        }
    }

    function processUnion(stack, args) {
        var op1 = args[0];
        var op2 = args[1];
        var index;

        if (op1.type === 'addr') {
            index = op1.value;
            op1 = stack[op1.value];
            stack[index] = null;
        }

        if (op2.type === 'addr') {
            index = op2.value;
            op2 = stack[op2.value];
            stack[index] = null;
        }

        if (!checkType(op1) || !checkType(op2)) {
            return {
                type: OPERAND_TYPE.ERROR,
                value: ERROR_TYPE.VALUE
            };
        }

        if (op1.type === OPERAND_TYPE.RANGE) {
            op1 = op1.value;
        } else {
            op1 = {
                start: op1.value,
                end: op1.value
            };
        }

        if (op2.type === OPERAND_TYPE.RANGE) {
            op2 = op2.value;
        } else {
            op2 = {
                start: op2.value,
                end: op2.value
            };
        }

        return {
            type: OPERAND_TYPE.UNION,
            value: [op1, op2]
        };
    }

    function checkType(op) {
        var type = op.type;
        return type === OPERAND_TYPE.CELL || type === OPERAND_TYPE.RANGE || type === OPERAND_TYPE.UNION;
    }

    function getUnionMinCell(operand) {
        var ranges = operand.value;
        var current;

        var minRow = Number.MAX_VALUE;
        var minCol = Number.MAX_VALUE;

        for (var i = 0, len = ranges.length; i < len; i++) {
            current = ranges[i].start;

            minRow = Math.min(minRow, current.row);
            minCol = Math.min(minCol, current.col);
        }

        return {
            row: minRow,
            col: minCol
        };
    }

    function getUnionMaxCell(operand) {
        var ranges = operand.value;
        var current;

        var maxRow = Number.MIN_VALUE;
        var maxCol = Number.MIN_VALUE;

        for (var i = 0, len = ranges.length; i < len; i++) {
            current = ranges[i].end;

            maxRow = Math.max(maxRow, current.row);
            maxCol = Math.max(maxCol, current.col);
        }

        return {
            row: maxRow,
            col: maxCol
        };
    }
});