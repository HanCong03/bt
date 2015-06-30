/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        __syncContent: function () {
            var row = this.__cellStart.row;
            var col = this.__cellStart.col;

            var formattedContent = this.rs('get.formatted.content', row, col);

            if (!formattedContent) {
                return;
            }

            this.inputNode.innerHTML = formattedContent.replace(/\n/g, '<br/>\uFEFF');

            // 根据内容获取大小
            var rect = this.__calculateContentRect(formattedContent);

            this.__relocation(rect);
        },

        __resetUserContent: function () {
            this.inputNode.innerHTML = '';
        },

        __getUserContent: function () {
            var content = this.inputNode.innerHTML;

            // 格式化
            return content.replace(/<br\s*\/?>/g, '\n')
                        .replace(/[\uFEFF]/g, '')
                        .replace(/<[^>]+?>/g, '');
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