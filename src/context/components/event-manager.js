/**
 * @file 异步消息管理器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    var TYPE_BIT = {
        env: 1,
        core: 3,
        system: 7,
        ext: 15
    };

    module.exports = $$.createClass('EventManager', {

        __$events: {
            env: {},
            core: {},
            system: {},
            ext: {}
        },

        constructor: function (ctx) {
            this.__$ctx = ctx;
        },

        on: function (listener, name, handler) {
            this.__listen(name, listener, handler);
        },

        emit: function (publisher, name) {
            var type = publisher.____$type;
            var listeners = this.__lookupListener(type, name);

            var args = [].slice.call(arguments, 2);

            $$.forEach(listeners, function (current) {
                current.handler.apply(current.listener, args);
            });
        },

        __listen: function (name, listener, handler) {
            var type = listener.____$type;
            var pool = this.__$events[type];

            if ($$.isNdef(pool[name])) {
                pool[name] = [];
            }

            pool[name].push({
                listener: listener,
                handler: handler
            });
        },

        __lookupListener: function (type, name) {
            var events = this.__$events;
            var listeners = [];

            var bit = TYPE_BIT[type];

            switch (true) {
                // env
                case bit & 1:
                    if ($$.isDefined(events.env[name])) {
                        listeners = listeners.concat(events.env[name]);
                    }

                // core
                case bit & 2:
                    if ($$.isDefined(events.core[name])) {
                        listeners = listeners.concat(events.core[name]);
                    }

                // system
                case bit & 4:
                    if ($$.isDefined(events.system[name])) {
                        listeners = listeners.concat(events.system[name]);
                    }

                // ext
                case bit & 8:
                    if ($$.isDefined(events.ext[name])) {
                        listeners = listeners.concat(events.ext[name]);
                    }
            }

            return listeners;
        }
    });
});