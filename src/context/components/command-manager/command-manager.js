/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var COMMANDS = require('commands');
    var Converter = require('./converter');
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

        __$ctx: null,
        __converter: null,
        __lock: 0,

        constructor: function (ctx) {
            this.__$ctx = ctx;
            this.__converter = new Converter(ctx);
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

        lock: function () {
            this.__lock++;
        },

        unlock: function () {
            this.__lock--;
        },

        trigger: function () {
            if (this.__lock !== 0) {
                return;
            }

            this.__$ctx.getManager('eventManager').emitAll('datachange');
        },

        execCommand: function (customer, commandName) {
            var command = this.__lookupExecCommand(customer.____$type, commandName);

            if (!command) {
                throw new Error('command is not found: ' + commandName);
            }

            var args = [].slice.call(arguments, 2);

            this.lock();

            var result = command.command.apply(command.provider, args);

            this.unlock();

            this.trigger();

            return result;
        },

        // 匿名调用(外部调用)
        anonymousExecCommand: function (commandName) {
            var command = this.__lookupExecCommand('ext', commandName);

            if (!command) {
                throw new Error('command is not found: ' + commandName);
            }

            var args = this.__converter.getArguments(command, [].slice.call(arguments, 1));

            this.lock();

            var result = command.command.apply(command.provider, args);

            this.unlock();

            this.trigger();

            return result;
        },

        queryCommandValue: function (customer, commandName) {
            var command = this.__lookupQueryCommand(customer.____$type, commandName);

            if (!command) {
                throw new Error('command is not found: ' + commandName);
            }

            var args = [].slice.call(arguments, 2);

            return command.command.apply(command.provider, args);
        },

        anonymousQueryCommandValue: function (commandName) {
            var command = this.__lookupQueryCommand('ext', commandName);

            if (!command) {
                throw new Error('command is not found: ' + commandName);
            }

            var args = this.__converter.getArguments(command, [].slice.call(arguments, 1));

            return command.command.apply(command.provider, args);
        },

        registerExecCommand: function (name, provider, handler) {
            var pool = this.__$commands.exec['ext'];

            pool[name] = {
                provider: provider,
                command: handler,
                args_processor: null
            };
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
            var command = new CommandClass(this.__$ctx);

            // 依赖管理
            var dep = this.__lookupModule(type, command.$dep);

            if ($$.isNdef(dep)) {
                throw new Error('module not found: ' + command.$dep);
            }

            command.$dep = dep;

            var queryPool = this.__$commands.query[type];
            var execPool = this.__$commands.exec[type];

            var commandSet = command.commands;

            for (var name in commandSet) {
                if (!commandSet.hasOwnProperty(name)) {
                    continue;
                }

                if (commandSet[name].exec) {
                    execPool[name] = {
                        provider: command,
                        command: commandSet[name].exec,
                        args_processor: commandSet[name].exec_arguments || null
                    };
                }

                if (commandSet[name].query) {
                    queryPool[name] = {
                        provider: command,
                        command: commandSet[name].query,
                        args_processor: commandSet[name].query_arguments || null
                    };
                }
            }
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