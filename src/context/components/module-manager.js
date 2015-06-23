/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var MODULES = require('modules');
    var $$ = require('utils');

    module.exports = $$.createClass('ModuleManager', {
        __$modules: {
            env: {},
            core: {},
            system: {},
            ext: {}
        },

        __$ctx: null,

        __$mid: 0,

        constructor: function (ctx) {
            this.__$ctx = ctx;
        },

        startup: function () {
            this.__startup('env');
            this.__startup('core');
            this.__startup('system');
            this.__startup('ext');
        },

        init: function () {
            this.__initModule('env');
            this.__initModule('core');
            this.__initModule('system');
            this.__initModule('ext');
        },

        lookup: function (type, name) {
            return this.__$modules[type][name];
        },

        __startup: function (type) {
            var moduels = MODULES[type];
            var pool = this.__$modules[type];
            var moduleMap = [];
            var ModuleClass;
            var module;

            // 加载模块
            for (var name in moduels) {
                if (!moduels.hasOwnProperty(name)) {
                    continue;
                }

                ModuleClass = moduels[name];

                module = this.__load(ModuleClass);
                module.____$type = type;
                pool[name] = module;

                moduleMap.push({
                    name: name,
                    deps: ModuleClass.deps
                });
            }

            // 解决依赖
            $$.forEach(moduleMap, function (module) {
                if (!module.deps) {
                    return;
                }

                $$.forEach(module.deps, function (dep) {
                    if ($$.isNdef(pool[dep])) {
                        throw new Error('dependence not found: ' + dep);
                    }

                    module['$' + dep] = pool[dep];
                });
            });
        },

        __initModule: function (type) {
            var pool = this.__$modules[type];

            for (var key in pool) {
                if (!pool.hasOwnProperty(key)) {
                    continue;
                }

                pool[key].init();
            }
        },

        __load: function (ModuleClass) {
            var module = new ModuleClass(this.__$ctx);
            this.__$mid += 1;
            module.__$mid = this.__$mid;

            return module;
        }
    });
});