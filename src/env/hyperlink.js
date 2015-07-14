/**
 * @file 提供超链接存取服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Hyperlink', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
            this.__initService();
        },

        __initService: function () {
            this.registerService({
                'set.hyperlink': this.setHyperlink,
                'clear.hyperlink': this.clearHyperlink,
                'get.hyperlink': this.getHyperlink
            });
        },

        setHyperlink: function (link, row, col) {
            this.__$api.setHyperlink(link, row, col);
        },

        clearHyperlink: function (start, end) {
            this.__$api.clearHyperlink(start, end);
        },

        getHyperlink: function (row, col) {
            return this.__$api.getHyperlink(row, col);
        }
    });
});