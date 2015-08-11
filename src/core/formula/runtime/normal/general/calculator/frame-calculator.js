/**
 * @file 框架计算器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var ERROR_TYPE = require('definition/error-type');
    var OPERAND_TYPE = require('../../../../definition/operand-type');

    function calculateArrayByArray(cb, opd1, opd2) {
        var result = {
            type: OPERAND_TYPE.RANGE
        };

        var rowCount1 = opd1.rowCount;
        var rowCount2 = opd2.rowCount;
        var colCount1 = opd1.colCount;
        var colCount2 = opd2.colCount;

        var rowCount;
        var colCount;

        if (colCount1 === 1 || colCount2 === 1) {
            colCount = Math.max(colCount1, colCount2);
        } else {
            colCount = Math.min(colCount1, colCount2);
        }

        if (rowCount1 === 1 || rowCount2 === 1) {
            rowCount = Math.max(rowCount1, rowCount2);
        } else {
            rowCount = Math.min(rowCount1, rowCount2);
        }

        debugger;

    }

    function calculateNormalByArray(cb, opd1, opd2) {

    }

    function calculateArrayByNormal(cb, opd1, opd2) {}

    function calculateNormalByNormal(cb, opd1, opd2) {
        var type1 = opd1.type;
        var type2 = opd2.type;

        if (type1 === OPERAND_TYPE.ROW || type1 === OPERAND_TYPE.COLUMN
            || type2 === OPERAND_TYPE.ROW || type2 === OPERAND_TYPE.COLUMN) {
            return {
                type: OPERAND_TYPE.ERROR,
                value: ERROR_TYPE.NAME
            };
        }

        if (type1 === OPERAND_TYPE.ERROR) {
            return opd1;
        }

        if (type2 === OPERAND_TYPE.ERROR) {
            return opd2;
        }

        if (type1 === OPERAND_TYPE.TEXT || type2 === OPERAND_TYPE.TEXT) {
            return {
                type: OPERAND_TYPE.ERROR,
                value: ERROR_TYPE.VALUE
            };
        }

        return cb(opd1.value, opd2.value);
    }

    module.exports = {
        run: function (cb, opd1, opd2) {
            var isArray1 = opd1.type === OPERAND_TYPE.ARRAY;
            var isArray2 = opd2.type === OPERAND_TYPE.ARRAY;

            if (isArray1 && isArray2) {
                return calculateArrayByArray(cb, opd1, opd2);
            } else if (isArray1) {
                return calculateArrayByNormal(cb, opd1, opd2);
            } else if (isArray2) {
                return calculateNormalByArray(cb, opd1, opd2);
            } else {
                return calculateNormalByNormal(cb, opd1, opd2);
            }
        }
    };
});