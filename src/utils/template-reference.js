'use strict';

const Reference = require('./reference');
const _camelCase = require('camelcase');
const _loggerProvider = require('wysknd-log').loggerProvider;

/**
 * TemplateReference class to represent a logical reference to some
 * CloudFormation Template resource.
 *
 * @extends {Reference}
 */
class TemplateReference extends Reference {
    /**
     * @protected
     * @param {string} key Representing the logical ID of the CloudFormation
     *        resource
     */
    constructor(key) {
        if (!key || typeof key !== 'string' || key.length <= 0) {
            throw new Error('Invalid key specified (arg #1)');
        }
        const cfKey = _camelCase(key);
        super(cfKey);

        this._logger = _loggerProvider.getLogger(`TemplateReference::${key}`);
    }

    /**
     * Returns an object that is the JSON-ready representation guaranteed to
     * resolve to the desired AWS resource.
     *
     * @return {Object} The JSON-ready representation guaranteed to resolve
     *         to the desired AWS resource.
     */
    resolve() {
        return { Ref: this.ref };
    }

    /**
     * The key associated with the template
     *
     * @return {String} The template key.
     */
    get key() {
        return this.ref;
    }
}

module.exports = TemplateReference;
