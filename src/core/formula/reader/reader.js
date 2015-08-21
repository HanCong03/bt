/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var OPERAND_TYPE = require('../definition/operand-type');
    var VALUE_TYPE = require('definition/vtype');

    module.exports = $$.createClass('Reader', {
        base: require('component'),

        init: function () {
        },

        getValues: function (start, end) {
            var values = this.queryCommandValue('rangecontentinfo', start, end);
            var result = {};

            for (var key in values) {
                if (!values.hasOwnProperty(key)) {
                    continue;
                }

                result[key] = convert(values[key]);
            }

            return {
                type: VALUE_TYPE.ARRAY,
                start: {
                    row: start.row,
                    col: start.col
                },
                end: {
                    row: end.row,
                    col: end.col
                },
                rowCount: end.row - start.row + 1,
                colCount: end.col - start.col + 1,
                values: result
            };
        },

        getValue: function (row, col) {
            return convert(this.queryCommandValue('contentinfo', row, col));
        },

        getName: function (name) {
            var sheetIndex = this.queryCommandValue('activesheetindex');
            return this.queryCommandValue('validname', name, sheetIndex);
        }
    });

    function convert(operand) {
        if (!operand) {
            return operand;
        }

        switch (operand.type) {
            case VALUE_TYPE.NUMBER:
                return {
                    type: OPERAND_TYPE.NUMBER,
                    value: operand.value
                };

            case VALUE_TYPE.TEXT:
                return {
                    type: OPERAND_TYPE.TEXT,
                    value: operand.value
                };

            case VALUE_TYPE.LOGICAL:
                return {
                    type: OPERAND_TYPE.LOGICAL,
                    value: operand.value
                };

            case VALUE_TYPE.ERROR:
                return {
                    type: OPERAND_TYPE.ERROR,
                    value: operand.value
                };
        }
    }
});