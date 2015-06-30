/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    module.exports = {
        __activeNormalCell: function (row, col) {
            var fonts = this.queryCommandValue('fonts', row, col);
            var alignments = this.queryCommandValue('alignments', row, col);
            var fill = this.queryCommandValue('fill', row, col);

            var formattedContent = this.rs('get.formatted.content', row, col);

            var size = this.__getNormalCellSize(formattedContent, fonts, alignments, row, col);

            var start = {
                row: row,
                col: col
            };
            var end = start;

            this.execCommand('scrollin', start, end);

            var location = this.__getLocation(row, col);

            this.__relocation(location.x, location.y);
            this.__applyStyle(fonts, alignments, fill);
            this.__resize(size);

            $(this.inputWrap).addClass('btb-active');
        },

        __activeMergeCell: function (mergeInfo) {},

        __applyStyle: function (fonts, alignments) {
            var cssText = toCssText(fonts, alignments);

            console.log(cssText)

            this.inputNode.style.cssText = cssText;
        },

        __resize: function (size) {
            $(this.inputNode).css(size);
        },

        __relocation: function (x, y) {
            $(this.inputWrap).css({
                top: y - 2,
                left: x - 2
            });
        },

        __getLocation: function (row, col) {
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

        __inView: function (visualData, row, col) {
            var startViewRow = visualData.row;
            var startViewCol = visualData.col;
            var endViewRow = visualData.endRow;
            var endViewCol = visualData.endCol;

            return row >= startViewRow && row <= endViewRow
                && col >= startViewCol && col <= endViewCol;
        },

        __getNormalCellSize: function (content, fonts, alignments, row, col) {
            var width = 0;
            var height = 0;

            if (!content) {
                return {
                    width: this.queryCommandValue('columnwidth', col),
                    height: this.queryCommandValue('rowheight', row)
                };
            }


        }
    };

    function toCssText(fonts, alignments, fill) {
        var result = [
            'font-family: ' + fonts.name,
            'font-size: ' + fonts.size + 'pt',
            'color: ' + fonts.color
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