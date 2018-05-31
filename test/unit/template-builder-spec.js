'use strict';

const _chai = require('chai');
_chai.use(require('sinon-chai'));
_chai.use(require('chai-as-promised'));
const expect = _chai.expect;
const _rewire = require('rewire');

const TemplateBuilder = _rewire('../../src/template-builder');
const { testValues: _testValues } = require('@vamship/test-utils');
const { ArgError } = require('@vamship/error-types');

describe('_index', function() {
    function _createBuilder(templateRoot) {
        templateRoot = templateRoot || _testValues.getString('templateRoot');
        return new TemplateBuilder(templateRoot);
    }

    describe('ctor()', () => {
        it('should throw an error if invoked without a valid templateRoot', () => {
            const message = 'Invalid template root (arg #1)';
            _testValues.allButString('').forEach((templateRoot) => {
                const wrapper = () => {
                    return new TemplateBuilder(templateRoot);
                };
                expect(wrapper).to.throw(ArgError, message);
            });
        });
    });
});
