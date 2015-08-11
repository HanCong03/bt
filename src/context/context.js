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
    var ErrorManager = require('./components/error');

    var Workbook = require('./workbook/workbook');

    module.exports = require('utils').createClass('Context', {
        __$rootNode: null,
        __$workbook: null,
        __$components: {},

        constructor: function (node) {
            this.__$rootNode = node;

            this.__boot();
            this.__startup();
            this.__init();
            this.__ready();
        },

        __boot: function () {
            this.__$workbook = new Workbook(this);
            this.__$components = {
                containerManager: new ContainerManager(this),
                moduleManager: new ModuleManager(this),
                serviceManager: new ServiceManager(this),
                messageManager: new MessageMaanager(this),
                eventManager: new EventManager(this),
                commandManager: new CommandManager(this),
                error: new ErrorManager(this)
            };
        },

        __startup: function () {
            this.__$components.moduleManager.startup();
            this.__$components.commandManager.startup();
        },

        __init: function () {
            this.__$components.moduleManager.init();
        },

        __ready: function () {
            this.__$workbook.ready();
            this.emitAll('ready');
        },

        emitAll: function (name) {
            var eventManager = this.__$components.eventManager;
            eventManager.emitAll.apply(eventManager, arguments);
        },

        getRootNode: function () {
            return this.__$rootNode;
        },

        getManager: function (name) {
            return this.__$components[name];
        },

        onError: function (listener) {
            this.__$components.error.listen(listener);
        },

        error: function (key) {
            this.__$components.error.emit(key);
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

        postMessage: function (publisher, topic, args) {
            this.__$components.messageManager.post(publisher, topic, args);
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
        internalExecCommand: function () {
            var commandManager = this.__$components.commandManager;
            return commandManager.execCommand.apply(commandManager, arguments);
        },

        internalQueryCommandValue: function () {
            var commandManager = this.__$components.commandManager;
            return commandManager.queryCommandValue.apply(commandManager, arguments);
        },

        execCommand: function () {
            var commandManager = this.__$components.commandManager;
            return commandManager.anonymousExecCommand.apply(commandManager, arguments);
        },

        queryCommandValue: function () {
            var commandManager = this.__$components.commandManager;
            return commandManager.anonymousQueryCommandValue.apply(commandManager, arguments);
        },
        /* --- 命令 end --- */

        getShadowContainer: function () {
            return this.__$components.containerManager.getShadowContainer();
        },

        getTopContainer: function () {
            return this.__$components.containerManager.getTopContainer();
        },

        getBottomContainer: function () {
            return this.__$components.containerManager.getBottomContainer();
        },

        getMiddleContainer: function () {
            return this.__$components.containerManager.getMiddleContainer();
        },

        getBarContainer: function () {
            return this.__$components.containerManager.getBarContainer();
        },

        getMainContainerSize: function () {
            return this.__$components.containerManager.getMainContainerSize();
        },

        getContentContainerSize: function () {
            return this.__$components.containerManager.getContentContainerSize();
        }
        /* --- 模块接口 end --- */
    });
});
