/**
 * @file 样式组件
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Style', {
        base: require('module'),

        shadowBox: null,

        init: function () {
            this.__initService();
        },

        __initService: function () {
            this.registerService({
                'get.full.style': this.getFullStyle
            });
        },

        getStyle: function (styleName, row, col) {
            var styleValue = this.queryCommandValue(styleName, row, col);

            console.log(styleValue)
        },

        getFullStyle: function (row, col) {
            return this.queryCommandValue('fullstyle', row, col);
        }
    });
});