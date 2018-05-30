'use strict';

const _chai = require('chai');
_chai.use(require('sinon-chai'));
_chai.use(require('chai-as-promised'));
const expect = _chai.expect;
const _rewire = require('rewire');
const { testValues: _testValues, ObjectMock } = require('@vamship/test-utils');

const TemplateBuilder = _rewire('../../src/template-builder');

describe('TemplateBuilder', function() {
    function _createBuilder(startDir) {
        startDir = startDir || _testValues.getString('startDir');
        return new TemplateBuilder(startDir);
    }

    let _fsMock = null;

    beforeEach('Inject dependencies', () => {
        _fsMock = new ObjectMock().addMock('readdir');
        TemplateBuilder.__set__('_fs', _fsMock.instance);
    });

    describe('ctor()', () => {
        it('should throw an error if invoked without a valid start directory', () => {
            const error = 'Invalid start directory (arg #1)';
            _testValues.allButString('').forEach((startDir) => {
                const wrapper = () => {
                    return new TemplateBuilder(startDir);
                };
        
                expect(wrapper).to.throw(error);
            });
        });

        it('should expose expected methods and properties', () => {
            const path = _testValues.getString('startDir');
            const aBuilder = new TemplateBuilder(path);

            expect(aBuilder).to.be.an('object');
            expect(aBuilder.build).to.be.a('function');

        });
    });

    describe('build()', () => {
        it('should return a Promise when invoked', () => {
            const aBuilder = _createBuilder();
            const ret = aBuilder.build();

            expect(ret).to.be.an('object');
            expect(ret.then).to.be.a('function');
        });

        it('should invoke readdir with start path', () => {
            const startDir = _testValues.getString('startDir');
            const aBuilder = _createBuilder(startDir);

            const readDirMethod = _fsMock.mocks.readdir;
            expect(readDirMethod.stub).to.not.have.been.called;

            aBuilder.build();

            expect(readDirMethod.stub).to.have.been.called;
            expect(readDirMethod.stub.args[0][0]).to.equal(startDir);
            expect(readDirMethod.stub.args[0][1]).to.be.a('function');
        });

        it('should reject Promise if readdir fails', (done) => {
            const aBuilder = _createBuilder();

            const readDirMethod = _fsMock.mocks.readdir;

            const built = aBuilder.build();

            const callback = readDirMethod.stub.args[0][1];
            callback('Something went wrong');

            expect(built).to.be.rejected.and.notify(done);
        });
    });
});
