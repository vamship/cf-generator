'use strict';

const _chai = require('chai');
_chai.use(require('sinon-chai'));
_chai.use(require('chai-as-promised'));
const expect = _chai.expect;
const _rewire = require('rewire');
const { testValues: _testValues } = require('@vamship/test-utils');

const TemplateReference = _rewire('../../../src/utils/template-reference');

describe('TemplateReference', function() {
    function _createTemplateRef(templateKey) {
        templateKey = templateKey || _testValues.getString('templateKey');
        return new TemplateReference(templateKey);
    }

    describe('ctor()', () => {
        it('should throw an error if invoked without a valid key', () => {
            const error = 'Invalid key specified (arg #1)';
            _testValues.allButString('').forEach((invalidKey) => {
                const wrapper = () => {
                    return new TemplateReference(invalidKey);
                };
                expect(wrapper).to.throw(error);
            });
        });

        it('should expose expected methods and properties', () => {
            const aValidKey = _testValues.getString('somekey');
            //const aValidReferenceObj = { 'Fn:GetAtt': [ aValidKey, 'Arn' ] };
            const aTemplateRef = new TemplateReference(aValidKey);

            expect(aTemplateRef).to.be.an('object');
            expect(aTemplateRef.key).to.be.a('string');
            expect(aTemplateRef.resolve).to.be.a('function');
        });
    });

    describe('resolve()', () => {
        it('should return an Object which references the Template key', () => {
            let aTemplateRef = _createTemplateRef();
            let refKey = aTemplateRef.key;
            let result = aTemplateRef.resolve();

            expect(result).to.be.an('object');
            expect(result.Ref).to.equal(refKey);
        });
    });
});
