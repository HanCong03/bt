/**
 * @file 提供超链接存取服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Selection', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
            this.__initService();
        },

        __initService: function () {
            this.registerService({
                'set.range': this.setRange,
                'add.range': this.addRange,
                'update.range': this.updateRange,
                'update.focus': this.updateFocus,
                'up.range': this.upRange,
                'down.range': this.downRange,
                'get.active.range': this.getActiveRange,
                'get.ranges': this.getRanges
            });
        },

        setRange: function (start, end, entry) {
            return this.__$api.setRange(start, end, entry);
        },

        addRange: function (start, end, entry) {
            return this.__$api.addRange(start, end, entry);
        },

        updateRange: function (start, end, entry) {
            return this.__$api.updateRange(start, end, entry);
        },

        updateFocus: function (row, col) {
            return this.__$api.updateFocus(row, col);
        },

        upRange: function () {
            return this.__$api.upRange();
        },

        downRange: function () {
            return this.__$api.downRange();
        },

        getActiveRange: function () {
            return this.__$api.getActiveRange();
        },

        getRanges: function () {
            return this.__$api.getRanges();
        }
    });
});