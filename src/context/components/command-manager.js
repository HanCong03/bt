/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var COMMANDS = require('commands');
    var $$ = require('utils');

    module.exports = $$.createClass('CommandManager', {
        __$commands: {
            exec: {
                env: {},
                core: {},
                system: {},
                ext: {}
            },
            query: {
                env: {},
                core: {},
                system: {},
                ext: {}
            }
        },

        constructor: function (ctx) {
            this.__$ctx = ctx;
        },

        startup: function () {
            this.scan();
        },

        scan: function () {
            this.__scan('env');
            this.__scan('core');
            this.__scan('system');
            this.__scan('ext');
        },

        execCommand: function (customer, commandName) {
            var command = this.__lookupExecCommand(customer.____$type, commandName);

            if (!command) {
                throw new Error('command is not found: ' + commandName);
            }

            var args = [].slice.call(arguments, 2);

            if (!command.handler) {
                return command.provider['exec'].call(command.provider, commandName, args);
            } else {
                return command.handler.apply(command.provider, args);
            }
        },

        // 匿名调用
        anonymousExecCommand: function (commandName) {
            var command = this.__lookupExecCommand('ext', commandName);

            if (!command) {
                throw new Error('command is not found: ' + commandName);
            }

            var args = [].slice.call(arguments, 1);

            if (!command.handler) {
                return command.provider['exec'].call(command.provider, commandName, args);
            } else {
                return command.handler.apply(command.provider, args);
            }
        },

        queryCommandValue: function (customer, commandName) {
            var command = this.__lookupQueryCommand(customer.____$type, commandName);

            if (!command) {
                throw new Error('command is not found: ' + commandName);
            }

            var args = [].slice.call(arguments, 2);

            if (!command.handler) {
                return command.provider['query'].call(command.provider, commandName, args);
            } else {
                return command.handler.apply(command.provider, args);
            }
        },

        anonymousQueryCommandValue: function (commandName) {
            var command = this.__lookupQueryCommand('ext', commandName);

            if (!command) {
                throw new Error('command is not found: ' + commandName);
            }

            var args = [].slice.call(arguments, 1);

            if (!command.handler) {
                return command.provider['query'].call(command.provider, commandName, args);
            } else {
                return command.handler.apply(command.provider, args);
            }
        },

        __scan: function (type) {
            var commands = COMMANDS[type];

            for (var key in commands) {
                if (!commands.hasOwnProperty(key)) {
                    continue;
                }

                this.__mountCommand(type, commands[key]);
            }
        },

        __mountCommand: function (type, CommandClass) {
            var command = new CommandClass();

            // 依赖管理
            var dep = this.__lookupModule(type, command.$dep);

            if ($$.isNdef(dep)) {
                throw new Error('module not found: ' + command.$dep);
            }

            command.$dep = dep;

            // 挂载
            this.__mountQueryCommand(type, command);
            this.__mountExecCommand(type, command);
        },

        __mountQueryCommand: function (type, provider) {
            if ($$.isNdef(provider.$query)) {
                return;
            }

            var pool = this.__$commands.query[type];

            $$.forEach(provider.$query, function (name) {
                pool[name] = {
                    provider: provider,
                    handler: provider['query_' + name]
                }
            });
        },

        __mountExecCommand: function (type, provider) {
            if ($$.isNdef(provider.$exec)) {
                return;
            }

            var pool = this.__$commands.exec[type];

            $$.forEach(provider.$exec, function (name) {
                pool[name] = {
                    provider: provider,
                    handler: provider['exec_' + name]
                }
            });
        },

        __lookupModule: function (type, moduleName) {
            var moduleManager = this.__$ctx.getManager('moduleManager');
            return moduleManager.lookup(type, moduleName);
        },

        __lookupExecCommand: function (type, commandName) {
            return this.__lookupCommand(type, this.__$commands.exec, commandName);
        },

        __lookupQueryCommand: function (type, commandName) {
            return this.__lookupCommand(type, this.__$commands.query, commandName);
        },

        __lookupCommand: function (type, pool, commandName) {
            switch (type) {
                case 'ext':
                    if (pool['ext'][commandName]) {
                        return pool['ext'][commandName]
                    }

                case 'system':
                    if (pool['system'][commandName]) {
                        return pool['system'][commandName]
                    }

                case 'core':
                    if (pool['core'][commandName]) {
                        return pool['core'][commandName]
                    }

                case 'env':
                    if (pool['env'][commandName]) {
                        return pool['env'][commandName]
                    }
            }

            return null;
        },

        __lookupBasicExecCommand: function (commandName) {
            var pool = this.__$commands.exec['basic'];
            return pool[commandName];
        },

        __lookupBasicQueryCommand: function (commandName) {
            var pool = this.__$commands.query['basic'];
            return pool[commandName];
        }
    });
});