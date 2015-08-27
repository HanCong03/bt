/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Exporter', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        export: function () {
            return this.__$api.export();
        }
    });
});