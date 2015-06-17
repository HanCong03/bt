/**
 * @fileOverview
 *
 * 提供颜色支持
 */
define(function (require, exports, module) {
    var MAX = 255;

    module.exports = function (theme, tint) {
        if (tint === 0) {
            return '#' + theme;
        }

        var rgbValue = hexToRgb(theme);
        var hslValue = rgbValueToHslValue(rgbValue.r, rgbValue.g, rgbValue.b);

        hslValue.l = calc(hslValue.l * MAX, tint) / MAX;

        rgbValue = hslValueToRGBValue(hslValue);

        return rgbToHex(rgbValue);
    };

    function calc(lnum, tint) {
        if (tint < 0) {
            return lnum * (1 + tint);
        } else {
            return lnum * (1 - tint) + (MAX - MAX * (1 - tint));
        }
    }

    //内部工具对象
    function hexToRgb(hexStr) {
        var result = {};
        var keys = ['r', 'g', 'b'];
        var hexStr = hexStr.split('');

        keys.forEach(function (key, index) {
            if (hexStr.length === 3) {
                result[key] = toNumber(hexStr[index] + hexStr[index]);
            } else {
                result[key] = toNumber(hexStr[index * 2] + hexStr[index * 2 + 1]);
            }
        });

        return result;
    }

    function rgbToHex(rgbValue) {
        var r = rgbValue.r.toString(16);
        var g = rgbValue.g.toString(16);
        var b = rgbValue.b.toString(16);

        var hex = [
            r.length === 1 ? '0' + r : r,
            g.length === 1 ? '0' + g : g,
            b.length === 1 ? '0' + b : b,
        ];

        return '#' + hex.join('');
    }

    //hsl值对象转换为rgb值对象
    function hslValueToRGBValue(hslValue) {
        function trans(v1, v2, vH) {

            if (vH < 0) {
                vH += 1;
            } else if (vH > 1) {
                vH -= 1;
            }

            if (6 * vH < 1) {
                return v1 + (v2 - v1) * 6 * vH;
            } else if (2 * vH < 1) {
                return v2;
            } else if (3 * vH < 2) {
                return v1 + (v2 - v1) * ((2 / 3 - vH) * 6);
            }

            return v1;
        }

        var q = null,
            p = null,
            result = {};

        var h = hslValue.h / 360;
        var s = hslValue.s;
        var l = hslValue.l;

        //分量计算
        if (s === 0) {
            result.r = result.g = result.b = l;
        } else {
            if (l < 0.5) {
                q = l * (1 + s);
            } else {
                q = l + s - l * s;
            }

            p = 2 * l - q;

            result.r = trans(p, q, h + (1 / 3));
            result.g = trans(p, q, h);
            result.b = trans(p, q, h - (1 / 3));
        }

        result.r = Math.round(Math.min(result.r * MAX, MAX));
        result.g = Math.round(Math.min(result.g * MAX, MAX));
        result.b = Math.round(Math.min(result.b * MAX, MAX));

        return result;
    }

    //rgb值对象转换为hsl值对象
    function rgbValueToHslValue(r, g, b) {
        r = r / 255;
        g = g / 255;
        b = b / 255;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;

        if (max === min) {
            return {
                h: 0,
                s: 0,
                l: max
            };
        }

        var s = delta / (2 - max - min);
        var h;
        var l;

        l = (max + min) / 2;

        if (l < 0.5) {
            s = delta / (max + min);
        } else {
            s = delta / (2 - max - min);
        }

        if (r === max) {
            h = (g - b) / delta;
        }

        if (g === max) {
            h = 2 + (b - r) / delta;
        }

        if (b === max) {
            h = 4 + (r - g) / delta;
        }

        h *= 60;

        if (h < 0) {
            h += 360;
        }

        return {
            h: h,
            s: s,
            l: l
        };
    }

    //16进制的2个数字转化为10进制， 如果转化失败， 返回0
    function toNumber(value) {
        return Number('0x' + value) | 0;
    }
});