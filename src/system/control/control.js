/**
 * @file 控制模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var Mask = require('./mask/mask');
    var MODE = require('./definition/mode');

    var SelectionController = require('./components/selection/selection');

    module.exports = $$.createClass('Control', {
        base: require('module'),

        // mode: selection -> 选区操作模式; write -> 写操作模式； formual -> 公式操作模式；
        mode: null,

        controllers: null,

        init: function () {
            this.__initMode();
            this.__initComponents();
            this.__initMask();

            this.__initMessage();
        },

        __initMode: function () {
            this.mode = MODE.SELECTION;
        },

        __initComponents: function () {
            var controllers = {};

            controllers[MODE.SELECTION] = this.createComponent(SelectionController);

            this.controllers = controllers;
        },

        __initMessage: function () {
            this.onMessage({
                'depute.input.control': this.addInput
            });
        },

        __initMask: function () {
            var _self = this;

            this.mask = this.createComponent(Mask);
            this.mask.appendTo(this.getTopContainer());

            this.mask.setListener(function (type, evt) {
                if (_self.controllers[_self.mode]['__on' + type]) {
                    _self.controllers[_self.mode]['__on' + type](evt);
                }
            });
        },

        addInput: function (inputNode) {
            this.mask.addInput(inputNode);
        }
    });
});