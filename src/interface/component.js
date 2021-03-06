/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Component', {
        __$ctx: null,
        __$module: null,

        constructor: function (ctx, module) {
            this.__$ctx = ctx;
            this.____$type = module.____$type;
            this.__$module = module;

            this.init();
        },

        init: function () {},

        createComponent: function (Clazz) {
            return new Clazz(this.__$ctx, this.__$module);
        },

        registerService: function (name, handler) {
            if ($$.isNdef(handler)) {
                for (var key in name) {
                    if (!name.hasOwnProperty(key)) {
                        continue;
                    }

                    this.__$ctx.registerService(this, key, name[key]);
                }
            } else {
                this.__$ctx.registerService(this, name, handler);
            }
        },

        rs: function () {
            var args = [].slice.call(arguments, 0);
            args.unshift(this);

            return this.__$ctx.rs.apply(this.__$ctx, args);
        },

        error: function (key) {
            this.__$ctx.error(key);
        },

        onMessage: function (topic, handler) {
            if ($$.isNdef(handler)) {
                for (var key in topic) {
                    if (!topic.hasOwnProperty(key)) {
                        continue;
                    }

                    this.__$ctx.onMessage(this, key, topic[key]);
                }
            } else {
                this.__$ctx.onMessage(this, topic, handler);
            }
        },

        postMessage: function (topic) {
            var args = [].slice.call(arguments, 1);
            this.__$ctx.postMessage(this, topic, args);
        },

        on: function (name, handler) {
            if ($$.isNdef(handler)) {
                for (var key in name) {
                    if (!name.hasOwnProperty(key)) {
                        continue;
                    }

                    this.__$ctx.on(this, key, name[key]);
                }
            } else {
                this.__$ctx.on(this, name, handler);
            }
        },

        emit: function () {
            var args = [].slice.call(arguments, 0);
            args.unshift(this);

            this.__$ctx.emit.apply(this.__$ctx, args);
        },

        getActiveHeap: function () {
            return this.__$module.getActiveHeap();
        },

        getWorkbookHeap: function () {
            return this.__$module.getWorkbookHeap();
        },

        getDeviceZoom: function () {
            return this.__$ctx.getDeviceZoom();
        },

        execCommand: function () {
            var args = [].slice.call(arguments, 0);
            args.unshift(this);

            return this.__$ctx.internalExecCommand.apply(this.__$ctx, args);
        },

        queryCommandValue: function () {
            var args = [].slice.call(arguments, 0);
            args.unshift(this);

            return this.__$ctx.internalQueryCommandValue.apply(this.__$ctx, args);
        },

        getShadowContainer: function () {
            return this.__$ctx.getShadowContainer();
        },

        getMainContainer: function () {
            return this.__$ctx.getRootNode();
        },

        getTopContainer: function () {
            return this.__$ctx.getTopContainer();
        },

        getMiddleContainer: function () {
            return this.__$ctx.getMiddleContainer();
        },

        getBottoMContainer: function () {
            return this.__$ctx.getBottoMContainer();
        },

        getBarContainer: function () {
            return this.__$ctx.getBarContainer();
        },

        getMainContainerSize: function () {
            return this.__$ctx.getMainContainerSize();
        },

        getContentContainerSize: function () {
            return this.__$ctx.getContentContainerSize();
        }
    });
});