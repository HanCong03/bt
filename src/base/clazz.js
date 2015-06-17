define(function (require) {
    var extend = require("./kit/extend");
    var NAME_INDEX = 0;

    /**
     * 创建一个类
     * @param className 类名
     * @param defines 类定义
     * @returns {*} 根据类定义创建的构造器
     */
    function createClass(className) {
        var defines = arguments[1];

        if (!defines) {
            defines = className;
            className = getClassName();
        }


        var constructor = getConstructor(defines);
        constructor = inherit(className, constructor, defines);
        return constructor;
    }

    function getClassName() {
        return '__custom__' + NAME_INDEX++;
    }

    function getConstructor(defines) {
        return defines.hasOwnProperty('constructor') ? defines.constructor : getDefaultConstructor();
    }

    function inherit(className, clazz, defines) {
        var Base = defines.base || getDefaultBaseClass(),
            InheritBaseClass = getInheritClass(Base),
            clazzChain = new InheritBaseClass(),
            baseFields = Base.prototype.___fields,
            currentFields = getFields(defines);

        for (var key in clazzChain) {
            if (!isOwnerFunction(key, clazzChain)) {
                delete clazzChain[key];
            }
        }

        // 方法继承
        for (var key in defines) {
            if (!defines.hasOwnProperty(key)) {
                continue;
            }

            if (key === 'mixin') {
                if (({}).toString.call(defines[key]) === '[object Array]') {
                    for (var i = 0, len = defines[key].length; i < len; i++) {
                        for (var mixinKey in defines[key][i]) {
                            if (!defines[key][i].hasOwnProperty([mixinKey])) {
                                continue;
                            }

                            clazzChain[mixinKey] = defines[key][i][mixinKey];
                        }
                    }

                } else {
                    for (var mixinKey in defines[key]) {
                        if (!defines[key].hasOwnProperty([mixinKey])) {
                            continue;
                        }

                        clazzChain[mixinKey] = defines[key][mixinKey];
                    }
                }
            } else {
                // 如果原型链中已经存在同名方法, 则覆盖并记录
                if (isFunction(clazzChain[key])) {
                    defines[key].___super = clazzChain[key];
                }

                clazzChain[key] = defines[key];
            }
        }

        currentFields = extend({}, baseFields, currentFields);

        clazzChain.___fields = currentFields;
        clazzChain.constructor = clazz;
        clazzChain.___className = className;

        WrapperClass.___isConstructor = true;
        WrapperClass.prototype = clazzChain;
        WrapperClass.___baseClass = Base;
        WrapperClass.___className = className;

        clazz.prototype = clazzChain;
        clazz.___baseClass = Base;
        clazz.___className = className;

        function WrapperClass() {
            this.___callBase.apply(this, arguments);
            clazz.apply(this, arguments);
        }

        return WrapperClass;
    }

    /**
     * 获取继承链中的父类的代理类
     */
    function getInheritClass(baseClass) {

        function InheritBaseClass() {
        }

        InheritBaseClass.prototype = baseClass.prototype;

        return InheritBaseClass;

    }

    // 获取默认构造函数, 有别于getDefaultBaseClass
    function getDefaultConstructor() {

        function DefaultConstructor() {
        };
        DefaultConstructor.prototype = ObjectClass.prototype;
        DefaultConstructor.prototype.constructor = DefaultConstructor;

        return DefaultConstructor;

    }

    // 防止根继承时, 获取到同一个构造函数
    function getDefaultBaseClass() {

        function RootClass() {
            this.___initField();
            this.___callBase();
        }

        RootClass.prototype = ObjectClass.prototype;
        RootClass.prototype.constructor = RootClass;
        RootClass.___isConstructor = true;
        RootClass.___className = 'RootClass' + ( +new Date() );

        return RootClass;

    }

    function isOwnerFunction(key, obj) {
        if (!obj.hasOwnProperty(key)) {
            return false;
        }

        if (typeof obj[key] !== "function") {
            return false;
        }

        return true;
    }

    function isFunction(target) {
        return typeof target === "function";
    }

    function getFields(defines) {
        var fields = {};

        for (var key in defines) {
            if (defines.hasOwnProperty(key) && key !== 'mixin' && typeof defines[key] !== "function") {
                fields[key] = defines[key];
                delete defines[key];
            }
        }

        return fields;
    }

    /*---------------- 基础类定义*/
    function ObjectClass() {
        this.___initField();
        this.___callBase();
    }

    $.extend(ObjectClass.prototype, {
        /**
         * 不允许访问
         */
        ___fields: {},

        /**
         * 不允许手动调用
         * @private
         */
        ___callBase: function () {
            var constructor = arguments.callee.caller;
            if (constructor.___baseClass) {
                constructor.___baseClass.apply(this, arguments);
            }
        },

        /**
         * 不允许手动调用
         * @private
         */
        ___initField: function () {
            var fields = this.___fields;

            extend(this, fields);
        },

        /**
         * 方法中可以调用,构造器中禁止调用该方法
         * 调用该方法可以invoke 父类的同名方法, 以实现继承super功能
         */
        callBase: function () {
            var method = arguments.callee.caller;

            if (method.___super) {
                method.___super.apply(this, arguments);
            }
        }

    });

    return {
        create: createClass
    }

});