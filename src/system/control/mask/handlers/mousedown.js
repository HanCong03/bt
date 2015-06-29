define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');

    var SystemUtils = require('system/utils/utils');

    var STATUS = require('../../definition/status');

    module.exports = {
        __mousedown: function (evt) {
            this.status = STATUS.MOUSE_DOWN;

            this.start = this.getIndex(evt.clientX, evt.clientY);
            this.end = this.start;

            // control status change
            this.emit('controlstatuschange', this.start, this.end);
        },

        __mousemove: function (evt) {
            if (this.status !== STATUS.MOUSE_DOWN) {
                return;
            }

            this.end = this.getIndex(evt.clientX, evt.clientY);

            this.emit('controlstatuschange', this.start, this.end);
        },

        __mouseup: function (evt) {
            this.status = STATUS.NORMAL;
            this.end = this.getIndex(evt.clientX, evt.clientY);

            this.emit('controlstatuschange', this.start, this.end);
            this.emit('controlcomplete', this.start, this.end);
        },

        __mouseleave: function (evt) {
            if (this.status !== STATUS.MOUSE_DOWN) {
                return;
            }

            this.__startOuterScroll();
        },

        __mouseenter: function () {
            this.__stopOuterScroll();
        }
    };
});