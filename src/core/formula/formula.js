/**
 * @file 列宽计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var BFP = require('./bfp/src/runtime');

    module.exports = $$.createClass('Formula', {
        base: require('module'),

        init: function () {
            this.__initEvent();
            this.__initService();
        },

        __initEvent: function () {
            this.on({
                'contentchange': this.__onContentChange
            });
        },

        __initService: function () {
            this.registerService({
               'check.formula': this.__checkFormula
            });
        },

        __checkFormula: function (source) {
            return !!BFP.run(source);
        },

        __onContentChange: function (start, end) {
            //console.log(arguments)

            
        }


    });
});