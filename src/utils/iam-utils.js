'use strict';

/**
 * A module that exposes utility methods related to IAM objects.
 */
const iamUtils = {
    /**
     * Gets an IAM role URI based on the role name. If the role value is
     * prefixed with "$REGION", the generated role name will be prefixed
     * with the current region.
     *
     * @param {String} role The name of the role.
     *
     * @return {Object} A cloud formation template snippet that represents the
     *         role uri.
     */
    getRoleUri: function(role) {
        throw new Error(
            'IAM utils function [getRoleUri] not being implemented.'
        );
    },

    /**
     * Gets an AWS managed policy URI based on the policy name.
     *
     * @param {String} policyName The name of the policy.
     *
     * @return {String} The IAM policy uri.
     */
    getAwsPolicyUri: function(policyName) {
        throw new Error(
            'IAM utils function [getAwsPolicyUri] not being implemented.'
        );
    },

    /**
     * Gets a user managed policy URI based on the policy name.
     *
     * @param {String} policyName The name of the policy.
     *
     * @return {Object} A cloud formation template snippet that represents the
     *         policy uri.
     */
    getUserPolicyUri: function(policyName) {
        throw new Error(
            'IAM utils function [getUserPolicyUri] not being implemented.'
        );
    },

    /**
     * Gets an IAM user URI based on the user name.
     *
     * @param {String} username The username of the user
     *
     * @return {Object} A cloud formation template snippet that represents the
     *         user uri.
     */
    getUserUri: function(username) {
        throw new Error(
            'IAM utils function [getUserUri] not being implemented.'
        );
    }
};

module.exports = iamUtils;
