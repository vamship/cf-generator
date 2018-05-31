'use strict';

const _chai = require('chai');
_chai.use(require('sinon-chai'));
_chai.use(require('chai-as-promised'));
const expect = _chai.expect;
const _rewire = require('rewire');
const { testValues: _testValues } = require('@vamship/test-utils');

const PolicyStatement = _rewire(
    '../../../../src/templates/iam/policy-statement'
);

describe('PolicyStatement', function() {
    function _createPolicyStatement() {
        return new PolicyStatement();
    }

    beforeEach('Inject dependencies', () => {});

    describe('ctor()', () => {
        it('should expose expected methods and properties', () => {
            const aPolicyStatement = new PolicyStatement();

            expect(aPolicyStatement).to.be.an('object');
            expect(aPolicyStatement.properties).to.be.an('object');
            expect(aPolicyStatement._ensurePrincipalType).to.be.a('function');
            expect(aPolicyStatement.setEffect).to.be.a('function');
            expect(aPolicyStatement.addServicePrincipal).to.be.a('function');
            expect(aPolicyStatement.addCanonicalUserPrincipal).to.be.a(
                'function'
            );
            expect(aPolicyStatement.addIamUserPrincipal).to.be.a('function');
            expect(aPolicyStatement.addAwsAccountPrincipal).to.be.a('function');
            expect(aPolicyStatement.addAnonymousUserPrincipal).to.be.a(
                'function'
            );
            expect(aPolicyStatement.addAction).to.be.a('function');
            expect(aPolicyStatement.addResource).to.be.a('function');
            expect(aPolicyStatement.addResourceArn).to.be.a('function');
        });
    });

    describe('_ensurePrincipalType()', () => {
        it("should set the policy statement's principal type", () => {
            let aStatement = _createPolicyStatement();
            let aPrincipal = _testValues.getString('principal');
            let initialPrincipal = aStatement.properties.Principal;
            expect(initialPrincipal).to.be.undefined;

            aStatement._ensurePrincipalType(aPrincipal);
            let changedPrincipal = aStatement.properties.Principal;

            expect(changedPrincipal).to.be.an('object');
            expect(changedPrincipal[aPrincipal]).to.not.be.null;
        });

        it("should not set the policy statement's principal type because it was already set", () => {
            let aStatement = _createPolicyStatement();
            aStatement.properties.Principal = { sometype: [] };
            let initialPrincipal = aStatement.properties.Principal;

            aStatement._ensurePrincipalType('sometype');
            let changedPrincipal = aStatement.properties.Principal;

            expect(changedPrincipal).to.be.an('object');
            expect(initialPrincipal).to.deep.equal(changedPrincipal);
        });
    });

    describe('setEffect()', () => {
        ['Allow', 'Deny'].forEach((validEffect) => {
            it(`should successfully set the policy effect to [${validEffect}]`, () => {
                let aStatement = _createPolicyStatement();

                let result = aStatement.setEffect(validEffect);
                expect(result).to.be.an.instanceOf(PolicyStatement);
                expect(result.properties.Effect).to.equal(validEffect);
            });
        });

        it('should throw an error when given an invalid effect type', () => {
            let err =
                'Invalid policy effect specified. Must be one of: [Allow,Deny]';

            _testValues
                .allButString('', 'invalid', 'allow', 'deny')
                .forEach((invalidEffect) => {
                    const wrapper = () => {
                        let aStatement = _createPolicyStatement();
                        aStatement.setEffect(invalidEffect);
                    };

                    expect(wrapper).to.throw(err);
                });
        });
    });

    describe('addServicePrincipal()', () => {
        ['someservice', 'anotherV4l1d!Service_'].forEach((validService) => {
            it(`should successfully set the service principal to [${validService}]`, () => {
                let aStatement = _createPolicyStatement();

                let initialService = aStatement.properties.Principal;
                expect(initialService).to.be.undefined;

                let policyResult = aStatement.addServicePrincipal(validService);
                let serviceRes = policyResult.properties.Principal.Service;
                expect(policyResult).to.be.an.instanceOf(PolicyStatement);
                expect(serviceRes).to.include(validService);
            });
        });

        it('should throw an error when given an invalid service', () => {
            let err = 'Invalid service specified (arg #1)';

            _testValues.allButString('').forEach((invalidService) => {
                const wrapper = () => {
                    let aStatement = _createPolicyStatement();
                    aStatement.addServicePrincipal(invalidService);
                };

                expect(wrapper).to.throw(err);
            });
        });
    });

    describe('addCanonicaluserPrincipal()', () => {
        it('should throw an error when given an invalid canonical user', () => {
            let err = 'Invalid canonical user specified (arg #1)';

            _testValues.allButString('').forEach((invalidUser) => {
                const wrapper = () => {
                    let aStatement = _createPolicyStatement();
                    aStatement.addCanonicalUserPrincipal(invalidUser);
                };

                expect(wrapper).to.throw(err);
            });
        });
    });

    describe('addIamUserPrincipal()', () => {
        it('should throw an error when given an invalid iam user', () => {
            let err = 'Invalid iam username specified (arg #1)';

            _testValues.allButString('').forEach((invalidUser) => {
                const wrapper = () => {
                    let aStatement = _createPolicyStatement();
                    aStatement.addIamUserPrincipal(invalidUser);
                };

                expect(wrapper).to.throw(err);
            });
        });
    });

    describe('addAwsAccountPrincipal()', () => {});

    describe('addAnonymousUserPrincipal()', () => {
        it("should successfully set the policy statement's user principal to anonymous (*)", () => {
            let aStatement = _createPolicyStatement();
            let initialService = aStatement.properties.Principal;
            expect(initialService).to.be.undefined;

            let policyResult = aStatement.addAnonymousUserPrincipal();
            let serviceRes = policyResult.properties.Principal.AWS;
            expect(policyResult).to.be.an.instanceOf(PolicyStatement);
            expect(serviceRes).to.include('*');
        });
    });

    describe('addAction()', () => {
        ['_', 'someAction', '!anoth3r@ction$'].forEach((validAction) => {
            it(`should successfully set the policy statement\'s action to [${validAction}]`, () => {
                let aStatement = _createPolicyStatement();
                let initialActions = aStatement.properties.Action;
                expect(initialActions).to.not.include(validAction);

                let result = aStatement.addAction(validAction);
                expect(result).to.be.an.instanceOf(PolicyStatement);
                expect(result.properties.Action).to.include(validAction);
            });
        });

        it('should throw an error when given an invalid action', () => {
            let err = 'Invalid action specified (arg #1)';

            _testValues.allButString('').forEach((invalidAction) => {
                const wrapper = () => {
                    let aStatement = _createPolicyStatement();
                    aStatement.addAction(invalidAction);
                };

                expect(wrapper).to.throw(err);
            });
        });
    });

    describe('addResource()', () => {
        ['_', 'someResource', '!anoth3rR3$0urc%'].forEach((validResource) => {
            it(`should successfully set the policy statement\'s action to [${validResource}]`, () => {
                let aStatement = _createPolicyStatement();
                let initialResources = aStatement.properties.Resource;
                expect(initialResources).to.not.exist;

                let result = aStatement.addResource(validResource);
                expect(result).to.be.an.instanceOf(PolicyStatement);
                expect(result.properties.Resource).to.include(validResource);
            });
        });

        it('should throw an error when given an invalid resource', () => {
            let err = 'Invalid resource specified (arg #1)';

            _testValues.allButString('').forEach((invalidResource) => {
                const wrapper = () => {
                    let aStatement = _createPolicyStatement();
                    aStatement.addResource(invalidResource);
                };

                expect(wrapper).to.throw(err);
            });
        });
    });

    describe('addResourceArn()', () => {});
});
