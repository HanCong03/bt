/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var SCROLLBAR_SIZE = require('definition/scrollbar').size;

    module.exports = $$.createClass('ContainerManager', {
        __$ctx: null,
        __rootNode: null,

        __size: null,
        __contentSize: null,

        contentContainer: null,
        shadowContainer: null,
        bottomContainer: null,
        middleContainer: null,
        topContainer: null,
        barContainer: null,

        constructor: function (ctx) {
            this.__$ctx = ctx;
            this.__rootNode = ctx.getRootNode();

            this.__init();
        },

        __init: function () {
            var width = this.__rootNode.clientWidth;
            var height = this.__rootNode.clientHeight;

            this.__size = {
                width: width,
                height: height
            };

            this.__contentSize = {
                width: width - SCROLLBAR_SIZE,
                height: height - SCROLLBAR_SIZE
            };

            this.__rootNode.innerHTML = getHTML(width, height);

            this.contentContainer = $('.btb-content', this.__rootNode)[0];
            this.shadowContainer = $('.btb-shadow', this.__rootNode)[0];
            this.bottomContainer = $('.btb-bottom-layer', this.__rootNode)[0];
            this.middleContainer = $('.btb-middle-layer', this.__rootNode)[0];
            this.topContainer = $('.btb-top-layer', this.__rootNode)[0];
            this.barContainer = $('.btb-bar', this.__rootNode)[0];

            // 初始化内容区大小
            this.contentContainer.style.width = this.__contentSize.width + 'px';
            this.contentContainer.style.height = this.__contentSize.height + 'px';
        },

        getShadowContainer: function () {
            return this.shadowContainer;
        },

        getBottomContainer: function () {
            return this.bottomContainer;
        },

        getMiddleContainer: function () {
            return this.middleContainer;
        },

        getTopContainer: function () {
            return this.topContainer;
        },

        getBarContainer: function () {
            return this.barContainer;
        },

        getContentContainerSize: function () {
            return this.__contentSize;
        },

        getMainContainerSize: function () {
            return this.__size;
        }
    });

    function getHTML(width, height) {
        return $$.tpl(getTpl(), {
            width: width,
            height: height
        })
    }

    function getTpl() {
        return '<div class="btb-main" style="width: ${width}px; height: ${height}px;">' +
                '<div class="btb-shadow"></div>' +
                '<div class="btb-content">' +
                    '<div class="btb-bottom-layer"></div>' +
                    '<div class="btb-middle-layer"></div>' +
                    '<div class="btb-top-layer"></div>' +
                '</div>' +
                '<div class="btb-bar"></div>' +
                '</div>';
    }
});