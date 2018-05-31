'use strict';

const Reference = require('./reference');
const _loggerProvider = require('wysknd-log').loggerProvider;

/**
 * UserLiteralReference class to represent a literal reference to some
 * preexisting/externally-defined AWS::User resource.
 *
 * @extends {Reference}
 */
class UserLiteralReference extends Reference {
    /**
     * @protected
     * @param {string} username Representing the literal name of the AWS User
     *        resource
     */
    constructor(username) {
        if (!username || typeof username !== 'string' || username.length <= 0) {
            throw new Error('Invalid username specified (arg #1)');
        }
        super(username);

        this._logger = _loggerProvider.getLogger(
            `UserLiteralReference::${username}`
        );
    }

    /**
     * Returns an object that is the JSON-ready representation guaranteed to
     * resolve to the desired AWS resource.
     *
     * @return {Object} The JSON-ready representation guaranteed to resolve
     *         to the desired AWS resource.
     */
    resolve() {
        return {
            'Fn::Join': [
                '',
                [
                    'arn:aws:iam::',
                    {
                        Ref: 'AWS::AccountId'
                    },
                    ':',
                    this.username
                ]
            ]
        };
    }

    /**
     * Returns the AWS username associated with this Reference.
     *
     * @return {String} The AWS username.
     */
    get username() {
        return this.ref;
    }
}

module.exports = UserLiteralReference;
