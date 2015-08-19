/**
 * @file 评论面板
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    var MAX_WIDTH = 300;

    module.exports = {
        panelNode: null,
        panelStatus: false,

        __initPanel: function () {
            var node = document.createElement('div');
            node.className = 'btb-comment';

            var contianer = this.rs('get.prompt.container');

            contianer.appendChild(node);

            this.panelNode = node;
        },

        __showComment: function (rect, comment) {
            this.__updateComment(comment);
            this.__updateLocation(rect);

            this.panelStatus = true;
        },

        __hideComment: function () {
            if (!this.panelStatus) {
                return;
            }

            this.panelStatus = false;
            this.panelNode.style.left = '-999999px';
        },

        __updateComment: function (comment) {
            this.panelNode.innerHTML = comment.replace(/\n/g, '<br/>');
        },

        __updateLocation: function (rect) {
            var visualData = this.rs('get.visual.data');
            var boundaryWidth = visualData.boundaryWidth;
            var boundaryHeight = visualData.boundaryHeight;

            var size = $$.getRect(this.panelNode);

            var top = rect.y;
            var left = rect.x;
            var right = boundaryWidth - (rect.x + rect.width);
            var bottom = boundaryHeight - (rect.y + rect.height);

            // 尝试右侧
            if (right >= MAX_WIDTH) {
               this.__showToRight(rect, size);

            // 尝试左侧
            } else if (left >= MAX_WIDTH) {
                this.__showToLeft(rect, size);

            // 显示在内部的右侧
            } else {
                this.__showInnerRight(rect, size);
            }
        },

        __showToRight: function (rect, size) {
            var visualData = this.rs('get.visual.data');
            var boundaryHeight = visualData.boundaryHeight;
            var panelNode = this.panelNode;
            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            var spaceHeight = boundaryHeight - rect.y;

            if (spaceHeight >= size.height) {
                panelNode.style.top = rect.y + headHeight - LINE_WIDTH + 'px';
                panelNode.style.left = rect.x + headWidth + rect.width + 'px';
            }
        }
    };
});