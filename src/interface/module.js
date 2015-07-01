/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Module', {
        __$ctx: null,

        constructor: function (ctx) {
            this.__$ctx = ctx;
        },

        init: function () {},

        createComponent: function (Clazz) {
            return new Clazz(this.__$ctx, this);
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
            return this.__$ctx.getActiveHeap(this);
        },

        getWorkbookHeap: function () {
            return this.__$ctx.getWorkbookHeap(this);
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

        getMainContainer: function () {
            return this.__$ctx.getRootNode();
        },

        getShadowContainer: function () {
            return this.__$ctx.getShadowContainer();
        },

        getTopContainer: function () {
            return this.__$ctx.getTopContainer();
        },

        getMiddleContainer: function () {
            return this.__$ctx.getMiddleContainer();
        },

        getBottomContainer: function () {
            return this.__$ctx.getBottomContainer();
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