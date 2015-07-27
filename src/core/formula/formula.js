/**
 * @file 列宽计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var Reader = require('./reader/reader');
    var BFP = require('./bfp/src/runtime');
    var Runtime = require('./runtime/runtime');

    module.exports = $$.createClass('Formula', {
        base: require('module'),

        reader: null,

        init: function () {
            this.__initService();
            this.reader = this.createComponent('Reader');
        },

        __initService: function () {
            this.registerService({
                'check.formula': this.__checkFormula,
                'exec.array.formula': this.__execArrayFormula
            });
        },

        __checkFormula: function (source) {
            return BFP.run(source);
        },

        __execArrayFormula: function (code, start, end) {
            //this.rs('set.array.formula', code, start, end);

            var result = Runtime.exec(this.reader, code);
        }
    });
});