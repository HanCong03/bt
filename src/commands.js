/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        env: {
            'theme': require('./env/commands/theme'),
            'style': require('./env/commands/style'),
            'userStyle': require('./env/commands/user-style')
        },
        core: {},
        system: {},
        ext: {}
    };
});