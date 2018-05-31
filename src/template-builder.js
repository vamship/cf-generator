'use strict';

const { argValidator: _argValidator } = require('@vamship/arg-utils');

/**
 * Builder object that traverses a directory tree for template files, compiling
 * them into a composite Cloudformation template. Building is broken up into
 * two distinct stages - build and serialize.
 *
 * <p>
 * The build phase traverses the directory tree, capturing definitions from
 * individual templates, while the serialize phase converts the consolidated
 * template definition into a supported output format such as JSON or YAML.
 * </p>
 */
class TemplateBuilder {
    /**
     * @param {String} templateRoot The root path that contains all of the
     *        individual template files.
     */
    constructor(templateRoot) {
        _argValidator.checkString(
            templateRoot,
            1,
            'Invalid template root (arg #1)'
        );
    }
}

module.exports = TemplateBuilder;
