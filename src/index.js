'use strict';

/**
 * Cloudformation generation engine that uses individual javascript templates
 * with an imperative programming model to generate individual JSON snippets
 * that are then assembled to create the final Cloudformation template.
 */
module.exports = {
    /**
     * Template builder object - compiles individual templates, and serializes
     * them into Cloudformation JSON.
     */
    TemplateBuilder: require('./template-builder')

    // TemplateReference: require('./utils/template-reference'),

    // UserLiteralReference: require('./utils/user-literal-reference'),

    // RoleLiteralReference: require('./utils/role-literal-reference')
};
