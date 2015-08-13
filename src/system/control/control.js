/**
 * @file 控制模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var Mask = require('./mask/mask');
    var MODE = require('./definition/mode');

    var ControlUtils = require('system/control/utils');

    var SelectionController = require('./components/selection/selection');
    var WriteContorller = require('./components/write/write');
    var RowColumnController = require('./components/row-column/row-column')

    module.exports = $$.createClass('Control', {
        base: require('module'),

        // mode: selection -> 选区操作模式; write -> 写操作模式； formual -> 公式操作模式；
        mode: null,

        controllers: null,

        mixin: [
            require('./handlers/dblclick'),
            require('./handlers/mousedown'),
            require('./handlers/input'),
            require('./handlers/mousewheel'),
            require('./handlers/header'),
            require('./handlers/focus')
        ],

        init: function () {
            this.container = this.getMainContainer();
            this.__initMode();
            this.__initComponents();
            this.__initMask();

            this.__initMessage();
            this.__initService();
        },

        __initMode: function () {
            this.mode = MODE.SELECTION;
        },

        __initComponents: function () {
            var controllers = {};

            controllers[MODE.SELECTION] = this.createComponent(SelectionController);
            controllers[MODE.WRITE] = this.createComponent(WriteContorller);
            controllers[MODE.ROW_COLUMN] = this.createComponent(RowColumnController);

            this.controllers = controllers;
        },

        __initMessage: function () {
            this.onMessage({
                'depute.input.control': this.__addInput,
                'control.free': this.__freeControl,
                'outer.start': this.__onOuterFocus,
                'outer.exit': this.__onOuterExit
            });
        },

        __initService: function () {
            this.registerService({
                'control.is.selection.mode': this.__isSelectionMode
            });
        },

        __initMask: function () {
            var _self = this;

            this.mask = this.createComponent(Mask);
            this.mask.appendTo(this.getTopContainer());

            this.mask.setListener(function (type, evt) {
                _self.__filter(type, evt);
            });
        },

        __isSelectionMode: function () {
            return this.mode === MODE.SELECTION;
        },

        __filter: function (type, evt) {
            var isContinue = true;
            var handlerName = '__on' + type;

            // 如果主控模块对该事件感兴趣，则先交由主控模块处理。
            if (this[handlerName]) {
                isContinue = this[handlerName](evt);
            }

            // 不能再继续
            if (!isContinue) {
                return;
            }

            if (this.controllers[this.mode][handlerName]) {
                this.controllers[this.mode][handlerName](evt);
            }
        },

        __onOuterFocus: function (row, col) {
            if (this.mode !== MODE.SELECTION) {
                return;
            }

            var controlers = this.controllers;

            // 通知selection控制器退出。
            controlers[MODE.SELECTION].exit();
            // 切换模式
            this.mode = MODE.WRITE;
            // 通知write控制器激活方式：通过鼠标激活
            controlers[MODE.WRITE].mouseActive(row, col);
        },

        __onOuterExit: function () {
            var controllers = this.controllers;

            controllers[MODE.WRITE].__exit();
            // 切换到选区模式
            this.mode = MODE.SELECTION;
        },

        __addInput: function (inputNode) {
            this.mask.addInput(inputNode);
        },

        /**
         * 子组件主动请求释放控制权
         */
        __freeControl: function () {
            var controllers = this.controllers;

            controllers[this.mode].exit();
            // 切换到选区模式
            this.mode = MODE.SELECTION;
        },

        __getIndex: function (evt) {
            var visualData = this.rs('get.visual.data');
            var index = ControlUtils.calculateCellIndex(this.container, visualData, evt.clientX, evt.clientY);

            var row = index.r;
            var col = index.c;

            if (index.r >= 0) {
                row = visualData.rows[index.r];
            }

            if (index.c >= 0) {
                col = visualData.cols[index.c];
            }

            return {
                r: index.r,
                c: index.c,
                row: row,
                col: col
            };
        }
    });
});