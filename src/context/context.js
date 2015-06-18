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
    var CommandManager = require('./components/command-manager');

    var Workbook = require('./workbook/workbook');

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
                eventManager: new EventManager(this),
                commandManager: new CommandManager(this)
            };
        },

        __startup: function () {
            this.__$components.moduleManager.startup();
            this.__$components.commandManager.startup();
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

        getManager: function (name) {
            return this.__$components[name];
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

        getAPI: function () {
            return this.__$workbook.getAPI();
        },

        getActiveHeap: function (module) {
            return this.__$workbook.getActiveHeap(module);
        },

        getWorkbookHeap: function (module) {
            return this.__$workbook.getWorkbookHeap(module);
        },

        /* --- 命令 start --- */
        execCommand: function () {
            var commandManager = this.__$components.commandManager;
            return commandManager.execCommand.apply(commandManager, arguments);
        },

        queryCommandValue: function () {
            var commandManager = this.__$components.commandManager;
            return commandManager.queryCommandValue.apply(commandManager, arguments);
        },
        /* --- 命令 end --- */

        getShadowContainer: function () {
            return this.__$components.containerManager.getShadowContainer();
        }
        /* --- 模块接口 end --- */
    });
});
