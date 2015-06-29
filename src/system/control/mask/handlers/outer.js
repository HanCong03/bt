define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');

    var STATUS = require('../../definition/status');

    module.exports = {
        __timer: null,

        __startOuterScroll: function (evt) {
            this.__listenDocument();
        },

        __stopOuterScroll: function () {
            console.log('enter');

            clearInterval(this.__timer);
            this.__timer = null;

            $(this.container.ownerDocument).off('mousemove.btable mouseup.btable');
        },

        __listenDocument: function () {
            var _self = this;
            var $doc = $(this.container.ownerDocument);

            this.__timer = setInterval(function () {
                _self.__scroll();
            }, 50);

            $doc.on('mousemove mouseup', function (evt) {
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
            this.emit('controlstatuschange', this.start, this.end);
        }
    };
});