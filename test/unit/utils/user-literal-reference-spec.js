'use strict';

const _chai = require('chai');
_chai.use(require('sinon-chai'));
_chai.use(require('chai-as-promised'));
const expect = _chai.expect;
const _rewire = require('rewire');
const { testValues: _testValues } = require('@vamship/test-utils');

const UserLiteralReference = _rewire(
    '../../../src/utils/user-literal-reference'
);

describe('UserLiteralReference', function() {
    function _createUserLiteralRef(username) {
        username = username || _testValues.getString('username');
        return new UserLiteralReference(username);
    }

    describe('ctor()', () => {
        it('should throw an error if invoked without a valid username', () => {
            const error = 'Invalid username specified (arg #1)';
            _testValues.allButString('').forEach((invalidUsername) => {
                const wrapper = () => {
                    return new UserLiteralReference(invalidUsername);
                };

                expect(wrapper).to.throw(error);
            });
        });

        it('should expose expected methods and properties', () => {
            const aValidUsername = _testValues.getString('someusername');
            const aUserRef = new UserLiteralReference(aValidUsername);

            expect(aUserRef).to.be.an('object');
            expect(aUserRef.username).to.be.a('string');
            expect(aUserRef.resolve).to.be.a('function');
        });
    });

    describe('resolve()', () => {
        it('should return an Object which references the literal username', () => {
            let aUserRef = _createUserLiteralRef();
            let referencedUser = aUserRef.username;
            let result = aUserRef.resolve();

            expect(result).to.be.an('object');
            expect(result['Fn::Join'][1]).to.include(referencedUser);
        });
    });
});
