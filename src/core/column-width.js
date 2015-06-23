/**
 * @file 列宽，行高计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var VTYPE = require('definition/vtype');
    var CELL_PADDING = require('definition/cell-padding');
    var DOBULE_H_PADDIGN = 2 * CELL_PADDING.h;

    module.exports = $$.createClass('ColumnWidth', {
        base: require('module'),

        shadowBox: null,

        init: function () {
            this.__initHeap();
            this.__initShadowBox();
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            if ($$.isDefined(heap.widths)) {
                return;
            }

            heap.widths = [];
        },

        __initShadowBox: function () {
            this.shadowBox = document.createElement('span');
            this.shadowBox.style.cssText = 'line-height: 1';
            this.getShadowContainer().appendChild(this.shadowBox);
        },

        getColumnWidth: function (col) {
            var heap = this.getActiveHeap();

            if ($$.isNdef(heap.widths[col])) {
                heap.widths[col] = this.__calculateColumnWidth(col);
            }

            return heap.widths[col];
        },

        __calculateColumnWidth: function (col) {
            // 查看用户设置的宽度
            var userColumnWidth = this.rs('get.column.width', col);

            if ($$.isDefined(userColumnWidth)) {
                return userColumnWidth + DOBULE_H_PADDIGN;
            }

            return this.__autoWidth(col) + DOBULE_H_PADDIGN;
        },

        __autoWidth: function (col) {
            var dimension = this.queryCommandValue('dimension');
            var standard = this.queryCommandValue('standard');

            if (dimension.max.col < col || dimension.min.col > col) {
                return standard.width;
            }

            var cells = this.__getCells(col, dimension.min.row, dimension.max.row);

            // 当前行无有效数据，则返回标准宽度
            if ($$.isNdef(cells)) {
                return standard.width;
            }

            // 返回自动计算的宽度和标准宽度中比较大的值
            return Math.max(standard.width, this.__calculateWidth(cells));
        },

        __getCells: function (col, startRow, endRow) {
            var cells = [];
            var current;
            var contentInfo;

            for (var i = startRow; i <= endRow; i++) {
                contentInfo = this.queryCommandValue('contentinfo', i, col);

                // 无内容
                if ($$.isNdef(contentInfo)) {
                    continue;
                }

                // 内容格式不是数字
                if (contentInfo.type !== VTYPE.NUMBER) {
                    continue;
                }

                current = {
                    font: this.queryCommandValue('font', i, col),
                    fontsize: this.queryCommandValue('fontsize', i, col),
                    content: this.rs('get.display.content', i, col)
                };

                cells.push(current);
            }

            if (cells.length === 0) {
                return null;
            }

            return cells;
        },

        __calculateWidth: function (cells) {
            var box = this.shadowBox;
            var widths = [];

            $$.forEach(cells, function (cell) {
                box.innerHTML = buildHTML(cell);

                var nodes = box.firstChild.children;
                var rect;

                for (var i = 0, len = nodes.length; i < len; i++) {
                    rect = nodes[i].getBoundingClientRect();
                    widths.push(rect.width);
                }
            });

            return Math.max.apply(null, widths);
        }
    });

    function buildHTML(cell) {
        var contents = [];
        var html = '<div style="font-family: ${font}; font-size: ${fontsize}pt;">${content}</div>';

        if (cell.content) {
            $$.forEach(cell.content, function (rowContent) {
                contents.push('<span>' + rowContent + '</span>');
            });
        }

        return $$.tpl(html, {
            font: cell.font,
            fontsize: cell.fontsize,
            content: contents.join('')
        });
    }
});