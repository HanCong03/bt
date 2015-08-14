/**
 * @file 外部输入控制器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('OuterInput', {
        __$ctx: null,
        __zoomLevel: Math.ceil(window.devicePixelRatio),
        __offset: 0.5,

        constructor: function (ctx) {
            this.__$ctx = ctx;

            this.__init();
        },

        __init: function () {
            this.__initDOMEvent();
        },

        __initDOMEvent: function () {
            var _self = this;

            $(window).on('resize', function () {
                _self.__update();
            });
        },

        getDeviceZoom: function () {
            return this.__zoomLevel;
        },

        __update: function () {
            var zoom = Math.ceil(window.devicePixelRatio);

            if (zoom != this.__zoomLevel) {
                this.__zoomLevel = zoom;
                this.__$ctx.emitAll('devicezoomchange');
                // 通过datachange事件触发刷新
                this.__$ctx.emitAll('datachange');
            }
        }
    });
});