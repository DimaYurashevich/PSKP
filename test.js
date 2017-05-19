var siege = require("siege");
siege()
    
siege()
    .on(3000)
    .withCookie
    .post('/api/auth/login', {login: "III",password:"12345Qaz"}).for(1).times
    .get('/api/subject').for(10000).times
    .get('/api/group').for(10000).times
    .get('/api/training').for(10000).times
    .attack()

