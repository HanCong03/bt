define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');

    var SystemUtils = require('system/utils/utils');

    var STATUS = require('../../definition/status');

    module.exports = {
        __mousedown: function (evt) {
            this.emit('control');

            if (this.status !== STATUS.NORMAL) {
                return;
            }

            var start = this.getIndex(evt.clientX, evt.clientY);

            this.start = start;
            this.end = start;

            if (start.row === -1 && start.col === -1) {
                this.status = STATUS.ALL;
                this.emit('control.all.select');
            } else if (start.col === -1) {
                this.status = STATUS.ROW;
                this.emit('control.row.select', start.row, start.row);
            } else if (start.row === -1) {
                this.status = STATUS.COLUMN;
                this.emit('control.column.select', start.col, start.col);
            } else if (start.row >= 0 && start.col >= 0) {
                this.status = STATUS.CELL;
                this.emit('control.cell.select', this.start, this.end);
            }
        },

        __mousemove: function (evt) {
            // 不处理all的情况
            if ((this.status & (STATUS.CELL | STATUS.ROW | STATUS.COLUMN)) === 0) {
                return;
            }

            var index = this.getIndex(evt.clientX, evt.clientY);

            // 交给外部处理器处理
            if (index.row < 0 || index.col < 0) {
                return this.__outerProcess(index);
            }

            // 未发生改变
            if (this.end.row === index.row && this.end.col === index.col) {
                return;
            }

            this.end = index;

            switch (this.status) {
                case STATUS.CELL:
                    this.emit('control.cell.select', this.start, this.end);
                    break;

                case STATUS.ROW:
                    this.emit('control.row.select', this.start.row, this.end.row);
                    break;

                case STATUS.COLUMN:
                    this.emit('control.column.select', this.start.col, this.end.col);
                    break;
            }
        },

        __mouseup: function (evt) {
            switch (this.status) {
                case STATUS.CELL:
                    this.end = this.getIndex(evt.clientX, evt.clientY);
                    this.emit('control.complete.cell.select', this.start, this.end);
                    break;

                case STATUS.ROW:
                    this.end = this.getIndex(evt.clientX, evt.clientY);
                    this.emit('control.complete.row.select', this.start.row, this.end.row);
                    break;

                case STATUS.COLUMN:
                    this.end = this.getIndex(evt.clientX, evt.clientY);
                    this.emit('control.complete.column.select', this.start.col, this.end.col);
                    break;

                case STATUS.ALL:
                    this.end = this.getIndex(evt.clientX, evt.clientY);
                    this.emit('control.complete.all.select', this.start.col, this.end.col);
                    break;
            }

            this.__reset();
        },

        __mouseleave: function (evt) {
            $(document).on('mousemove', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();


            });

            this.__outerProcess();
        },

        __mouseenter: function () {
            this.__stopOuterProcess();
        }
    };
});