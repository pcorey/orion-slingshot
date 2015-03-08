Package.describe({
  name: 'pcorey:orion-slingshot',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2');
  api.addFiles('pcorey:orion-slingshot.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('pcorey:orion-slingshot');
  api.addFiles('pcorey:orion-slingshot-tests.js');
});
