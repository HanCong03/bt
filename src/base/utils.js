/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var clazz = require('./clazz');
    var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    var Utils = {
        createClass: function () {
            return clazz.create.apply(clazz, arguments);
        },

        clone: function (v) {
            if (v === undefined || v === null) {
                return v;
            }

            return JSON.parse(JSON.stringify(v));
        },

        extend: function (target) {
            var args = arguments;

            for (var i = 1, len = args.length; i < len; i++) {
                $.extend(target, args[i]);
            }

            return Utils.clone(target);
        },

        isDefined: function (v) {
            return v !== undefined && v !== null;
        },

        isAllDefined: function () {
            var args = arguments;
            var v;

            for (var i = 0, len = args.length; i < len; i++) {
                v = args[i];

                if (v === undefined || v === null) {
                    return false;
                }
            }

            return true;
        },

        isNdef: function (v) {
            return v === undefined || v === null;
        },

        isEmpty: function (obj) {
            return Object.keys(obj).length === 0;
        },

        /**
         * 判断给定的对象是否仅有一个给定的key。
         * @param obj
         * @param key
         * @returns {boolean}
         */
        only: function (obj, key) {
            return Object.keys(obj).join(' ') === key;
        },

        iterator: function (start, end, callback, thisObject) {
            var cb = callback;

            if (thisObject) {
                cb = function () {
                    return callback.apply(thisObject, arguments);
                };
            }

            for (var i = start.row, limit = end.row; i <= limit; i++) {
                for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                    if (cb(i, j) === false) {
                        return;
                    }
                }
            }
        },

        forEach: function (arr, cb, thisObject) {
            var keys = Object.keys(arr);
            thisObject = thisObject || null;

            for (var i = 0, len = keys.length; i < len; i++) {
                if (cb.call(thisObject, arr[keys[i]], +keys[i], arr) === false) {
                    break;
                }
            }
        },

        tpl: function (str, data) {
            return str.replace(/\$\{([^\}]+)\}/g, function (match, key) {
                if (data[key] !== undefined) {
                    return data[key];
                }

                return '';
            });
        },

        getRect: function (node) {
            return node.getBoundingClientRect();
        },

        indexToTitle: function (index) {
            var chars = [];

            do {
                chars.push(index % 26);
                index = (index / 26) | 0;
            } while (index !== 0);

            for (var i = 0, len = chars.length; i < len; i++) {
                chars[i] = CHARS[chars[i]];
            }

            return chars.reverse().join('');
        },

        calcThemeColor: require('./color/color')
    };

    module.exports = Utils;
});