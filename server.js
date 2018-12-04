const http = require('http');
const app = require('./app');

process.env.JWT_KEY = "supersecretkeyformars1";
const port = process.env.PORT || 6003;

const server = http.createServer(app);



const models = require('./api/models');
models.sequelize.sync().then(function(){
    server.listen(port);
})
