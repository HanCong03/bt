/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var VALUE_TYPE = require('definition/vtype');
    var ERROR_TYPE = require('definition/error-type');
    var OPERAND_TYPE = require('../../../../definition/operand-type');

    var LIMIT = require('definition/limit');
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;

    module.exports = {
        exec: function (reader, op, args) {
            var operands = [];
            var operand;

            for (var i = 0, len = args.length; i < len; i++) {
                operand = parseRef(reader, args[i]);

                if (operand.type === OPERAND_TYPE.ERROR) {
                    return operand;
                }

                operands.push(operand);
            }

            return calcute(op, operands);
        }
    };

    function calcute(op, operands) {
        if (op === ':') {
            return calcuteJoin(operands);
        } else {
            return calcuteIntersection(operands);
        }
    }

    function calcuteJoin(operands) {
        var opd1 = operands[0];
        var opd2 = operands[1];
        var type1 = opd1.type;
        var type2 = opd2.type;

        var start;
        var end;

        switch (type1) {
            case OPERAND_TYPE.ROW:
                if (type2 === OPERAND_TYPE.ROW) {
                    return {
                        type: OPERAND_TYPE.RANGE,
                        start: {
                            row: Math.min(opd1.row, opd2.row),
                            col: 0
                        },
                        end: {
                            row: Math.max(opd1.row, opd2.row),
                            col: MAX_COLUMN_INDEX
                        }
                    };
                }

                return {
                    type: OPERAND_TYPE.ERROR,
                    value: VALUE_TYPE.REF
                };

            case OPERAND_TYPE.COLUMN:
                if (type2 === OPERAND_TYPE.COLUMN) {
                    return {
                        type: OPERAND_TYPE.RANGE,
                        start: {
                            row: 0,
                            col: Math.min(opd1.col, opd2.col)
                        },
                        end: {
                            row: MAX_ROW_INDEX,
                            col: Math.max(opd1.col, opd2.col)
                        }
                    };
                }

                return {
                    type: OPERAND_TYPE.ERROR,
                    value: VALUE_TYPE.REF
                };

            case OPERAND_TYPE.RANGE:
                if (type2 === OPERAND_TYPE.RANGE) {
                    return {
                        type: OPERAND_TYPE.RANGE,
                        start: {
                            row: Math.min(opd1.start.row, opd2.start.row),
                            col: Math.min(opd1.start.col, opd2.start.col)
                        },
                        end: {
                            row: Math.max(opd1.end.row, opd2.end.row),
                            col: Math.max(opd1.end.col, opd2.end.col)
                        }
                    };
                } else if (type2 === OPERAND_TYPE.CELL) {
                    return {
                        type: OPERAND_TYPE.RANGE,
                        start: {
                            row: Math.min(opd1.start.row, opd2.row),
                            col: Math.min(opd1.start.col, opd2.col)
                        },
                        end: {
                            row: Math.max(opd1.end.row, opd2.row),
                            col: Math.max(opd1.end.col, opd2.col)
                        }
                    };
                }

                return {
                    type: OPERAND_TYPE.ERROR,
                    value: VALUE_TYPE.REF
                };

            case OPERAND_TYPE.CELL:
                if (type2 === OPERAND_TYPE.RANGE) {
                    return {
                        type: OPERAND_TYPE.RANGE,
                        start: {
                            row: Math.min(opd1.row, opd2.start.row),
                            col: Math.min(opd1.col, opd2.start.col)
                        },
                        end: {
                            row: Math.max(opd1.row, opd2.end.row),
                            col: Math.max(opd1.col, opd2.end.col)
                        }
                    };
                } else if (type2 === OPERAND_TYPE.CELL) {

                    start = {
                        row: Math.min(opd1.row, opd2.row),
                        col: Math.min(opd1.col, opd2.col)
                    };

                    end = {
                        row: Math.max(opd1.row, opd2.row),
                        col: Math.max(opd1.col, opd2.col)
                    };

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

                return {
                    type: OPERAND_TYPE.ERROR,
                    value: VALUE_TYPE.REF
                };
                break;
        }
    }

    function parseRef(reader, operand) {
        var type = operand.type;
        var nameInfo;
        var start;
        var end;

        if (type === OPERAND_TYPE.RANGE || type === OPERAND_TYPE.CELL) {
            return operand;
        } else if (type === OPERAND_TYPE.MIXED) {
            nameInfo = reader.getName(operand.value);

            if (nameInfo) {
                start = nameInfo.start;
                end = nameInfo.end;

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

            if (operand.row) {
                return {
                    type: OPERAND_TYPE.ROW,
                    row: operand.index
                };
            } else {
                return {
                    type: OPERAND_TYPE.COLUMN,
                    col: operand.index
                };
            }
        } else if (type === OPERAND_TYPE.NAME) {
            nameInfo = reader.getName(operand.value);

            if (nameInfo) {
                start = nameInfo.start;
                end = nameInfo.end;

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

            return {
                type: OPERAND_TYPE.ERROR,
                value: VALUE_TYPE.NAME
            };
        } else if (type === OPERAND_TYPE.ROW) {
            return {
                type: OPERAND_TYPE.ROW,
                row: operand.row
            };
        }

        // 其他类型，都返回ref错误
        return {
            type: OPERAND_TYPE.ERROR,
            value: ERROR_TYPE.REF
        };
    }


    // 把值类型翻译成操作数类型
    function translateType(target) {
        switch (target.type) {
            case VALUE_TYPE.NUMBER:
                return {
                    type: OPERAND_TYPE.NUMBER,
                    value: +target.value
                };

            case VALUE_TYPE.TEXT:
                return {
                    type: OPERAND_TYPE.TEXT,
                    value: target.value
                };

            case VALUE_TYPE.LOGICAL:
                return {
                    type: OPERAND_TYPE.LOGICAL,
                    value: +target.value
                };

            case VALUE_TYPE.ERROR:
                return {
                    type: OPERAND_TYPE.ERROR,
                    value: target.value
                };
        }
    }
});