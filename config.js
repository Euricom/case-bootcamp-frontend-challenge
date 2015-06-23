var config = {
	sessionId: 'test',
    apiKeys: ['comicsans'],
    hasAccess: function(apiKey) {
        console.log(apiKey, this.apiKeys)
        var hasAccess = false;
        this.apiKeys.forEach(function(key) {
            if (key == apiKey){
                hasAccess = true;
            }
        });
        return hasAccess;
    }
};

module.exports = config;
