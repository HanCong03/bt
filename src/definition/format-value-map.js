/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var FORMAT_TYPE = require('./format-type');
    var VALUE_TYPE = require('./vtype');
    var map = {};

    map[FORMAT_TYPE.NUMBER] = VALUE_TYPE.NUMBER;

    map[FORMAT_TYPE.CURRENCY] = VALUE_TYPE.CURRENCY;

    map[FORMAT_TYPE.DATE] = VALUE_TYPE.DATETIME;
    map[FORMAT_TYPE.DATETIME] = VALUE_TYPE.DATETIME;

    map[FORMAT_TYPE.TIME] = VALUE_TYPE.TIME;

    map[FORMAT_TYPE.PERCENTAGE] = VALUE_TYPE.PERCENTAGE;

    map[FORMAT_TYPE.FRACTION] = VALUE_TYPE.FRACTION;

    map[FORMAT_TYPE.SCIENTIFIC] = VALUE_TYPE.SCIENTIFIC;

    map[FORMAT_TYPE.TEXT] = VALUE_TYPE.TEXT;
    map[FORMAT_TYPE.LOGICAL] = VALUE_TYPE.LOGICAL;
    map[FORMAT_TYPE.ERROR] = VALUE_TYPE.ERROR;

    module.exports = map;
});