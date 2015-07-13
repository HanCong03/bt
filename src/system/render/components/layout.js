/**
 * @file 维护当前可视区域的布局数据
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        __getLayout: function () {
            var visualData = this.visualData;

            if (visualData.rowCount === 0 || visualData.colCount === 0) {
                return;
            }

            var mergecells = this.queryCommandValue('mergecell', {
                row: visualData.rows[0],
                col: visualData.cols[0]
            }, {
                row: visualData.rows[visualData.rowCount - 1],
                cols: visualData.cols[visualData.colCount - 1]
            });


            if ($$.isNdef(mergecells)) {
                return this.__getNormalLayout();
            }

            return this.__getMergeCellLayout(mergecells);
        },

        __getNormalLayout: function () {
            var visualData = this.visualData;
            var result = [];

            var renderInfo = this.__getRenderInfo(visualData.rows, visualData.cols);
            var styels = renderInfo.styles;
            var comments = renderInfo.comments;

            $$.forEach(visualData.rows, function (row, i) {
                var currentRow = [];
                result.push(currentRow);

                $$.forEach(visualData.cols, function (col, j) {
                    var key = row + ',' + col;

                    currentRow.push({
                        row: row,
                        col: col,
                        // visual-data中的索引
                        r: i,
                        c: j,
                        // display-content
                        content: this.rs('get.display.content', row, col),
                        alignments: styels[key].alignments,
                        fonts: styels[key].fonts,
                        border: styels[key].borders.border,
                        fills: styels[key].fills,
                        comment: comments[key],
                        rect: this.rs('get.visible.rect', {
                            row: row,
                            col: col
                        }, {
                            row: row,
                            col: col
                        })
                    });
                }, this);
            }, this);

            return result;
        },

        __getMergeCellLayout: function (mergecells) {
            var visualData = this.visualData;
            var mergeMap = mergeToMap(mergecells);

            var result = [];
            var info;
            var renderInfo = this.__getRenderInfo(visualData.rows, visualData.cols);
            var styels = renderInfo.styles;
            var comments = renderInfo.comments;

            $$.forEach(visualData.rows, function (row, i) {
                var currentRow = [];
                result.push(currentRow);

                $$.forEach(visualData.cols, function (col, j) {
                    var mergeFlag = mergeMap[row + ',' + col];
                    var key = row + ',' + col;
                    var index;

                    if ($$.isNdef(mergeFlag)) {
                        currentRow.push({
                            row: row,
                            col: col,
                            // visual-data中的索引
                            r: i,
                            c: j,
                            // display-content
                            content: this.rs('get.display.content', row, col),
                            alignments: styels[key].alignments,
                            fonts: styels[key].fonts,
                            border: styels[key].borders.border,
                            fills: styels[key].fills,
                            comment: comments[key],
                            rect: this.rs('get.visible.rect', {
                                row: row,
                                col: col
                            }, {
                                row: row,
                                col: col
                            })
                        });
                    } else {
                        index = this.__getEndRC(mergeFlag.start, mergeFlag.end);

                        info = {
                            active: mergeFlag.active,
                            row: row,
                            col: col,
                            // mergecell信息
                            mergecell: {
                                start: mergeFlag.start,
                                end: mergeFlag.end,
                                // 当前合并单元格在可视范围内的右下角的visual-data索引
                                er: index.r,
                                ec: index.c
                            },
                            // visual-data中的索引
                            r: i,
                            c: j,
                            // display-content
                            content: this.rs('get.display.content', mergeFlag.start.row, mergeFlag.start.col),
                            alignments: styels[key].alignments,
                            fonts: styels[key].fonts,
                            border: styels[key].borders.border,
                            fills: styels[key].fills,
                            comment: this.queryCommandValue('comment', mergeFlag.start.row, mergeFlag.start.col)
                        };

                        currentRow.push(info);

                        if (mergeFlag.active) {
                            info.rect = this.rs('get.visible.rect', mergeFlag.start, mergeFlag.end);
                        }

                        mergeFlag.active = false;
                    }
                }, this);
            }, this);

            return result;
        },

        __getRenderInfo: function (rows, cols) {
            return this.queryCommandValue('_renderinfo', rows, cols);
        },

        __getEndRC: function (start, end) {
            var visualData = this.visualData;
            var rows = visualData.rows;
            var cols = visualData.cols;

            var r;
            var c;

            // row
            for (var i = end.row, min = start.row; i >= min; i--) {
                r = rows.indexOf(i);

                if (r !== -1) {
                    break;
                }
            }

            // col
            for (var i = end.col, min = start.col; i >= min; i--) {
                c = cols.indexOf(i);

                if (c !== -1) {
                    break;
                }
            }

            return {
                r: r,
                c: c
            };
        }
    };

    /**
     * 把合并单元格的数据记录转换成为一个map对象，以方便判断单元格是否处于合并状态
     * @param mergecells
     */
    function mergeToMap(mergecells) {
        var map = {};
        var current;
        var flag;

        for (var key in mergecells) {
            if (!mergecells.hasOwnProperty(key)) {
                continue;
            }

            current = mergecells[key];
            flag = {
                start: current.start,
                end: current.end,
                // 当前单元格是否是活动单元格
                active: true
            };

            for (var i = current.start.row, limit = current.end.row; i <= limit; i++) {
                for (var j = current.start.col, jlimit = current.end.col; j <= jlimit; j++) {
                    map[i + ',' + j] = flag;
                }
            }
        }

        return map;
    }
});