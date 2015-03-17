Package.describe({
    name: 'pcorey:orion-slingshot',
    version: '0.0.1',
    summary: 'Orion file provider wrapper around Slingshot',
    git: 'https://github.com/pcorey/orion-slingshot',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.0.3.2');
    api.use([
        'orionjs:core',
        'orionjs:filesystem',
        'matb33:collection-hooks',
        'edgee:slingshot@0.4.1',
        'eluck:aws-sdk'
    ]);
    api.addFiles('pcorey:orion-slingshot.js');
});