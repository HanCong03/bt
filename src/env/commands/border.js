/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'border',

        $exec: [
            'border',
            'clearborder',

            // single add
            'leftborder',
            'rightborder',
            'topborder',
            'bottomborder',
            'outerborder',
            'innerborder',

            // single remove
            'clearleftborder',
            'cleartopborder',
            'clearrightborder',
            'clearbottomborder',
            'clearouterborder',
            'clearinnerborder'
        ],

        $query: [
            'border',
            'leftborder',
            'rightborder',
            'topborder',
            'bottomborder',
            'outerborder',
            'innerborder'
        ],

        exec_border: function (borderOptions, start, end) {
            this.$dep.setBorder(borderOptions, start, end);
        },

        exec_clearborder: function (start, end) {
            this.$dep.unsetBorder(start, end);
        },

        exec: function (name, args) {
            switch (name) {
                case 'leftborder':
                    return this.$dep.addLeftBorder(args[0], args[1], args[2]);

                case 'rightborder':;
                    return this.$dep.addRightBorder(args[0], args[1], args[2]);

                case 'topborder':;
                    return this.$dep.addTopBorder(args[0], args[1], args[2]);

                case 'bottomborder':;
                    return this.$dep.addBottomBorder(args[0], args[1], args[2]);

                case 'outerborder':;
                    return this.$dep.addOuterBorder(args[0], args[1], args[2]);

                case 'innerborder':;
                    return this.$dep.addInnerBorder(args[0], args[1], args[2]);

                case 'clearleftborder':
                    return this.$dep.removeLeftBorder(args[0], args[1]);

                case 'cleartopborder':
                    return this.$dep.removeTopBorder(args[0], args[1]);

                case 'clearrightborder':
                    return this.$dep.removeRightBorder(args[0], args[1]);

                case 'clearbottomborder':
                    return this.$dep.removeBottomBorder(args[0], args[1]);

                case 'clearouterborder':
                    return this.$dep.removeOuterBorder(args[0], args[1]);

                case 'clearinnerborder':
                    return this.$dep.removeInnerBorder(args[0], args[1]);
            }
        },

        query: function (name, args) {
            switch (name) {
                case 'border':
                    return this.$dep.getBorder(args[0], args[1]);

                case 'leftborder':;
                    return this.$dep.getLeftBorder(args[0], args[1]);

                case 'rightborder':;
                    return this.$dep.getRightBorder(args[0], args[1]);

                case 'topborder':;
                    return this.$dep.getTopBorder(args[0], args[1]);

                case 'bottomborder':;
                    return this.$dep.getBottomBorder(args[0], args[1]);

                case 'outerborder':;
                    return this.$dep.getOuterBorder(args[0], args[1]);

                case 'innerborder':;
                    console.log('未实现')
                    //return this.$dep.getBorder(args[0], args[1]);
            }
        }

    });
});