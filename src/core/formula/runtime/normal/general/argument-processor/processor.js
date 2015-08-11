/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var CODE_TYPE = require('definition/code-type');
    var ERROR_TYPE = require('definition/error-type');

    var OPERAND_TYPE = require('../../../../definition/operand-type');

    function format(reader, arg) {
        switch (arg.type) {
            case CODE_TYPE.REF:
                return __formatRef(arg);

            case CODE_TYPE.MIXED:
                return __formatMixed(reader, arg);

            case CODE_TYPE.NAME:
                return __formatName(reader, arg);

            case CODE_TYPE.NUMBER:
                return __formatNumber(arg);

            case CODE_TYPE.ERROR:
                return __formatError(arg);

            case CODE_TYPE.LOGICAL:
                return __formatLogical(arg);

            case CODE_TYPE.TEXT:
                return __formatText(arg);

            case CODE_TYPE.ROW:
                return __formatRow(arg);
        }
    }

    function __formatRef(arg) {
        arg = arg.info;

        if (!arg) {
            return {
                type: OPERAND_TYPE.ERROR,
                value: ERROR_TYPE.NAME
            };
        }

        if (!arg.col) {
            return {
                type: OPERAND_TYPE.ROW,
                index: arg.row.index
            };
        } else if (!arg.row) {
            return {
                type: OPERAND_TYPE.COLUMN,
                index: arg.col.index
            };
        }

        var row = arg.row.index;
        var col = arg.col.index;

        return {
            type: OPERAND_TYPE.CELL,
            row: row,
            col: col
        };
    }

    function __formatMixed(reader, arg) {
        var nameInfo = reader.getName(arg);
        var start;
        var end;

        if (nameInfo) {
            start = nameInfo.ref.start;
            end = nameInfo.ref.end;

            if (start.row === end.row && start.col === end.col) {
                return {
                    type: OPERAND_TYPE.CELL,
                    row: start.row,
                    col: start.col
                };
            }

            return {
                type: OPERAND_TYPE.RANGE,
                start: start,
                end: end
            };
        }

        arg = arg.info;

        if (!arg.col) {
            return {
                type: OPERAND_TYPE.ROW,
                index: arg.row.index
            };
        }

        return {
            type: OPERAND_TYPE.COLUMN,
            index: arg.col.index
        };
    }

    function __formatName(reader, arg) {
        var nameInfo = reader.getName(arg);
        var start;
        var end;

        if (nameInfo) {
            start = nameInfo.ref.start;
            end = nameInfo.ref.end;

            if (start.row === end.row && start.col === end.col) {
                return {
                    type: OPERAND_TYPE.CELL,
                    row: start.row,
                    col: start.col
                };
            }

            return {
                type: OPERAND_TYPE.RANGE,
                start: start,
                end: end
            };
        }

        if (!nameInfo) {
            return {
                type: OPERAND_TYPE.ERROR,
                value: ERROR_TYPE.NAME
            };
        }
    }

    function __formatNumber(arg) {
        return {
            type: OPERAND_TYPE.NUMBER,
            value: +arg.value
        };
    }

    function __formatError(arg) {
        return {
            type: OPERAND_TYPE.ERROR,
            value: arg.value
        };
    }

    function __formatLogical(arg) {
        return {
            type: OPERAND_TYPE.LOGICAL,
            value: arg.value
        };
    }

    function __formatText(arg) {
        return {
            type: OPERAND_TYPE.TEXT,
            value: arg.value
        };
    }

    function __formatRow(arg) {
        return {
            type: OPERAND_TYPE.ROW,
            row: arg.row
        };
    }

    module.exports = {
        format: format
    };
});