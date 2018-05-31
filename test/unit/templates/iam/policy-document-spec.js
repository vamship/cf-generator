'use strict';

const _chai = require('chai');
_chai.use(require('sinon-chai'));
_chai.use(require('chai-as-promised'));
const expect = _chai.expect;
const _rewire = require('rewire');
const { testValues: _testValues } = require('@vamship/test-utils');

const PolicyDocument = _rewire('../../../../src/templates/iam/policy-document');

describe('PolicyDocument', function() {
    function _createPolicyDocument() {
        return new PolicyDocument();
    }

    beforeEach('Inject dependencies', () => {

    });

    describe('ctor()', () => {
        it('should expose expected methods and properties', () => {
            const aPolicyDocument = new PolicyDocument();

            expect(aPolicyDocument).to.be.an('object');
            expect(aPolicyDocument.properties).to.be.an('object');
            expect(aPolicyDocument.addStatement).to.be.a('function');
        });
    });

    describe('addStatement()', () => {

    });
});

