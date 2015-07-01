/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var SCROLLBAR_CONFIG = require('definition/scrollbar');
    var SCROLLBAR_SIZE = SCROLLBAR_CONFIG.size;
    var SCROLLBAR_MARGIN = SCROLLBAR_CONFIG.margin;

    module.exports = {
        __initBar: function () {
            var container = this.getBarContainer();

            var barNode = document.createElement('div');
            barNode.className = 'btb-scrollbar-wrap';

            barNode.innerHTML = this.__getTpl();

            container.appendChild(barNode);
        },

        __getTpl: function () {
            var size = this.getMainContainerSize();
            return getHorizontalTpl(size) + getVerticalTpl(size);
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
        var realSize = SCROLLBAR_SIZE - 2 * SCROLLBAR_MARGIN;

        return $$.tpl(tpl, {
            margin: SCROLLBAR_MARGIN,
            width: mainWidth - SCROLLBAR_SIZE,
            height: realSize,
            btnWidth: realSize,
            btnHeight: realSize,
            slideWidth: mainWidth - SCROLLBAR_SIZE - 2 * realSize,
            slideHeight: realSize,
            sliderWidth: 100,
            sliderHeight: realSize
        });
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
        var realSize = SCROLLBAR_SIZE - 2 * SCROLLBAR_MARGIN;

        return $$.tpl(tpl, {
            margin: SCROLLBAR_MARGIN,
            width: realSize,
            height: mainHeight - SCROLLBAR_SIZE,
            btnWidth: realSize,
            btnHeight: realSize,
            slideWidth: realSize,
            slideHeight: mainHeight - SCROLLBAR_SIZE - 2 * realSize,
            sliderWidth: realSize,
            sliderHeight: 100
        });
    }
});