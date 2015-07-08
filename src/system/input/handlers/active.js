/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    module.exports = {
        // 当前单元格的起始位置
        __cellStart: null,
        // 当前激活的单元格的类型：normal -> 普通单元格；mergecell -> 合并单元格
        __activeCellType: null,
        // 单元格内无内容时的大小
        __minSize: null,
        // 当前单元格是否是自动换行
        __wraptext: false,
        // 当前单元格的水平对齐属性
        __textAling: null,
        // 单元格未扩展时的基础位置
        __baseLocation: null,

        __resetActive: function () {
            this.__cellStart = null;
            this.__activeCellType = null;
            this.__cellStart = null;
            this.__minSize = null;
            this.__wraptext = null;
            this.__textAling = null;
            this.__baseLocation = null;

            // 移除活动样式
            $(this.inputWrap).removeClass('btb-active');
        },

        __activeNormalCell: function (row, col) {
            var start = {
                row: row,
                col: col
            };
            var end = start;

            // 滚动单元格到视图内
            this.execCommand('scrollin', start, end);

            var fonts = this.queryCommandValue('cellfonts', row, col);
            var alignments = this.queryCommandValue('cellalignments', row, col);
            var fill = this.queryCommandValue('fill', row, col);

            this.__activeCellType = 'normal';
            this.__cellStart = {
                row: row,
                col: col
            };
            this.__minSize = this.__getNormalCellMinSize(row, col);
            this.__wraptext = !!alignments.wraptext;
            this.__textAling = alignments.horizontal || 'left';
            this.__baseLocation = this.__getBaseLocation(row, col);

            // 注意，该方法会清除所有样式。所以需要先调用。
            this.__applyStyle(fonts, alignments, fill);

            // 如果设置了自动换行，则要限制宽度。
            if (this.__wraptext) {
                this.__setShadowWidth(this.__minSize.width);
            }

            // 获取默认rect
            var rect = this.__calculateContentRect(null);

            this.__relocation(rect);

            // 挂上激活样式
            $(this.inputWrap).addClass('btb-active');
        },

        __activeMergeCell: function (mergeInfo) {
            var start = mergeInfo.start;
            var end = mergeInfo.end;

            // 滚动单元格到视图内
            this.execCommand('scrollin', start, end);

            var fonts = this.queryCommandValue('cellfonts', start.row, start.col);
            var alignments = this.queryCommandValue('cellalignments', start.row, start.col);
            var fill = this.queryCommandValue('fill', start.row, start.col);

            this.__activeCellType = 'mergecell';
            this.__cellStart = {
                row: start.row,
                col: start.col
            };
            this.__minSize = this.__getMergeCellMinSize(start, end);
            this.__wraptext = !!alignments.wraptext;
            this.__textAling = alignments.horizontal || 'left';
            this.__baseLocation = this.__getBaseLocation(start.row, start.col);

            // 注意，该方法会清除所有样式。所以需要先调用。
            this.__applyStyle(fonts, alignments, fill);

            // 合并单元格需要强制设置宽度
            this.__setShadowWidth(this.__minSize.width);

            // 获取默认rect
            var rect = this.__calculateContentRect(null);

            this.__relocation(rect);

            // 挂上激活样式
            $(this.inputWrap).addClass('btb-active');
        },

        __applyStyle: function (fonts, alignments) {
            var cssText = toCssText(fonts, alignments);

            this.inputNode.style.cssText = cssText;
            this.shadow.style.cssText = cssText;
        },

        __relocation: function (rect) {
            $(this.inputWrap).css({
                top: rect.y - 2,
                left: rect.x - 2
            });

            $(this.inputNode).css({
                width: rect.width,
                height: rect.height
            });

            if (rect.overflow) {
                this.inputNode.style.overflow = 'scroll';
            } else {
                this.inputNode.style.overflow = '';
            }
        },

        __getBaseLocation: function (row, col) {
            var visualData = this.visualData;
            var startViewRow = visualData.row;
            var startViewCol = visualData.col;
            var endViewRow = visualData.endRow;
            var endViewCol = visualData.endCol;

            var x;
            var y;

            // 上溢出
            if (row < startViewRow) {
                y = LINE_WIDTH;

            // 下溢出
            } else if (row > endViewRow) {
                y = visualData.boundaryHeight - LINE_WIDTH;

            // 可见
            } else {
                y = visualData.rowPoints[visualData.rows.indexOf(row)] + OFFSET;
            }

            // 左溢出
            if (col < startViewCol) {
                x = LINE_WIDTH;

            // 右溢出
            } else if (col > endViewCol) {
                x = visualData.boundaryWidth - LINE_WIDTH;

            // 可见
            } else {
                x = visualData.colPoints[visualData.cols.indexOf(col)] + OFFSET;
            }

            return {
                x: x,
                y: y
            };
        },

        __getNormalCellMinSize: function (row, col) {
            return {
                width: this.queryCommandValue('columnwidth', col),
                height: this.queryCommandValue('rowheight', row)
            };
        },

        __getMergeCellMinSize: function (start, end) {
            var rect = this.rs('get.visible.rect', start, end);

            return {
                width: rect.width,
                height: rect.height
            };
        }
    };

    function toCssText(fonts, alignments, fill) {
        var result = [
            'font-family: ' + fonts.name.value || fonts.name,
            'font-size: ' + fonts.size + 'pt',
            'color: ' + fonts.color.value || fonts.color
        ];

        if (fonts.bold) {
            result.push('font-weight: bold');
        }

        if (fonts.italic) {
            result.push('font-weight: italic');
        }

        if (fonts.throughline) {
            result.push('text-decoration: underline');
        } else if (fonts.throughline) {
            result.push('text-decoration: line-through');
        }

        if (fill) {
            result.push('background-color: ' + fill);
        }

        if (alignments.horizontal) {
            result.push('text-align: ' + alignments.horizontal);
        }

        if (alignments.vertical) {
            result.push('vertical-align: ' + alignments.vertical);
        }

        return result.join(';');
    }
});