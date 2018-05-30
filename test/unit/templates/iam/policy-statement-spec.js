'use strict';

const _chai = require('chai');
_chai.use(require('sinon-chai'));
_chai.use(require('chai-as-promised'));
const expect = _chai.expect;
const _rewire = require('rewire');
const { testValues: _testValues } = require('@vamship/test-utils');

const PolicyStatement = _rewire('../../../../src/templates/iam/policy-statement');

describe('PolicyStatement', function() {
    function _createPolicyStatement() {
        return new PolicyStatement();
    }

    beforeEach('Inject dependencies', () => {

    });

    describe('ctor()', () => {
        it('should expose expected methods and properties', () => {
            const aPolicyStatement = new PolicyStatement();

            expect(aPolicyStatement).to.be.an('object');
            expect(aPolicyStatement.properties).to.be.an('object');
            expect(aPolicyStatement._ensurePrincipalType).to.be.a('function');
            expect(aPolicyStatement.setEffect).to.be.a('function');
            expect(aPolicyStatement.addServicePrincipal).to.be.a('function');
            expect(aPolicyStatement.addCanonicalUserPrincipal).to.be.a('function');
            expect(aPolicyStatement.addIamUserPrincipal).to.be.a('function');
            expect(aPolicyStatement.addAwsAccountPrincipal).to.be.a('function');
            expect(aPolicyStatement.addAnonymousUserPrincipal).to.be.a('function');
            expect(aPolicyStatement.addAction).to.be.a('function');
            expect(aPolicyStatement.addResource).to.be.a('function');
            expect(aPolicyStatement.addResourceArn).to.be.a('function');
        });
    });

    describe('_ensurePrincipalType()', () => {

    });
    describe('setEffect()', () => {

    });
    describe('addServicePrincipal()', () => {

    });
    describe('addCanonicaluserPrincipal()', () => {

    });
    describe('addIamUserPrincipal()', () => {

    });
    describe('addAwsAccountPrincipal()', () => {

    });
    describe('addAnonymousUserPrincipal()', () => {

    });
    describe('addAction()', () => {

    });
    describe('addResource()', () => {

    });
    describe('addResourceArn()', () => {

    });
});

