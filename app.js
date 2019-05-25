const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const configureServer = require('./configureServer')
const configs = require('./conf.json');

const server = express();

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

configureServer(configs, server);

server.listen(8000, () => {
  console.log('API Gateway listening on 8000');
});
