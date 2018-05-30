'use strict';

const _fs = require('fs');
const _argValidator = require('@vamship/arg-utils').argValidator;
const Promise = require('bluebird').Promise;

/**
 * Class that loads all template objects defined in the current directory, and
 * each of its sub directories.
 */
class TemplateBuilder {
    /**
     * @param {String} startDir The root directory of your template files.
     */
    constructor(startDir) {
        _argValidator.checkString(
            startDir,
            1,
            'Invalid start directory (arg #1)'
        );
        
        this._readDirMethod = Promise.promisify(_fs.readdir.bind(_fs));

        this._startDir = startDir;
    }

    /**
     * Loads all templates recursively from the given root directory, and 
     * returns a Promise containing the combined CloudFormation-formatted POJO 
     * template.
     *
     * @return {Promise} Promise that is resolved or rejected depending upon
     *         successful build status. If resolved, the JSON-ready
     *         CloudFormation template object will be provided to the success
     *         callback.
     */
    build() {
        return Promise.try(() => {
            return this._readDirMethod(this._startDir);
        });
    }

    // /**
    //  * Loads template objects from the specified path. Non javascript files will
    //  * be ignored, and attempts will be made to build templates recursively
    //  * from sub directories.
    //  *
    //  * @private
    //  * @param {String} file The name of the file from which templates will
    //  *        be loaded.
    //  *
    //  * @return {Promise} A promise that will be rejected only if an error
    //  *         occurs. All other results will result in resolution, with an
    //  *         array containing the loaded template objects.
    //  */
    // _generateTemplates(file) {
    //     const fileAbsPath = this._dirInfo.getFilePath(file);
    //     const fileRelPath = _path.join(this._dirInfo.relPath, file);
    //     const pathComponents = _path.parse(fileAbsPath);

    //     return new Promise((resolve, reject) => {
    //         this._logger.trace(`Querying stats: [${fileRelPath}]`);
    //         _fs.stat(fileAbsPath, (err, stats) => {
    //             if (err) {
    //                 this._logger.error(err);
    //                 reject(err);
    //                 return;
    //             }

    //             if (stats.isDirectory()) {
    //                 this._logger.info(`Processing directory: [${fileRelPath}]`);

    //                 const childInfo = this._dirInfo.getChildDir(file);
    //                 const childBuilder = new TemplateBuilder(childInfo, this._dataBag);
    //                 return childBuilder.build().then(resolve);

    //             } else if (pathComponents.ext === '.js') {
    //                 this._logger.info(`Processing file: [${fileRelPath}]`);
    //                 let templates = require(fileAbsPath);

    //                 if (typeof templates === 'function') {
    //                     this._logger.trace(`Invoking template generator function: [${fileRelPath}]`);
    //                     templates = templates(this._dirInfo, this._dataBag);
    //                 }

    //                 if (templates === null || templates === undefined) {
    //                     this._logger.warn(`No templates emitted by generator: [${fileRelPath}]`);
    //                     templates = [];
    //                 } else if (!(templates instanceof Array)) {
    //                     templates = [templates];
    //                 }

    //                 this._logger.debug(`Templates loaded (file): [${fileRelPath}]`, {
    //                     templates: templates.map((res) => res.key)
    //                 });

    //                 resolve(templates);

    //             } else {
    //                 this._logger.warn(`Ignoring: [${fileRelPath}]`);
    //                 resolve([]);
    //             }
    //         });
    //     });
    // }

    // /**
    //  * Loads all templates in the current directory and sub directories.
    //  *
    //  * @return {Promise} A promise that will be rejected or resolved based on
    //  *         the outcome of the load operation. If resolved, the an array
    //  *         of templates will be provided to the success callback.
    //  */
    // build() {
    //     const path = this._dirInfo.relPath;
    //     this._logger.debug(`Loading files for: [${path}]`);
    //     const templateList = [];
    //     const addtemplates = (templates) => {
    //         templates.forEach((template) => {
    //             templateList.push(template);
    //         });
    //     };
    //     return new Promise((resolve, reject) => {
    //         _fs.readdir(this._dirInfo.absPath, (err, data) => {
    //             this._logger.trace(`Directory listing complete: [${path}]`);

    //             if (err) {
    //                 this._logger.error(err);
    //                 reject(err);
    //                 return reject(err);
    //             }

    //             this._logger.trace(`Processing files in: [${path}]`);
    //             const promises = [];
    //             data.forEach((file) => {
    //                 promises.push(this._generateTemplates(file)
    //                     .then(addtemplates));

    //             });

    //             Promise.all(promises).then(() => {
    //                 this._logger.info(`Templates loaded (dir): [${path}]`, {
    //                     templates: templateList.map((res) => res.key)
    //                 });
    //                 resolve(templateList);
    //             }, (err) => {
    //                 this._logger.error(err, `One or more templates failed to generate`);
    //                 reject(err);
    //             });
    //         });
    //     });
    // }
}

module.exports = TemplateBuilder;
