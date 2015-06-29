var fs = require('fs')

var config = {
	sessionId: 'test',
    apiKeys: ['comicsans'],
    hasAccess: function(apiKey) {
        var hasAccess = false;
        this.apiKeys.forEach(function(key) {
            if (key == apiKey){
                hasAccess = true;
            }
        });
        return hasAccess;
    },
    writeToDisk: function() {
        var json = JSON.stringify(this);
        fs.writeFile("./config.json", json, function(err) {
            if(err) {
                return console.log('err', err);
            }
        });
    }
};

module.exports = config;
