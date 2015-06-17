/**
 * @file BTbale client context
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var ModuleManager = require('./components/module-manager');

    module.exports = require('utils').createClass('Context', {

        __$components: {},

        constructor: function () {
            this.__boot();
            this.__init();
            this.__startup();
            this.__ready();
        },

        __boot: function () {},

        __init: function () {
            this.__$components = {
                moduleManager: new ModuleManager(this)
            };
        },

        __startup: function () {
            this.__$components.moduleManager.startup();
        },

        __ready: function () {
            console.log('ready')
        }
    });
});
