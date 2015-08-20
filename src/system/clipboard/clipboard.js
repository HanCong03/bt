/**
 * @file 工作表滚动控制模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Clipboard', {
        base: require('module'),

        init: function () {
            this.__initMessage();
        },

        __initMessage: function () {
            this.onMessage({
                'control.scroll': this.__onScroll
            });
        }
    });
});