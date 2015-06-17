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

    module.exports = $$.createClass('MessageManager', {

        __$messages: {
            env: {},
            core: {},
            system: {},
            ext: {}
        },

        constructor: function (ctx) {
            this.__$ctx = ctx;
        },

        on: function (subscriber, topic, handler) {
            this.__subscribe(topic, subscriber, handler);
        },

        post: function (publisher, topic) {
            var type = publisher.____$type;
            var subscribers = this.__lookupSubscriber(type, topic);

            $$.forEach(subscribers, function (current) {
                current.handler.call(current.subscriber);
            });
        },

        __subscribe: function (topic, subscriber, handler) {
            var type = subscriber.____$type;
            var pool = this.__$messages[type];

            if ($$.isNdef(pool[topic])) {
                pool[topic] = [];
            }

            pool[topic].push({
                subscriber: subscriber,
                handler: handler
            });
        },

        __lookupSubscriber: function (type, topic) {
            var messages = this.__$messages;
            var subscribers = [];

            var bit = TYPE_BIT[type];

            switch (true) {
                // env
                case !!(bit & 1):
                    if ($$.isDefined(messages.env[topic])) {
                        subscribers = subscribers.concat(messages.env[topic]);
                    }

                // core
                case !!(bit & 2):
                    if ($$.isDefined(messages.core[topic])) {
                        subscribers = subscribers.concat(messages.core[topic]);
                    }

                // system
                case !!(bit & 4):
                    if ($$.isDefined(messages.system[topic])) {
                        subscribers = subscribers.concat(messages.system[topic]);
                    }

                // ext
                case !!(bit & 8):
                    if ($$.isDefined(messages.ext[topic])) {
                        subscribers = subscribers.concat(messages.ext[topic]);
                    }
            }

            return subscribers;
        }
    });
});