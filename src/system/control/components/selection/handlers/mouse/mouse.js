/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var STATUS = require('../../definition/status');

    module.exports = $.extend({
        timer: null,

        __onmousedown: function (evt) {
            if (this.status !== STATUS.NORMAL) {
                return;
            }

            // 通知接管控制
            this.postMessage('control');

            // 重置锁
            this.__rowIndexLock = false;
            this.__colIndexLock = false;

            if (evt.shiftKey) {
                this.__shiftMousedown(evt);
                return;
            }

            // 请求主控模块暂停对header的控制
            this.rs('ignore.header.control');

            var index = this.__getIndex(evt);

            this.start = index;
            this.end = index;

            if (evt.ctrlKey || evt.metaKey) {
                // 通知进入选区追加模式
                this.postMessage('control.selection.append.mode');
            }

            if (index.row === -1 && index.col === -1) {
                this.status = STATUS.ALL;
                this.postMessage('control.all.selection');
            } else if (index.row === -1 && index.col >= 0) {
                this.status = STATUS.COLUMN;
                this.postMessage('control.column.selection', index.col, index.col);
            } else if (index.row >= 0 && index.col === -1) {
                this.status = STATUS.ROW;
                this.postMessage('control.row.selection', index.row, index.row);
            } else if (index.row >= 0 && index.col >= 0) {
                this.status = STATUS.CELL;
                this.postMessage('control.cell.selection', index, index);
            }
        },

        __shiftMousedown: function (evt) {
            var index = this.__getIndex(evt);

            this.postMessage('control.mouse.expand.selection', index);
        },

        __abortMouse: function () {
            this.__onmouseup();
        },

        // move 不处理all的情况
        __onmousemove: function (evt) {
            if (this.status === STATUS.NORMAL) {
                return;
            }

            var index = this.__getIndex(evt);

            if (index.row === this.end.row && index.col === this.end.col) {
                return;
            }

            switch (this.status) {
                case STATUS.CELL:
                    this.__moveForCell(index);
                    break;

                case STATUS.ROW:
                    this.__moveForRow(index);
                    break;

                case STATUS.COLUMN:
                    this.__moveForColumn(index);
                    break;
            }
        },

        __onmouseup: function () {
            if (this.status === STATUS.NORMAL) {
                return;
            }

            var index;

            // 请求主控模块恢复对header的控制
            this.rs('recover.header.control');

            this.__stopTimer();

            switch (this.status) {
                case STATUS.CELL:
                    index = this.__getIndexForCell(this.end);
                    this.postMessage('control.compolete.cell.selection', this.start, index.index);
                    break;

                case STATUS.ROW:
                    index = this.__getIndexForRow(this.end);
                    this.postMessage('control.compolete.row.selection', this.start.row, index.row);
                    break;

                case STATUS.COLUMN:
                    index = this.__getIndexForColumn(this.end);
                    this.postMessage('control.compolete.column.selection', this.start.col, index.col);
                    break;

                case STATUS.ALL:
                    this.postMessage('control.compolete.all.selection');
                    break;
            }

            this.status = STATUS.NORMAL;

            // 通知退出选区追加模式
            this.postMessage('control.selection.exit.append.mode');
        },

        __onmouseleave: function (evt) {
            if (this.status === STATUS.NORMAL) {
                return;
            }

            var _self = this;
            var $doc = $(document);

            $doc.on('mousemove.btable', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                _self.__onmousemove(evt);
            }).one('mouseup.btable', function (evt) {
                $doc.off('mousemove.btable');
                _self.__onmouseup(evt);
            });
        },

        __onmouseenter: function (evt) {
            if (this.status === STATUS.NORMAL) {
                return;
            }

            this.__stopTimer();
            $(document).off('mousemove.btable mouseup.btable');
        },

        __moveForCell: function (index) {
            var newIndex = this.__getIndexForCell(index);

            this.end = index;

            if (newIndex.scroll) {
                this.__startTimer();
            } else {
                this.__stopTimer();
            }

            this.postMessage('control.cell.selection', this.start, newIndex.index);
        },

        /**
         * 该接口的调用要区分带pane的视图和不待pane的视图。
         * @param index
         * @returns {{scroll: boolean, index: *}}
         * @private
         */
        __getIndexForCell: function (index) {
            var visualData = this.visualData;
            var rowInfo;
            var colInfo;

            this.rs('render.pause');

            // 列窗格有效
            if (visualData.colPaneCount) {
                rowInfo = this.__getNewRowInPaneView(index);
            } else {
                rowInfo = this.__getNewRowInNormalView(index);
            }

            if (visualData.colPaneCount) {
                colInfo = this.__getNewColumnInPaneView(index);
            } else {
                colInfo = this.__getNewColumnInNormalView(index);
            }

            this.rs('render.recovery');

            var scroll = rowInfo.scroll || colInfo.scroll;

            return {
                scroll: scroll,
                index: {
                    row: rowInfo.row,
                    col: colInfo.col
                }
            };
        },

        __moveForRow: function (index) {
            var newIndex = this.__getIndexForRow(index);

            this.end = index;

            if (newIndex.scroll) {
                this.__startTimer();
                this.postMessage('control.row.selection', this.start.row, newIndex.row);
            } else {
                this.__stopTimer();
                this.postMessage('control.row.selection', this.start.row, newIndex.row);
            }
        },

        __getIndexForRow: function (index) {
            var row = index.row;

            // 行滚动步长
            var step = 0;
            var isScroll = row < 0;

            if (isScroll) {
                /* --- 计算滚动步长 start --- */
                if (row === -1 || row === -2) {
                    step = -1;

                    // -3条件不用判断
                } else if (row === -4) {
                    step = 1;
                }
                /* --- 计算滚动步长 end --- */

                // 执行滚动
                this.execCommand('scroll', step, 0);

                // 此时的可视化数据对象已经更新。
                var visualData = this.visualData;

                // 计算end
                if (step === -1) {
                    row = visualData.rows[0];
                } else if (step === 1) {
                    row = visualData.rows[visualData.rowCount - 2] || visualData.rows[0];
                }

                return {
                    scroll: true,
                    row: row
                };
            } else {
                return {
                    scroll: false,
                    row: index.row
                };
            }
        },

        __moveForColumn: function (index) {
            var newIndex = this.__getIndexForColumn(index);

            this.end = index;

            if (newIndex.scroll) {
                this.__startTimer();
                this.postMessage('control.column.selection', this.start.col, newIndex.col);
            } else {
                this.__stopTimer();
                this.postMessage('control.column.selection', this.start.col, newIndex.col);
            }
        },

        __getIndexForColumn: function (index) {
            var col = index.col;

            // 列滚动步长
            var step = 0;
            var isScroll = col < 0;

            if (isScroll) {
                /* --- 计算滚动步长 start --- */
                if (col === -1 || col === -2) {
                    step = -1;
                } else if (col === -4) {
                    step = 1;
                }
                /* --- 计算滚动步长 end --- */

                // 执行明确的指向性滚动
                this.execCommand('scroll', 0, step);

                // 此时的可视化数据对象已经更新。
                var visualData = this.visualData;

                // 计算end
                if (step === -1) {
                    col = visualData.cols[0];
                } else if (step === 1) {
                    col = visualData.cols[visualData.colCount - 2] || visualData.cols[0];
                }

                return {
                    scroll: true,
                    col: col
                };
            } else {
                return {
                    scroll: false,
                    col: index.col
                };
            }
        },

        __startTimer: function () {
            var _self = this;
            this.__stopTimer();

            this.timer = setInterval(function () {
                switch (_self.status) {
                    case STATUS.CELL:
                        _self.__moveForCell(_self.end);
                        break;

                    case STATUS.ROW:
                        _self.__moveForRow(_self.end);
                        break;

                    case STATUS.COLUMN:
                        _self.__moveForColumn(_self.end);
                        break;
                }
            }, 50);
        },

        __stopTimer: function () {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        }
    }, require('./pane'), require('./normal'));
});