/**
 * @file 评论
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Comment', {
        base: require('module'),

        mixin: [
            require('./panel')
        ],

        visualData: null,
        layoutData: null,

        init: function () {
            this.__initPanel();
            this.__initMessage();
        },

        __initMessage: function () {
            this.onMessage({
                'layout.refresh': this.__refreshLayout,

                'control.hover.in': this.__hoverIn,
                'control.hover.stop': this.__hoverStop
            });
        },

        __refreshLayout: function (layoutData) {
            this.visualData = this.rs('get.visual.data');
            this.layoutData = layoutData;
        },

        __hoverIn: function (toIndex, fromIndex) {
            if (toIndex.r < 0 || toIndex.c < 0) {
                this.__hoverStop();
                return;
            }

            var layoutData = this.layoutData;
            var toLayout = layoutData[toIndex.r][toIndex.c];
            var toMergeInfo = toLayout.mergecell;

            if (toMergeInfo && !toMergeInfo.active) {
                toLayout = layoutData[toLayout.fr][toLayout.fc];
            }

            var comment = toLayout.comment;

            if (!comment) {
                this.__hoverStop();
                return;
            }

            var rect;

            if (toMergeInfo) {
                rect = this.rs('get.visible.rect', toMergeInfo.start, toMergeInfo.end);
            } else {
                rect = this.rs('get.visible.rect', {
                    row: toLayout.row,
                    col: toLayout.col
                }, {
                    row: toLayout.row,
                    col: toLayout.col
                });
            }

            if (!fromIndex || fromIndex.r < 0 || fromIndex.c < 0) {
                this.__showComment(rect, comment);
                return;
            }

            var fromLayout = layoutData[fromIndex.r][fromIndex.c];

            var fromMergeInfo = fromLayout.mergecell;

            if (toMergeInfo) {
                if (!fromMergeInfo) {
                    this.__showComment(rect, comment);

                // 同一单元格内移动
                } else if (toMergeInfo.start.row !== fromMergeInfo.start.row
                    || toMergeInfo.start.col !== fromMergeInfo.start.col) {

                    this.__showComment(rect, comment);
                }
            } else {
                this.__showComment(rect, comment);
            }
        },

        __hoverStop: function () {
            this.__hideComment();
        }
    });
});