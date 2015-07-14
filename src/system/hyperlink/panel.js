/**
 * @file 超链接面板
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    module.exports = {
        panelNode: null,
        panelStatus: false,

        __initPanel: function () {
            var node = document.createElement('div');
            node.className = 'btb-hyperlink';

            var contianer = this.rs('get.prompt.container');

            contianer.appendChild(node);

            this.panelNode = node;
        },

        __showHyperlink: function (rect, link) {
            this.__updateHyperlink(link);
            this.__updateLocation(rect);

            this.panelStatus = true;
        },

        __hideHyperlink: function () {
            if (!this.panelStatus) {
                return;
            }

            this.panelStatus = false;
            this.panelNode.style.left = '-999999px';
        },

        __updateHyperlink: function (link) {
            this.panelNode.innerHTML = '<a target="_blank" href="' + link + '">' + link + '</a>';
        },

        __updateLocation: function (rect) {
            var visualData = this.rs('get.visual.data');
            var boundaryHeight = visualData.boundaryHeight;

            var top = rect.y;
            var bottom = boundaryHeight - (rect.y + rect.height);

            // 尝试底部
            if (bottom >= 50) {
               this.__showToBottom(rect);

            // 尝试顶部
            } else if (top >= 50) {
                this.__showToTop(rect);

            // 显示在内部的底部
            } else {
                this.__showToInnerBottom(rect);
            }
        },

        __showToBottom: function (rect) {
            var visualData = this.rs('get.visual.data');
            var panelNode = this.panelNode;
            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            panelNode.style.top = rect.y + headHeight + rect.height + 'px';
            panelNode.style.left = rect.x + headWidth - LINE_WIDTH + 'px';
        }
    };
});