'use strict';

const _chai = require('chai');
_chai.use(require('sinon-chai'));
_chai.use(require('chai-as-promised'));
const expect = _chai.expect;
const _rewire = require('rewire');
const { testValues: _testValues, ObjectMock } = require('@vamship/test-utils');

const RoleTemplate = _rewire('../../../../src/templates/iam/role-template');

describe('RoleTemplate', function() {
    function _createRoleTemplate(key, roleName, noRegion) {
        key = key || _testValues.getString('rolekey');
        roleName = roleName || _testValues.getString('rolename');
        noRegion = noRegion !== false;
        return new RoleTemplate(key, roleName, noRegion);
    }

    beforeEach('Inject dependencies', () => {});

    describe('ctor()', () => {
        it('should throw an error if invoked without a valid key', () => {
            const error = 'Invalid key specified (arg #1)';
            _testValues.allButString('').forEach((invalidKey) => {
                const wrapper = () => {
                    let roleName = _testValues.getString('rolename');
                    let noRegion = false;
                    return new RoleTemplate(invalidKey, roleName, noRegion);
                };

                expect(wrapper).to.throw(error);
            });
        });

        it('should throw an error if invoked without a valid role name', () => {
            const error = 'Invalid role name specified (arg #2)';
            _testValues.allButString('').forEach((invalidRole) => {
                const wrapper = () => {
                    let validKey = _testValues.getString('key');
                    let noRegion = false;
                    return new RoleTemplate(validKey, invalidRole, noRegion);
                };

                expect(wrapper).to.throw(error);
            });
        });

        it('should expose expected methods and properties', () => {
            const aKey = _testValues.getString('rolekey');
            const aRoleName = _testValues.getString('rolename');
            const aRoleTemplate = new RoleTemplate(aKey, aRoleName, false);

            expect(aRoleTemplate).to.be.an('object');
            expect(aRoleTemplate.setAssumePolicy).to.be.a('function');
            expect(aRoleTemplate.setPath).to.be.a('function');
            expect(aRoleTemplate.addAwsManagedPolicy).to.be.a('function');
            expect(aRoleTemplate.addUserManagedPolicy).to.be.a('function');
            expect(aRoleTemplate.addPolicy).to.be.a('function');
        });
    });

    describe('setAssumePolicy()', () => {});
    describe('setPath()', () => {});
    describe('addAwsManagedPolicy()', () => {});
    describe('addUserManagedPolicy()', () => {});
    describe('addPolicy()', () => {});
});
