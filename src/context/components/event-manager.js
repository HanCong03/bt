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

        __dataReady: false,

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
            this.__listen(name, listener.____$type, listener, handler);
        },

        addOuterListener: function (listener, name, handler) {
            this.__listen(name, 'ext', listener, handler);
        },

        emitAll: function (name) {
            var args = [].slice.call(arguments, 1);
            this.__emit('env', name, args);
        },

        emit: function (publisher, name) {
            var type = publisher.____$type;
            var args = [].slice.call(arguments, 2);

            this.__emit(type, name, args);
        },

        __emit: function (type, name, args) {
            if (name === 'ready' || name === 'beforedataready') {
                var listeners = this.__lookupListener(type, name);

                $$.forEach(listeners, function (current) {
                    current.handler.apply(current.listener, args);
                });

                return;
            }

            if (name === 'dataready') {
                this.__dataReady = true;
            }

            if (!this.__dataReady) {
                return;
            }

            var listeners = this.__lookupListener(type, name);

            $$.forEach(listeners, function (current) {
                current.handler.apply(current.listener, args);
            });
        },

        __listen: function (name, type, listener, handler) {
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
                case (bit & 1) !== 0:
                    if ($$.isDefined(events.env[name])) {
                        listeners = listeners.concat(events.env[name]);
                    }

                // core
                case (bit & 2) !== 0:
                    if ($$.isDefined(events.core[name])) {
                        listeners = listeners.concat(events.core[name]);
                    }

                // system
                case (bit & 4) !== 0:
                    if ($$.isDefined(events.system[name])) {
                        listeners = listeners.concat(events.system[name]);
                    }

                // ext
                case (bit & 8) !== 0:
                    if ($$.isDefined(events.ext[name])) {
                        listeners = listeners.concat(events.ext[name]);
                    }
            }

            return listeners;
        }
    });
});