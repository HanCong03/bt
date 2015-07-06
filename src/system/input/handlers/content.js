/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        __syncContent: function () {
            var row = this.__cellStart.row;
            var col = this.__cellStart.col;

            var formattedContent = this.rs('get.formatted.content', row, col);

            if (!formattedContent) {
                return;
            }

            var userContent = $$.encodeHTML(formattedContent).replace(/\n/g, '<br/>\uFEFF');
            this.inputNode.innerHTML = userContent;

            // 根据内容获取大小
            var rect = this.__calculateContentRect(userContent);

            this.__relocation(rect);
        },

        __resetUserContent: function () {
            this.inputNode.innerHTML = '';
        },

        __getUserContent: function () {
            return this.inputNode.innerText;
        },

        __newLine: function () {
            var docSelection = window.getSelection();
            var range = docSelection.getRangeAt(0);
            var placeholder = document.createTextNode('\uFEFF');

            range = range.cloneRange();

            range.deleteContents();
            range.insertNode(placeholder);
            range.insertNode(document.createElement('br'));
            range.selectNode(placeholder);
            range.collapse(false);

            docSelection.removeAllRanges();
            docSelection.addRange(range);

            /* --- 由于手动修改的内容不触发事件，所以需要主动调用以便同步输入框大小 --- */
            this.__input();
        }
    };
});