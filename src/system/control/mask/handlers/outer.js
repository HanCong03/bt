define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');

    var STATUS = require('../../definition/status');

    module.exports = {
        __startOuterScroll: function (evt) {
            this.__listenDocument();
        },

        __stopOuterScroll: function () {
            console.log('enter');

            //this.__endOuterScroll();
        },

        __listenDocument: function () {
            var _self = this;
            var $doc = $(this.container.ownerDocument);

            $doc.on('mousemove mouseup', function (evt) {
                evt.preventDefault();
                evt.stopPropagation();

                var cellIndex = this.getIndex(evt.clientX, evt.clientY);

                _self.last = cellIndex;

                if (evt.type === 'mouseup') {
                    _self.status = STATUS.NORMAL;
                    _self.__stopOuterScroll();
                }
            });
        }
    };
});