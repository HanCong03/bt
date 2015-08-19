/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var BorderLayout = require('./border-layout');

    var BorderDrawers = {
        'thin': require('./drawer/thin'),
        'hair': require('./drawer/hair'),
        'dotted': require('./drawer/dotted'),
        'dashed': require('./drawer/dashed'),
        'dashdot': require('./drawer/dash-dot'),
        'dashdotdot': require('./drawer/dash-dot-dot'),
        //'double': require('./drawer/double'),
        'medium': require('./drawer/medium'),
        'mediumdashed': require('./drawer/medium-dashed'),
        'mediumdashdot': require('./drawer/medium-dash-dot'),
        'mediumdashdotdot': require('./drawer/medium-dash-dot-dot'),
        //'slantdashdot': require('./drawer/slant-dash-dot'),
        'thick': require('./drawer/thick')
    };

    module.exports = {
        __drawBorder: function () {
            var visualData = this.visualData;
            var screen = this.borderScreen;

            if (visualData.rowCount === 0 || visualData.colCount === 0) {
                return;
            }

            screen.save();
            screen.translate(visualData.headWidth, visualData.headHeight);
            screen.rect(0, 0, visualData.boundaryWidth, visualData.boundaryHeight);
            screen.clip();

            this.__drawBorders();

            // 清理贯穿合并单元格的边框线。
            this.__cleanMergeCell();

            screen.restore();
        },

        __drawBorders: function () {
            var layoutData = this.layoutData;
            var borderLayout = BorderLayout.parse(layoutData, this.visualData);

            if (borderLayout.h) {
                this.__drawHorizontalBorder(borderLayout.h);
            }

            if (borderLayout.v) {
                this.__drawVerticalBorder(borderLayout.v);
            }
        },

        /**
         * 清理贯穿合并单元格的边框线
         * @private
         */
        __cleanMergeCell: function () {
            var layoutData = this.layoutData;
            var screen = this.borderScreen;

            $$.forEach(layoutData, function (rowLayout) {
                $$.forEach(rowLayout, function (currentLayout) {
                    if (!currentLayout.mergecell || !currentLayout.active) {
                        return;
                    }

                    var rect = this.rs('get.visible.rect', currentLayout.mergecell.start, currentLayout.mergecell.end);
                    screen.clearRect(rect.x, rect.y, rect.width, rect.height);
                }, this);
            }, this);
        },

        __drawHorizontalBorder: function (borderLayout) {
            var current;
            var screen = this.borderScreen;
            var visualData = this.visualData;

            for (var key in borderLayout) {
                if (!borderLayout.hasOwnProperty(key)) {
                    continue;
                }

                current = borderLayout[key];

                if (BorderDrawers[current.border.style]) {
                    BorderDrawers[current.border.style].drawHorizontal(screen, visualData, current, current.border);
                }
            }
        },

        __drawVerticalBorder: function (borderLayout) {
            var current;
            var screen = this.borderScreen;
            var visualData = this.visualData;

            for (var key in borderLayout) {
                if (!borderLayout.hasOwnProperty(key)) {
                    continue;
                }

                current = borderLayout[key];

                if (BorderDrawers[current.border.style]) {
                    BorderDrawers[current.border.style].drawVertical(screen, visualData, current, current.border);
                }
            }
        }
    };
});