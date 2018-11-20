const http = require('http');
const app = require('./app');

process.env.JWT_KEY = "supersecretkeyformars1";
const port = process.env.PORT || 6003;

const server = http.createServer(app);

server.listen(port);
