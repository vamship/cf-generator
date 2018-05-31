'use strict';

const _chai = require('chai');
_chai.use(require('sinon-chai'));
_chai.use(require('chai-as-promised'));
const expect = _chai.expect;
const _rewire = require('rewire');
const { testValues: _testValues } = require('@vamship/test-utils');

const RoleLiteralReference = _rewire(
    '../../../src/utils/role-literal-reference'
);

describe('RoleLiteralReference', function() {
    function _createRoleLiteralReference(roleName, isRegionSpecific) {
        roleName = roleName || _testValues.getString('roleName');
        isRegionSpecific = isRegionSpecific !== false;
        return new RoleLiteralReference(roleName, isRegionSpecific);
    }

    describe('ctor()', () => {
        it('should throw an error if invoked without a valid role name', () => {
            const error = 'Invalid roleName specified (arg #1)';
            _testValues.allButString('').forEach((invalidRoleName) => {
                const wrapper = () => {
                    let isRegionSpecific = true;
                    return new RoleLiteralReference(
                        invalidRoleName,
                        isRegionSpecific
                    );
                };

                expect(wrapper).to.throw(error);
            });
        });

        it('should expose expected methods and properties', () => {
            const aValidRoleName = _testValues.getString('somerole');
            const aRoleRef = new RoleLiteralReference(aValidRoleName);

            expect(aRoleRef).to.be.an('object');
            expect(aRoleRef.role).to.be.a('string');
            expect(aRoleRef.resolve).to.be.a('function');
        });
    });

    describe('resolve()', () => {
        it('should return an Object which references the literal role name', () => {
            let aRoleRef = _createRoleLiteralReference();
            let referencedRole = aRoleRef.role;
            let result = aRoleRef.resolve();

            expect(result).to.be.an('object');
            expect(result['Fn::Join'][1]).to.include(referencedRole);
        });
    });
});
