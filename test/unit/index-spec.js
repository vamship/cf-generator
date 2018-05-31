'use strict';

const _chai = require('chai');
_chai.use(require('sinon-chai'));
_chai.use(require('chai-as-promised'));
const expect = _chai.expect;
const _rewire = require('rewire');

const _index = _rewire('../../src/index');
const TemplateBuilder = require('../../src/template-builder');
const TemplateReference = require('../../src/utils/template-reference');
const UserLiteralReference = require('../../src/utils/user-literal-reference');
const RoleLiteralReference = require('../../src/utils/role-literal-reference');

describe('_index', function() {
    it('should implement methods required by the interface', function() {
        expect(_index).to.be.an('object');
        expect(_index.TemplateBuilder).to.equal(TemplateBuilder);
        expect(_index.TemplateReference).to.equal(TemplateReference);
        expect(_index.UserLiteralReference).to.equal(UserLiteralReference);
        expect(_index.RoleLiteralReference).to.equal(RoleLiteralReference);
    });
});
