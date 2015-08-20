/**
 * @file
 * @author hancong03@baiud.com
 */

/*
 NUMBER: 'n',
 TEXT: 's',
 LOGICAL: 'b',
 ERROR: 'e'
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    module.exports = $$.clone(require('../kernel/src/workbook/definition/vtype'));
});