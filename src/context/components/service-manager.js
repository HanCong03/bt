/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('ServiceManager', {

        __$services: {
            env: {},
            core: {},
            system: {},
            ext: {}
        },

        constructor: function (ctx) {
            this.__$ctx = ctx;
        },

        register: function (provider, name, handler) {
            this.__register(name, provider, handler);
        },

        request: function (customer, name, args) {
            var type = customer.____$type;
            var service = this.__lookupService(type, name);

            if ($$.isNdef(service)) {
                throw new Error('service not found: ' + name);
            }

            args = [].slice.call(arguments, 2);

            return service.handler.apply(service.provider, args);
        },

        __register: function (name, provider, handler) {
            var type = provider.____$type;
            var pool = this.__$services[type];

            pool[name] = {
                provider: provider,
                handler: handler
            };
        },

        __lookupService: function (type, name) {
            var serives = this.__$services;

            switch (type) {
                case 'ext':
                    if ($$.isDefined(serives[name])) {
                        return serives.ext[name];
                    }

                case 'system':
                    if ($$.isDefined(serives[name])) {
                        return serives.system[name];
                    }

                case 'core':
                    if ($$.isDefined(serives[name])) {
                        return serives.core[name];
                    }

                case 'env':
                    if ($$.isDefined(serives[name])) {
                        return serives.env[name];
                    }

                default:
                    return null;
            }
        }
    });
});