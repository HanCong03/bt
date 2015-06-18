/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        env: {
            startardSize: require('./env/commands/standard-size'),
            theme: require('./env/commands/theme'),
            style: require('./env/commands/style'),
            userStyle: require('./env/commands/user-style'),
            border: require('./env/commands/border'),
            clear: require('./env/commands/clear'),
            comment: require('./env/commands/comment')
        },
        core: {},
        system: {},
        ext: {}
    };
});