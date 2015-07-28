/**
 * @file 提供名称定义服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Name', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        defineName: function (name, ref, refSheet, scope, comment) {
            return this.__$api.defineName(name, ref, refSheet, scope, comment);
        },

        getNameDefine: function (name) {
            return this.__$api.getNameDefine(name);
        },

        getName: function (name, scope) {
            return this.__$api.getNameDefine(name, scope);
        }
    });
});