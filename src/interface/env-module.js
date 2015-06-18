/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('EnvModule', {

        base: require('module'),

        getAPI: function () {
            return this.__$ctx.getAPI();
        }
    });
});