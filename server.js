const http = require('http');
const app = require('./app');

const port = process.env.APP_PORT || 3001;

const server = http.createServer(app);

server.listen(port);
console.log(`Server listening on port : ${port}`);
