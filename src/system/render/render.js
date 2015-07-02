/**
 * @file 渲染模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var Screen = require('../screen/screen');

    module.exports = $$.createClass('Render', {
        base: require('module'),

        mixin: [
            require('./components/layout'),
            require('./components/gridline'),
            require('./components/header'),
            require('./components/fill'),
            require('./components/border/border'),
            require('./components/content/content'),
            require('./components/box'),
            require('./components/pane')
        ],

        visualData: null,
        layoutData: null,

        visibleScreen: null,
        invisibleScreen: null,

        init: function () {
            this.__initEvent();
            this.__initScreen();
        },

        __initEvent: function () {
            this.on({
                'viewchange': this.refresh,
                'refresh': this.refresh
            });
        },

        __initScreen: function () {
            var size = this.getContentContainerSize();
            this.gridlineScreen = new Screen(this.getMiddleContainer(), size.width, size.height);
            this.contentScreen = new Screen(this.getMiddleContainer(), size.width, size.height);
            this.borderScreen = new Screen(this.getMiddleContainer(), size.width, size.height);
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
            this.__drawBorder();
            this.__drawContent();
            this.__drawBox();
            this.__drawPaneLine();
        },

        __toggleScreen: function () {
            this.gridlineScreen.toggle();
            this.contentScreen.toggle();
            this.borderScreen.toggle();
        }
    });
});