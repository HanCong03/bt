/**
 * @file 渲染模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var Screen = require('./screen');

    module.exports = $$.createClass('Screen', {
        base: require('module'),

        mixin: [
            require('./components/layout'),
            require('./components/gridline'),
            require('./components/header'),
            require('./components/fill'),
            require('./components/content')
        ],

        visualData: null,
        layoutData: null,

        visibleScreen: null,
        invisibleScreen: null,

        init: function () {
            this.__initEvent();
        },

        __initEvent: function () {
            this.on({
                'ready': this.__init,
                'refresh': this.refresh
            });
        },

        __init: function () {
            var size = this.getContainerSize();
            this.gridlineScreen = new Screen(this.getMiddleContainer(), size.width, size.height);
            this.contentScreen = new Screen(this.getTopContainer(), size.width, size.height);
        },

        refresh: function () {
            this.__refreshData();
            this.__render();
            this.__toggleScreen();
        },

        __refreshData: function () {
            this.visualData = this.rs('get.visual.data');
            this.layoutData = this.__getLayout();
        },

        __render: function () {
            this.__drawGridLine();
            this.__drawHeader();
            this.__fill();
        },

        __toggleScreen: function () {
            this.gridlineScreen.toggle();
            this.contentScreen.toggle();
        }
    });
});