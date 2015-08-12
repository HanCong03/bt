/**
 * @file 数据加载器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Loader', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        load: function (data) {
            this.__$api.load(data);
        }
    });
});