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
            return new Clazz(this.__$ctx);
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
            this.__$ctx.postMessage(this, topic);
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

        execCommand: function () {
            return this.__$ctx.execCommand.apply(this.__$ctx, arguments);
        },

        queryCommandValue: function () {
            return this.__$ctx.queryCommandValue.apply(this.__$ctx, arguments);
        },

        getShadowContainer: function () {
            return this.__$ctx.getShadowContainer();
        }
    });
});