/**
 * @file BTbale client context
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var ModuleManager = require('./components/module-manager');
    var ServiceManager = require('./components/service-manager');
    var MessageMaanager = require('./components/message-manager');
    var EventManager = require('./components/event-manager');

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
                moduleManager: new ModuleManager(this),
                serviceManager: new ServiceManager(this),
                messageManager: new MessageMaanager(this),
                eventManager: new EventManager(this)
            };
        },

        __startup: function () {
            this.__$components.moduleManager.startup();
        },

        __ready: function () {
            console.log('ready')
        },

        registerService: function (provider, name, handler) {
            this.__$components.serviceManager.register(provider, name, handler);
        },

        rs: function () {
            var serviceManager = this.__$components.serviceManager;
            return serviceManager.rs.apply(serviceManager, arguments);
        },

        onMessage: function (subscriber, topic, handler) {
            this.__$components.messageManager.on(subscriber, topic, handler);
        },

        postMessage: function (publisher, topic) {
            this.__$components.messageManager.post(publisher, topic);
        },

        on: function (listener, name, handler) {
            this.__$components.eventManager.on(listener, name, handler);
        },

        emit: function () {
            var eventManager = this.__$components.eventManager;
            eventManager.emit.apply(eventManager, arguments);
        }
    });
});
