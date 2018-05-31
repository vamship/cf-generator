'use strict';

const _clone = require('clone');

/**
 * Reference abstract class to represent a reference to some CloudFormation
 * Template object OR some existing/deployed AWS resource. Do NOT directly
 * instantiate this class; please instantiate a subclass whose implemented
 * resolve().
 */
class Reference {
    /**
     * @protected
     * @param {string} reference Representing the logical ID of the CloudFormation
     *        resource 
     * @param {Object} reference Some object that AWS CloudFormation can
     *        use to resolve the referenced Template resource
     */
    constructor(reference) {
        // TODO: I think reference can be restricted to strings only, remove
        // Object support
        let errMsg = 'Invalid reference specified (arg #1)';
        if (!reference || !(['object','string'].includes(typeof reference))) {
            throw new Error(errMsg);
        }
        if (typeof reference === 'string' && reference.length <= 0) {
            throw new Error(errMsg);
        }
        if (typeof reference === 'object' && Object.keys(reference).length < 1) {
            throw new Error(errMsg);
        }

        this._ref = _clone(reference);
    }

    /**
     * Returns the CloudFormation reference to template resource OR the JSON-like
     * literal which AWS evaluates to some existing AWS resource.
     *
     * @return {Object} The reference object
     */
    get ref() {
        return this._ref;
    }
}

module.exports = Reference;

