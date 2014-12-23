require('shared-sofa-component-tasks')(require('gulp'), {
    pkg: require('./package.json'),
    baseDir: __dirname,
    testDependencyFiles: [
        'node_modules/angular-sofa-name/dist/sofaName.js',
        'node_modules/angular-sofa-select-box/dist/sofaSelectBox.js'
    ]
});
