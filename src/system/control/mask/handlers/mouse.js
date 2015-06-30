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
            switch (this.status) {
                case STATUS.CELL:
                    this.end = this.getIndex(evt.clientX, evt.clientY);
                    this.emit('control.cell.select', this.start, this.end);
                    break;

                case STATUS.ROW:
                    this.end = this.getIndex(evt.clientX, evt.clientY);
                    this.emit('control.row.select', this.start.row, this.end.row);
                    break;

                case STATUS.COLUMN:
                    this.end = this.getIndex(evt.clientX, evt.clientY);
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

            this.status = STATUS.NORMAL;
        },

        __mouseleave: function (evt) {
            //if (this.status !== STATUS.MOUSE_DOWN) {
            //    return;
            //}
            //
            //this.__startOuterScroll();
        },

        __mouseenter: function () {
            //this.__stopOuterScroll();
        }
    };
});