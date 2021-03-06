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
    var FormulaPreprocessor = require('./preprocessor/preprocessor');

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
            var firstResult = BFP.run(source);

            if (!firstResult) {
                return null;
            }

            return FormulaPreprocessor.process(firstResult);
        },

        __execFormula: function (codes, row, col) {
            return NormalFormulaRuntime.exec(this.reader, codes, row, col);
        },

        __execArrayFormula: function (codes, range) {
            return ArrayFormulaRuntime.exec(this.reader, codes, range);
        }
    });
});