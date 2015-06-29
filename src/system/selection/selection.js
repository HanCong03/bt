/**
 * @file 选区模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var FACE_THEME = require('definition/face-theme');
    var SystemUtils = require('system/utils/utils');

    module.exports = $$.createClass('Selection', {
        base: require('module'),

        selectionWrap: null,
        selectionNode: null,
        selectionCover: null,

        init: function () {
            this.__initEvent();
            this.__initSelection();
        },

        __initSelection: function () {
            var selectionWrap = document.createElement('div');
            selectionWrap.className = 'btb-selection-wrap';

            selectionWrap.innerHTML = '<div class="btb-selection" style="border-color: ' + FACE_THEME.color + '"><div class="btb-selection-cover"></div></div>'

            this.selectionCover = $(".btb-selection-cover", selectionWrap)[0];
            this.selectionNode = $(".btb-selection", selectionWrap)[0];

            this.getMiddleContainer().appendChild(selectionWrap);

            this.selectionWrap = selectionWrap;
        },

        __initEvent: function () {
            this.on({
                'ready': this.__reset,
                'refresh': this.__refresh,
                'controlstatuschange': this.__reselection
            });
        },

        __reset: function () {
            this.__reselection({
                row: 0,
                col: 0
            }, {
                row: 0,
                col: 0
            });
        },

        __refresh: function () {
            var visualData = this.rs('get.visual.data');

            $(this.selectionWrap).css({
                width: visualData.spaceWidth,
                height: visualData.spaceHeight,
                top: visualData.headHeight,
                left: visualData.headWidth
            });
        },

        __reselection: function (start, end) {
            var rect = SystemUtils.getVisibleRect(this.rs('get.visual.data'), start, end);

            // 当前区域不可见
            if (!rect) {
                this.selectionNode.style.display = 'none';
                return;
            }

            var selectionNode = this.selectionNode;
            var selectionCover = this.selectionCover;

            var borders = [
                'solid', 'solid', 'solid', 'solid'
            ];

            var translate = ['-2px', '-2px'];

            if (rect.ot) {
                borders[0] = 'none';
                translate[0] = '0';
            }

            if (rect.or) {
                borders[1] = 'none';
            }

            if (rect.ob) {
                borders[2] = 'none';
            }

            if (rect.ol) {
                borders[3] = 'none';
                translate[1] = '0';
            }

            borders = borders.join('');

            selectionNode.style.borderStyle = borders;
            selectionCover.style.borderStyle = borders;

            if (start.row === end.row && start.col === end.col) {
                selectionCover.style.background = 'none';
            } else {
                selectionCover.style.background = '';
            }

            console.log(rect)

            selectionCover.style.width = rect.width + 'px';
            selectionCover.style.height = rect.height + 'px';

            selectionNode.style.top = rect.y + 'px';
            selectionNode.style.left = rect.x + 'px';
            selectionNode.style.transform = 'translate(' + translate.join(',') + ')';
        }
    });
});