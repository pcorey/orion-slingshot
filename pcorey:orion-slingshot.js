orion.filesystem.providerUpload = function(options, success, failure) {
    var uploader = new Slingshot.Upload('S3');
    uploader.send(options.fileList[0], function (error, downloadUrl) {
        if (error) {
            failure(error);
        } else {
            success(downloadUrl);
        }
    });
}

orion.filesystem.providerRemove = function(file, success, failure)  {
    // TODO: Add delete...
}

orion.config.add('AWS_ACCESS_KEY', 'aws', {label: 'AWS Access Key'});
orion.config.add('AWS_SECRET_KEY', 'aws', {label: 'AWS Secret Key', secret: true});
orion.config.add('AWS_BUCKET', 'aws', {label: 'AWS Bucket'});
orion.config.add('ALLOWED_FILE_TYPES', 'aws', {label: 'Allowed File Types', type: [String]});
orion.config.add('MAX_FILE_SIZE', 'aws', {label: 'Max File Size (bytes)', type: Number});

function updateRestrictions() {
    Slingshot.fileRestrictions('S3', {
        allowedFileTypes: orion.config.get('ALLOWED_FILE_TYPES',
            ['image/png', 'image/jpeg', 'image/gif']),
        maxSize: orion.config.get('MAX_FILE_SIZE', null)
    });
}

function createDirective() {
    Slingshot.createDirective('S3', Slingshot.S3Storage, {
        bucket: orion.config.get('AWS_BUCKET', 'orion'),
        acl: 'public-read',
        authorize: function () {
            if (!this.userId) {
                var message = "Please login before posting files";
                throw new Meteor.Error("Login Required", message);
            }

            return true;
        },
        key: function (file) {
            return file.name;
        }
    });
}

function updateFromConfig(userId, config) {
    if (!orion.config.get('AWS_ACCESS_KEY') ||
        !orion.config.get('AWS_SECRET_KEY') ||
        !orion.config.get('AWS_BUCKET')) {
        return;
    }
    updateRestrictions();
    if (Meteor.isServer) {
        Meteor.settings.AWSAccessKeyId = orion.config.get('AWS_ACCESS_KEY');
        Meteor.settings.AWSSecretAccessKey = orion.config.get('AWS_SECRET_KEY');
        createDirective();
    }
}

Meteor.startup(function() {
    updateFromConfig();
});