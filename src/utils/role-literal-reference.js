'use strict';

const Reference = require('./reference');
const _loggerProvider = require('wysknd-log').loggerProvider;

/**
 * RoleLiteralReference class to represent a literal reference to some
 * preexisting/externally-defined AWS::Role resource.
 *
 * @extends {Reference}
 */
class RoleLiteralReference extends Reference {
    /**
     * @protected
     * @param {string} role Representing the literal name of the AWS Role
     *        resource
     * @param {Boolean} [containsRegion=true] Representing whether the
     *        resolved() resource is AWS region specific
     */
    constructor(roleName, containsRegion) {
        if (!roleName || typeof roleName !== 'string' || roleName.length <= 0) {
            throw new Error('Invalid roleName specified (arg #1)');
        }
        super(roleName);

        this._containsRegion = containsRegion !== false;
        this._logger = _loggerProvider.getLogger(`RoleLiteralReference::${roleName}`);
    }

    /**
     * Returns an object that is the JSON-ready representation guaranteed to
     * resolve to the desired AWS resource.
     *
     * @return {Object} The JSON-ready representation guaranteed to resolve
     *         to the desired AWS resource.
     */
    resolve() {
        let regionToken = this._containsRegion ? { Ref: 'AWS::Region' } : '';

        return {
            'Fn::Join': ['', [
                'arn:aws:iam::', {
                    Ref: 'AWS::AccountId'
                },
                ':role/',
                regionToken,
                this.role
            ]]
        };
    }

    /**
     * Returns the AWS roleName associated with this Reference.
     *
     * @return {String} The AWS roleName.
     */
    get role() {
        return this.ref;
    }
}

module.exports = RoleLiteralReference;

