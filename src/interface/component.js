/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Component', {
        ____$ctx: null,

        constructor: function (ctx) {
            this.____$ctx = ctx;
            this.init();
        },

        init: function () {},

        createComponent: function (Clazz) {
            return new Clazz(this.____$ctx);
        },

        registerService: function (name, handler) {
            if ($$.isNdef(handler)) {
                for (var key in name) {
                    if (!name.hasOwnProperty(key)) {
                        continue;
                    }

                    this.____$ctx.registerService(this, key, name[key]);
                }
            } else {
                this.____$ctx.registerService(this, name, handler);
            }
        },

        rs: function () {
            var args = [].slice.call(arguments, 0);
            args.unshift(this);

            return this.____$ctx.rs.apply(this.____$ctx, args);
        },

        onMessage: function (topic, handler) {
            if ($$.isNdef(handler)) {
                for (var key in topic) {
                    if (!topic.hasOwnProperty(key)) {
                        continue;
                    }

                    this.____$ctx.onMessage(this, key, topic[key]);
                }
            } else {
                this.____$ctx.onMessage(this, topic, handler);
            }
        },

        postMessage: function (topic) {
            this.____$ctx.postMessage(this, topic);
        },

        on: function (name, handler) {
            if ($$.isNdef(handler)) {
                for (var key in name) {
                    if (!name.hasOwnProperty(key)) {
                        continue;
                    }

                    this.____$ctx.on(this, key, name[key]);
                }
            } else {
                this.____$ctx.on(this, name, handler);
            }
        },

        emit: function () {
            var args = [].slice.call(arguments, 0);
            args.unshift(this);

            this.____$ctx.emit.apply(this.____$ctx, args);
        }
    });
});