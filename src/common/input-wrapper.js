/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {

    module.exports = require('utils').createClass('InputWrapper', {
        inputNode: null,

        constructor: function (node) {
            this.inputNode = node;
        },

        newLine: function () {
            var docSelection = window.getSelection();
            var range = docSelection.getRangeAt(0);
            range = range.cloneRange();

            if (!range.collapsed) {
                range.deleteContents();
                range.collapse(false);
            }

            var container = range.startContainer;

            if (range.collapsed) {
                if (container.nodeType === 3) {
                    if (container.data.length !== range.startOffset) {
                        insertBr(range, false);
                    } else {
                        insertBr(range);
                        insertHolderBr(range);
                    }
                } else {
                    if (isLast(container.childNodes, range.endOffset)) {
                        insertBr(range);
                        insertHolderBr(range);
                    } else {
                        insertBr(range, false);
                    }
                }
            }

            docSelection.removeAllRanges();
            docSelection.addRange(range);
        },

        reset: function () {
            this.inputNode.innerHTML = '';
        },

        focus: function () {
            this.inputNode.focus();
        },

        blur: function () {
            this.inputNode.blur();
        },

        getContent: function () {
            var content = this.inputNode.innerHTML;
            return content.replace(/<br holder="1"[^>]*?>/g, '').replace(/<br[^>]*>/g, '\n');
        },

        setContent: function (content) {
            content = content.split('\n');

            if (content[content.length - 1] === '') {
                this.inputNode.innerHTML = content.join('<br>') + '<br holder="1">';
            } else {
                this.inputNode.innerHTML = content.join('<br>');
            }
        },

        setHTML: function (html) {
            this.inputNode.innerHTML = html;
        },

        getHTML: function () {
            return this.inputNode.innerHTML;
        }
    });

    function insertBr(range) {
        var brNode = document.createElement('br');
        range.insertNode(brNode);
        range.selectNode(brNode);
        range.collapse(false);
    }

    function insertHolderBr(range) {
        var brNode = document.createElement('br');
        brNode.setAttribute('holder', '1');
        range.insertNode(brNode);
        range.selectNode(brNode);
        range.collapse(true);
    }

    function isLast(nodes, index) {
        if (index === nodes.length) {
            return true;
        }

        for (var i = index, len = nodes.length; i < len; i++) {
            if (nodes[i].nodeType !== 3 || nodes[i].data.length !== 0) {
                return false;
            }
        }

        return true;
    }
});