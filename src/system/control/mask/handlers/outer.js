define(function (require, exports, module) {
    var STATUS = require('../../definition/status');

    module.exports = {
        __timer: null,

        __outerProcess: function (index) {
            console.log('处理')
            // 未发生改变，则由交由循环处理器处理
            if (this.end.row === index.row && this.end.col === index.col) {
                return;
            }

            switch (this.status) {
                case STATUS.CELL:
                    this.end = index;
                    this.emit('control.outer.cell.select', this.start, this.end);
                    break;

                case STATUS.ROW:
                    // 行未发生变化
                    if (this.end.row === index.row) {
                        this.end = index;
                        return;
                    }

                    this.end = index;
                    this.emit('control.outer.row.select', this.start.row, this.end.row);
                    break;

                case STATUS.COLUMN:
                    // 列未发生变化
                    if (this.end.col === index.col) {
                        this.end = index;
                        return;
                    }

                    this.end = index;
                    this.emit('control.outer.column.select', this.start.col, this.end.col);
                    break;
            }
        },

        __stopOuterProcess: function () {
            console.log('stop')
        },

        __stopOuterScroll: function () {
            clearInterval(this.__timer);
            this.__timer = null;

            $(this.container.ownerDocument).off('mousemove.btable mouseup.btable');
        },

        __listenDocument: function () {
            var _self = this;
            var $doc = $(this.container.ownerDocument);

            this.__timer = setInterval(function () {
                _self.__scroll();
            }, 100);

            $doc.on('mousemove.btable mouseup.btable', function (evt) {
                evt.preventDefault();
                evt.stopPropagation();

                _self.end = _self.getIndex(evt.clientX, evt.clientY);;

                if (evt.type === 'mouseup') {
                    _self.status = STATUS.NORMAL;
                    _self.__stopOuterScroll();
                }
            });
        },

        __scroll: function () {
            this.emit('outercontrolstatuschange', this.start, this.end);
        }
    };
});