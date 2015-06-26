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

            var sysDefaultFonts = this.queryCommandValue('defaultfonts');
            var sysDefaultAligns = this.queryCommandValue('defaultalignments');

            $$.forEach(visualData.rows, function (row, i) {
                var currentRow = [];
                result.push(currentRow);

                $$.forEach(visualData.cols, function (col, j) {
                    currentRow.push({
                        row: row,
                        col: col,
                        // visual-data中的索引
                        r: i,
                        c: j,
                        // display-content
                        content: this.rs('get.display.content', row, col),
                        alignments: this.queryCommandValue('alignments', row, col) || sysDefaultAligns,
                        fonts: this.queryCommandValue('fonts', row, col) || sysDefaultFonts,
                        border: this.queryCommandValue('border', row, col)
                    });
                }, this);
            }, this);

            return result;
        },

        __getMergeCellLayout: function (mergecells) {
            var visualData = this.visualData;
            var result = [];

            var mergeMap = mergeToMap(mergecells);
            var sysDefaultFonts = this.queryCommandValue('defaultfonts');
            var sysDefaultAligns = this.queryCommandValue('defaultalignments');

            $$.forEach(visualData.rows, function (row, i) {
                var currentRow = [];
                result.push(currentRow);

                $$.forEach(visualData.cols, function (col, j) {
                    var mergeFlag = mergeMap[row + ',' + col];
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
                            alignments: this.queryCommandValue('alignments', row, col) || sysDefaultAligns,
                            fonts: this.queryCommandValue('fonts', row, col) || sysDefaultFonts,
                            border: this.queryCommandValue('border', row, col)
                        });
                    } else {
                        // 标记已被激活，则忽略该标记，否则，激活该标记。
                        if (mergeFlag.active) {
                            currentRow.push(null);
                            return;
                        }

                        mergeFlag.active = 1;
                        index = this.__getEndRC(mergeFlag.start, mergeFlag.end);

                        currentRow.push({
                            row: row,
                            col: col,
                            // mergecell信息
                            mergecell: {
                                start: mergeFlag.start,
                                end: mergeFlag.end,
                                // 当前合并单元格在可视范围内的右下角的visual-data索引
                                // er: end-r
                                // ec: end-c
                                er: index.r,
                                ec: index.c
                            },
                            // visual-data中的索引
                            r: i,
                            c: j,
                            // display-content
                            content: this.rs('get.display.content', mergeFlag.start.row, mergeFlag.start.col),
                            alignments: this.queryCommandValue('alignments', mergeFlag.start.row, mergeFlag.start.col) || sysDefaultAligns,
                            fonts: this.queryCommandValue('fonts', mergeFlag.start.row, mergeFlag.start.col) || sysDefaultFonts,
                            border: this.queryCommandValue('border', mergeFlag.start.row, mergeFlag.start.col)
                        });
                    }
                }, this);
            }, this);

            return result;
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
                // 当前单元格是否已经被激活
                active: 0
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