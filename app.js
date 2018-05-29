const axios = require('axios');
const express = require('express');
const hbs = require('hbs');
const server = express();
const bodyParser = require('body-parser');
const filemgr = require('./filemgr');
const port = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: true}));
server.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

server.get('/', (req, res) => {
  res.render('home.hbs');
});

server.listen(port, () => {
  console.log(`server started on port ${port}`);
});
