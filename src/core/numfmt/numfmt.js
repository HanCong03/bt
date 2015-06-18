/**
 * @file 内容格式化
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var NumfmtCode = require('./numfmt-code/src/numfmt');

    module.exports = $$.createClass('Numfmt', {
        base: require('module'),

        init: function () {
            console.log(NumfmtCode)
        }


    });
});