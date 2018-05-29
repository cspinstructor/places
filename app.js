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

server.get('/form', (req, res) => {
  res.render('form.hbs');
});

server.post('/getplaces', (req, res) => {
  const addr = req.body.address;
  const locationReq = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyAn7h3tsW_p0md5iISNFzLcJDoRGRgjWPg`;

  axios.get(locationReq).then((response) => {
    const locationData = {
      addr: response.data.results[0].formatted_address,
      lat: response.data.results[0].geometry.location.lat,
      lng: response.data.results[0].geometry.location.lng,
    }
    res.status(200).send(JSON.stringify(locationData));
  })
  .catch((error) => {
    res.status(200).send('ERRO');
  });


  //const result = { address: addr };
  //res.render('result.hbs',result);
});

server.listen(port, () => {
  console.log(`server started on port ${port}`);
});
