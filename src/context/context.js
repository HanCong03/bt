/**
 * @file BTbale client context
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var ModuleManager = require('./components/module-manager');
    var ServiceManager = require('./components/service-manager');
    var MessageMaanager = require('./components/message-manager');
    var EventManager = require('./components/event-manager');
    var ContainerManager = require('./components/container-manager');

    var Workbook = require('./workbook');

    module.exports = require('utils').createClass('Context', {

        __$rootNode: null,
        __$workbook: null,
        __$components: {},

        constructor: function (node) {
            this.__$rootNode = node;

            this.__boot();
            this.__init();
            this.__startup();
            this.__ready();
        },

        __boot: function () {
            this.__$workbook = new Workbook(this);
        },

        __init: function () {
            this.__$components = {
                containerManager: new ContainerManager(this),
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
            this.emitAll('ready');
        },

        emitAll: function (name) {
            this.__$components.eventManager.emitAll(name);
        },

        getRootNode: function () {
            return this.__$rootNode;
        },

        /* --- 模块接口 start --- */
        registerService: function (provider, name, handler) {
            this.__$components.serviceManager.register(provider, name, handler);
        },

        rs: function () {
            var serviceManager = this.__$components.serviceManager;
            return serviceManager.request.apply(serviceManager, arguments);
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
        },

        getActiveHeap: function (module) {
            return this.__$workbook.getActiveHeap(module);
        },

        execCommand: function () {
            return this.__$workbook.execCommand.apply(this.__$workbook, arguments);
        },

        queryCommandValue: function () {
            return this.__$workbook.queryCommandValue.apply(this.__$workbook, arguments);
        },

        getShadowContainer: function () {
            return this.__$components.containerManager.getShadowContainer();
        }
        /* --- 模块接口 end --- */
    });
});
