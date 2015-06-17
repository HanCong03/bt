/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('ContainerManager', {
        __$ctx: null,
        __rootNode: null,

        shadow: null,

        constructor: function (ctx) {
            this.__$ctx = ctx;
            this.__rootNode = ctx.getRootNode();

            this.__initShadowContainer();
        },

        __initShadowContainer: function () {
            this.shadow = document.createElement('div');
            this.__rootNode.appendChild(this.shadow);
        },

        getShadowContainer: function () {
            return this.shadow;
        }
    });
});