/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        env: {
            'theme': require('./env/commands/theme'),
            'style': require('./env/commands/style')
        },
        core: {},
        system: {},
        ext: {}
    };
});