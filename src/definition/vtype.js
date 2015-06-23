/**
 * @file
 * @author hancong03@baiud.com
 */

/*
 NUMBER: 'n',
 NUMBER_STRING: 'ns',
 CURRENCY: 'c',
 ACCOUNTANT: 'a',
 TIME: 't',
 DATETIME: 'dt',
 PERCENTAGE: 'p',
 FRACTION: 'f',
 SCIENTIFIC: 'sc',
 TEXT: 's',
 LOGICAL: 'l',
 ERROR: 'e'
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    module.exports = $$.clone(require('../kernel/src/workbook/definition/vtype'));
});