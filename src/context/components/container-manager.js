/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('ContainerManager', {
        __$ctx: null,
        __rootNode: null,
        __size: null,

        shadowContainer: null,
        bottomContainer: null,
        middleContainer: null,
        topContainer: null,

        constructor: function (ctx) {
            this.__$ctx = ctx;
            this.__rootNode = ctx.getRootNode();

            this.__init();
        },

        __init: function () {
            var rect = $$.getRect(this.__rootNode);
            this.__size = {
                width: rect.width,
                height: rect.height
            };

            this.__rootNode.innerHTML = getHTML(rect.width, rect.height);

            this.shadowContainer = $('.btb-shadow', this.__rootNode)[0];
            this.bottomContainer = $('.btb-bottom-layer', this.__rootNode)[0];
            this.middleContainer = $('.btb-middle-layer', this.__rootNode)[0];
            this.topContainer = $('.btb-top-layer', this.__rootNode)[0];
        },

        getShadowContainer: function () {
            return this.shadowContainer;
        },

        getBottoMContainer: function () {
            return this.bottomContainer;
        },

        getMiddleContainer: function () {
            return this.middleContainer;
        },

        getTopContainer: function () {
            return this.topContainer;
        },

        getContainerSize: function () {
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
                '<div class="btb-bottom-layer"></div>' +
                '<div class="btb-middle-layer"></div>' +
                '<div class="btb-top-layer"></div>' +
                '</div>';
    }
});