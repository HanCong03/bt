/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = require('utils').createClass('ICommand', {
        $dep: null,

        getAPI: function () {
            return this.$dep.getAPI();
        }
    });
});