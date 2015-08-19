/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    var COMMENT_CONFIG = require('definition/face-theme').comment;
    var FLAG_COLOR = COMMENT_CONFIG.color;
    var FLAG_SIZE = COMMENT_CONFIG.size;

    module.exports = {
        __drawComment: function () {
            var visualData = this.visualData;
            var layoutData = this.layoutData;
            var screen = this.contentScreen;

            if (visualData.rowCount === 0 || visualData.colCount === 0) {
                return;
            }

            screen.save();
            screen.beginPath();
            screen.translate(visualData.headWidth, visualData.headHeight)
            screen.fillColor(FLAG_COLOR);

            $$.forEach(layoutData, function (rowLayout) {
                $$.forEach(rowLayout, function (currentLayout) {
                    if ($$.isNdef(currentLayout.comment)) {
                        return;
                    }

                    if (currentLayout.mergecell) {
                        // 非活动单元格
                        if (!currentLayout.active) {
                            return;
                        }

                        this.__drawMergeCellComment(currentLayout);
                    } else {
                        this.__drawNoramlCellComment(currentLayout);
                    }
                }, this);
            }, this);

            screen.fill();
            screen.restore();
        },

        __drawMergeCellComment: function (layout) {
            var mergeInfo = layout.mergecell;
            var rect = this.rs('get.visible.rect', mergeInfo.start, mergeInfo.end);

            // 顶部溢出或者右侧溢出则不绘制
            if (rect.ot || rect.or) {
                return;
            }

            this.__drawCommentFlag(rect);
        },

        __drawNoramlCellComment: function (layout) {
            var rect = this.rs('get.real.rect', layout.row, layout.col, {
                row: layout.row,
                col: layout.col
            }, {
                row: layout.row,
                col: layout.col
            });

            this.__drawCommentFlag(rect);
        },

        __drawCommentFlag: function (rect) {
            var screen = this.contentScreen;

            var x = rect.x;
            var y = rect.y;
            var width = rect.width;

            screen.beginPath();
            screen.moveTo(x + width - FLAG_SIZE, y);
            screen.lineTo(x + width, y);
            screen.lineTo(x + width, y + FLAG_SIZE);
            screen.closePath();
        }
    };
});