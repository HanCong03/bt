/**
 * @file 系统内部服务，为渲染提供必要信息的特殊模块
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('RenderInfo', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        getRenderInfo: function (rows, cols) {
            return this.__$api.getRenderInfo(rows, cols);
        }
    });
});