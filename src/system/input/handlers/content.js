/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        __syncContent: function () {
            var row = this.__cellStart.row;
            var col = this.__cellStart.col;

            var standardContent = this.rs('get.standard.formatted.content', row, col);

            if (!standardContent) {
                return;
            }

            this.inputWrapper.setContent(standardContent);

            var userContent = standardContent.split(/\n/).join('<br/>\uFEFF');

            // 根据内容获取大小
            var rect = this.__calculateContentRect(userContent);

            this.__relocation(rect);
        },

        __syncOuterContent: function (content) {
            this.inputWrapper.setHTML(content);

            var rect = this.__calculateContentRect(content);

            this.__relocation(rect);
        },

        __resetUserContent: function () {
            this.inputWrapper.reset();
        },

        __getUserContent: function () {
            return this.inputWrapper.getContent();
        },

        /**
         * 由于手动修改的内容不触发事件，所以需要主动调用以便同步输入框大小
         * @private
         */
        __newLine: function () {
            //var docSelection = window.getSelection();
            //var range = docSelection.getRangeAt(0);
            //var placeholder = document.createTextNode('\uFEFF');
            //var brNode = document.createElement('br');
            //
            //range = range.cloneRange();
            //
            //range.deleteContents();
            //range.insertNode(placeholder);
            //range.insertNode(brNode);
            //range.selectNode(placeholder);
            //range.collapse(false);
            //
            //docSelection.removeAllRanges();
            //docSelection.addRange(range);
            this.inputWrapper.newLine();

            this.__input();
        }
    };
});