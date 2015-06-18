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

        getFullStyle: function (row, col) {
            var styles = this.queryCommandValue('fullstyle', row, col);

            if ($$.isNdef(styles)) {
                return null;
            }

            return standardizeFullStyle(styles);
        }
    });

    function standardizeFullStyle(styles) {
        debugger
    }
});