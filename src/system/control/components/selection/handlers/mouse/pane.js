/**
 * @file 计算在带窗格的视图中滚动的滚动数。
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    // 区域类型，以paneline为界限。
    var AREA_TYPE = {
        TOP: 1,
        BOTTOM: 2,
        LEFT: 4,
        RIGHT: 8
    };

    module.exports = {
        // 行列锁，配合窗格滚动控制。
        __rowIndexLock: false,
        __colIndexLock: false,

        __getNewRowInPaneView: function (index) {
            var visualData = this.visualData;
            var start = this.start;

            // 视图完全被窗格占据， 不滚动
            if (visualData.normalRows.length === 0) {
                return {
                    scroll: false,
                    row: this.__parseIndexToRow(index)
                };
            }

            var paneRows = visualData.paneRows;
            var startRowType = paneRows.indexOf(start.row) === -1 ? AREA_TYPE.BOTTOM : AREA_TYPE.TOP;

            var info;

            // 处理起始点在窗格内的情况
            if (startRowType === AREA_TYPE.TOP) {
                info = this.__getRowInfoByTopArea(index);
            } else {
                info = this.__getRowInfoByBottomArea(index);
            }

            return info;
        },

        __getNewColumnInPaneView: function (index) {
            var visualData = this.visualData;
            var start = this.start;

            // 视图完全被窗格占据， 不滚动
            if (visualData.normalCols.length === 0) {
                return {
                    scroll: false,
                    row: this.__parseIndexToColumn(index)
                };
            }

            var paneCols = visualData.paneCols;
            var startColType = paneCols.indexOf(start.col) === -1 ? AREA_TYPE.RIGHT : AREA_TYPE.LEFT;

            var info;

            // 处理起始点在窗格内的情况
            if (startColType === AREA_TYPE.LEFT) {
                info = this.__getColumnInfoByLeftArea(index);
            } else {
                info = this.__getColumnInfoByRightArea(index);
            }

            return info;
        },

        /**
         * 获取起始行在窗格内时，在给定index下的行信息。
         * @private
         */
        __getRowInfoByTopArea: function (index) {
            var visualData = this.visualData;
            var currentRowType = this.__getRowAreaType(index.row);
            var prevRowType = this.__getRowAreaType(this.end.row);

            // 在同一侧，检测上一次的位置
            if (currentRowType === AREA_TYPE.TOP) {
                // 上一次的位置也在同一侧并且行锁未开启，则不滚动。
                if (prevRowType === AREA_TYPE.TOP && !this.__rowIndexLock) {
                    return {
                        scroll: index.row < 0,
                        row: this.__parseIndexToRow(index)
                    };
                }

                /* --- 否则，需要计算滚动后的位置 --- */

                // 当前视图不是连续视图，则向上滚动一行。
                if (visualData.row > visualData.startRow) {
                    this.execCommand('scrollrow', -1);

                    // 开启行锁
                    this.__rowIndexLock = true;

                    return {
                        // 继续滚动
                        scroll: true,
                        // 返回的行是刷新后的第一条normal row
                        row: visualData.normalRows[0]
                    };
                }

                // 关闭行锁
                this.__rowIndexLock = false;

                // 否则，不用滚动。
                return {
                    scroll: index.row < 0,
                    row: this.__parseIndexToRow(index)
                };
            }

            /* ---- 不在同一侧的计算 ---- */

            // 关闭行锁
            this.__rowIndexLock = false;

            // 第一次进入
            if (prevRowType === AREA_TYPE.TOP) {
                // 当前视图不是连续视图，则设置当前的游标到窗格起点上。
                if (visualData.row > visualData.startRow) {
                    this.execCommand('scrollrowto', visualData.startRow);
                }

                // 否则，不滚动
                return {
                    scroll: index.row < 0,
                    row: this.__parseIndexToRow(index)
                };
            }

            // 非第一次进入，则检测鼠标位置
            if (index.row === -4) {
                // 向下滚动一行
                this.execCommand('scrollrow', 1);
            }

            return {
                scroll: index.row < 0,
                row: this.__parseIndexToRow(index)
            };
        },

        /**
         * 获取起始行在窗格外时，在给定的index下的行信息
         * @private
         */
        __getRowInfoByBottomArea: function (index) {
            var visualData = this.visualData;
            var currentRowType = this.__getRowAreaType(index.row);

            // 在同一侧
            if (currentRowType === AREA_TYPE.BOTTOM) {
                // 当前鼠标位置在可视区域外，需要持续滚动

                if (index.row === -4) {
                    this.execCommand('scrollrow', 1);

                    return {
                        scroll: true,
                        row: visualData.lastFullRow
                    };
                }

                // 当前鼠标位置在可视区域内部，直接定位即可
                return {
                    scroll: false,
                    row: this.__parseIndexToRow(index)
                };
            }

            /* --- 不在同一侧 --- */

            // 当前的视图不是是连续视图，需要向上滚动
            if (visualData.row > visualData.startRow) {
                this.execCommand('scrollrow', -1);

                return {
                    scroll: true,
                    row: visualData.normalRows[0]
                };
            }

            // 当前已经是连续视图，则不滚动，直接返回即可
            return {
                scroll: false,
                row: this.__parseIndexToRow(index)
            };
        },

        __getColumnInfoByLeftArea: function (index) {
            var visualData = this.visualData;
            var currentColumnType = this.__getColumnAreaType(index.col);
            var prevColType = this.__getColumnAreaType(this.end.row);

            // 在同一侧，检测上一次的位置
            if (currentColumnType === AREA_TYPE.LEFT) {
                // 上一次的位置也在同一侧并且列锁未开启，则不滚动。
                if (prevColType === AREA_TYPE.LEFT && !this.__colIndexLock) {
                    return {
                        scroll: index.col < 0,
                        col: this.__parseIndexToColumn(index)
                    };
                }

                /* --- 否则，需要计算滚动后的位置 --- */

                // 当前视图不是连续视图，则向左滚动一列。
                if (visualData.row > visualData.startRow) {
                    this.execCommand('scrollcolumn', -1);

                    // 开启行锁
                    this.__colIndexLock = true;

                    return {
                        // 继续滚动
                        scroll: true,
                        // 返回的列是刷新后的第一条normal col
                        col: visualData.normalCols[0]
                    };
                }

                // 关闭行锁
                this.__colIndexLock = false;

                // 否则，不用滚动。
                return {
                    scroll: index.col < 0,
                    col: this.__parseIndexToColumn(index)
                };
            }

            /* ---- 不在同一侧的计算 ---- */

            // 关闭列锁
            this.__colIndexLock = false;

            // 第一次进入
            if (prevColType === AREA_TYPE.LEFT) {
                // 当前视图不是连续视图，则设置当前的游标到窗格起点上。
                if (visualData.col > visualData.startCol) {
                    this.execCommand('scrollcolumnto', visualData.startCol);
                }

                // 否则，不滚动
                return {
                    scroll: index.col < 0,
                    col: this.__parseIndexToColumn(index)
                };
            }

            // 非第一次进入，则检测鼠标位置
            if (index.col === -4) {
                // 向下滚动一行
                this.execCommand('scrollcolumn', 1);
            }

            return {
                scroll: index.col < 0,
                col: this.__parseIndexToColumn(index)
            };
        },

        __getColumnInfoByRightArea: function (index) {
            var visualData = this.visualData;
            var currentColType = this.__getColumnAreaType(index.col);

            // 在同一侧
            if (currentColType === AREA_TYPE.RIGHT) {
                // 当前鼠标位置在可视区域外，需要持续滚动
                if (index.col === -4) {
                    this.execCommand('scrollcolumn', 1);

                    return {
                        scroll: true,
                        col: visualData.lastFullCol
                    };
                }

                // 当前鼠标位置在可视区域内部，直接定位即可
                return {
                    scroll: false,
                    col: this.__parseIndexToColumn(index)
                };
            }

            /* --- 不在同一侧 --- */

            // 当前的视图不是是连续视图，需要向左滚动
            if (visualData.col > visualData.startCol) {
                this.execCommand('scrollcolumn', -1);

                return {
                    scroll: true,
                    col: visualData.normalCols[0]
                };
            }

            // 当前已经是连续视图，则不滚动，直接返回即可
            return {
                scroll: false,
                col: this.__parseIndexToColumn(index)
            };
        },

        __getRowAreaType: function (row) {
            var visualData = this.visualData;
            var paneRows = visualData.paneRows;

            if (row === -1 || row === -2) {
                return AREA_TYPE.TOP;
            } else if (row === -3 || row === -4) {
                return AREA_TYPE.BOTTOM;
            } else {
                return paneRows.indexOf(row) === -1 ? AREA_TYPE.BOTTOM : AREA_TYPE.TOP;
            }
        },

        __getColumnAreaType: function (col) {
            var visualData = this.visualData;
            var paneCols = visualData.paneCols;

            if (col === -1 || col === -2) {
                return AREA_TYPE.LEFT;
            } else if (col === -3 || col === -4) {
                return AREA_TYPE.RIGHT;
            } else {
                return paneCols.indexOf(col) === -1 ? AREA_TYPE.RIGHT : AREA_TYPE.LEFT;
            }
        },

        __parseIndexToRow: function (index) {
            var visualData = this.rs('get.visual.data');

            if (index.r === -1 || index.r === -2) {
                return visualData.startRow;
            } else if (index.r === -3 || index.r === -4) {
                return visualData.lastFullRow;
            } else {
                return visualData.rows[index.r];
            }
        },

        __parseIndexToColumn: function (index) {
            var visualData = this.rs('get.visual.data');

            if (index.c === -1 || index.c === -2) {
                return visualData.startCol;
            } else if (index.c === -3 || index.c === -4) {
                return visualData.lastFullCol;
            } else {
                return visualData.cols[index.c];
            }
        }
    };
});