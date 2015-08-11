/**
 * @file 列宽计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var Reader = require('./reader/reader');
    var BFP = require('./bfp/src/runtime');
    var ArrayFormulaRuntime = require('./runtime/array/runtime');
    var NormalFormulaRuntime = require('./runtime/normal/runtime');

    module.exports = $$.createClass('Formula', {
        base: require('module'),

        reader: null,

        init: function () {
            this.__initService();
            this.reader = this.createComponent(Reader);
        },

        __initService: function () {
            this.registerService({
                'check.formula': this.__checkFormula,
                'exec.formula': this.__execFormula,
                'exec.array.formula': this.__execArrayFormula
            });
        },

        __checkFormula: function (source) {
            return BFP.run(source);
        },

        __execFormula: function (code, row, col) {
            return NormalFormulaRuntime.exec(this.reader, code, row, col);
        },

        __execArrayFormula: function (code, range) {
            return ArrayFormulaRuntime.exec(this.reader, code, range);
        }
    });
});