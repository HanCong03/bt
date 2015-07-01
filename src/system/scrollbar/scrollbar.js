/**
 * @file 滚动条
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Scrollbar', {
        base: require('module'),

        mixin: [
            require('./resource')
        ],

        init: function () {
            this.__initBar();
            this.__initEvent();
        },

        __initEvent: function () {
            this.on({
                'refresh': this.__refresh,
                'viewchange': this.__refresh
            });
        },

        __refresh: function (evt) {

        }
    });
});