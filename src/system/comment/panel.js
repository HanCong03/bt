/**
 * @file 评论面板
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

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
            console.log(comment)

            this.panelStatus = true;
        },

        __hideComment: function () {
            if (!this.panelStatus) {
                return;
            }

            this.panelStatus = false;
            this.panelNode.style.display = 'none';
        }
    };
});