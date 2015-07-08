/**
 * @file 定义数值类型。如date等类型也可用认为是数值类型。
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var TYPE = require('./vtype');

    var NUMERIC_TYPE = {};

    // 初始化数值类型
    NUMERIC_TYPE[TYPE.NUMBER] = 1;
    NUMERIC_TYPE[TYPE.NUMBER_STRING] = 1;
    NUMERIC_TYPE[TYPE.CURRENCY] = 1;
    NUMERIC_TYPE[TYPE.ACCOUNTANT] = 1;
    NUMERIC_TYPE[TYPE.TIME] = 1;
    NUMERIC_TYPE[TYPE.DATETIME] = 1;
    NUMERIC_TYPE[TYPE.PERCENTAGE] = 1;
    NUMERIC_TYPE[TYPE.FRACTION] = 1;
    NUMERIC_TYPE[TYPE.SCIENTIFIC] = 1;

    module.exports = NUMERIC_TYPE;
});