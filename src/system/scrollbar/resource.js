/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var SCROLLBAR_CONFIG = require('definition/scrollbar');
    var SCROLLBAR_SIZE = SCROLLBAR_CONFIG.size;
    var SCROLLBAR_MARGIN = SCROLLBAR_CONFIG.margin;
    // 滑块大小
    var REAL_SIZE = SCROLLBAR_SIZE - 2 * SCROLLBAR_MARGIN;

    module.exports = {
        __hSlider: null,
        __vSlider: null,

        // 垂直滑道总高度
        __vHeight: 0,
        // 水平滑道总宽度
        __hWidth: 0,

        __initBar: function () {
            var container = this.getBarContainer();

            var barNode = document.createElement('div');
            barNode.className = 'btb-scrollbar-wrap';

            barNode.innerHTML = this.__getTpl();

            this.__findNodes(barNode);

            container.appendChild(barNode);
        },

        __findNodes: function (rootNode) {
            this.__hSlider = $('.btb-scrollbar-hslider', rootNode)[0];
            this.__vSlider = $('.btb-scrollbar-vslider', rootNode)[0];
        },

        __getTpl: function () {
            var size = this.getMainContainerSize();
            var hInfo = getHorizontalTpl(size);
            var vInfo = getVerticalTpl(size);

            this.__hWidth = hInfo.width;
            this.__vHeight = vInfo.height;

            return hInfo.html + vInfo.html;
        }
    };

    function getHorizontalTpl(size) {
        var tpl = '<div class="btb-scrollbar-h" style="margin: ${margin}px 0; width: ${width}px; height: ${height}px;">' +
            '<div class="btb-scrollbar-lbtn btb-scrollbar-btn" data-type="left" style="left: 0; width: ${btnWidth}px; height: ${btnHeight}px;">' +
                '<div class="btb-scrollbar-licon btb-scrollbar-icon"></div>' +
            '</div>' +
            '<div class="btb-scrollbar-hslide btb-scrollbar-slide" style="left: ${btnWidth}px; width: ${slideWidth}px; height: ${slideHeight}px">' +
                '<div class="btb-scrollbar-hslider btb-scrollbar-slider" style="width: ${sliderWidth}px; height: ${sliderHeight}px;"></div>' +
            '</div>' +
            '<div class="btb-scrollbar-rbtn btb-scrollbar-btn" data-type="right" style="right: 0; width: ${btnWidth}px; height: ${btnHeight}px;">' +
                '<div class="btb-scrollbar-ricon btb-scrollbar-icon"></div>' +
            '</div>' +
            '</div>';

        var mainWidth = size.width;

        var slideWidth = mainWidth - SCROLLBAR_SIZE - 2 * REAL_SIZE;
        var html = $$.tpl(tpl, {
            margin: SCROLLBAR_MARGIN,
            width: mainWidth - SCROLLBAR_SIZE,
            height: REAL_SIZE,
            btnWidth: REAL_SIZE,
            btnHeight: REAL_SIZE,
            slideWidth: slideWidth,
            slideHeight: REAL_SIZE,
            sliderWidth: REAL_SIZE,
            sliderHeight: REAL_SIZE
        });

        return {
            width: slideWidth,
            html: html
        };
    }

    function getVerticalTpl(size) {
        var tpl = '<div class="btb-scrollbar-v" style="margin: 0 ${margin}px; width: ${width}px; height: ${height}px;">' +
            '<div class="btb-scrollbar-tbtn btb-scrollbar-btn" data-type="top" style="top: 0; width: ${btnWidth}px; height: ${btnHeight}px;">' +
            '<div class="btb-scrollbar-ticon btb-scrollbar-icon"></div>' +
            '</div>' +
            '<div class="btb-scrollbar-vslide btb-scrollbar-slide" style="top: ${btnHeight}px; width: ${slideWidth}px; height: ${slideHeight}px">' +
            '<div class="btb-scrollbar-vslider btb-scrollbar-slider" style="width: ${sliderWidth}px; height: ${sliderHeight}px;"></div>' +
            '</div>' +
            '<div class="btb-scrollbar-bbtn btb-scrollbar-btn" data-type="bottom" style="bottom: 0; width: ${btnWidth}px; height: ${btnHeight}px;">' +
            '<div class="btb-scrollbar-bicon btb-scrollbar-icon"></div>' +
            '</div>' +
            '</div>';

        var mainHeight = size.height;

        var slideHeight = mainHeight - SCROLLBAR_SIZE - 2 * REAL_SIZE;
        var html = $$.tpl(tpl, {
            margin: SCROLLBAR_MARGIN,
            width: REAL_SIZE,
            height: mainHeight - SCROLLBAR_SIZE,
            btnWidth: REAL_SIZE,
            btnHeight: REAL_SIZE,
            slideWidth: REAL_SIZE,
            slideHeight: slideHeight,
            sliderWidth: REAL_SIZE,
            sliderHeight: REAL_SIZE
        });

        return {
            height: slideHeight,
            html: html
        };
    }
});