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

// Google Places API KEY
const PLACES_API_KEY = 'AIzaSyDhUDwXlhJF0pzMIg4NoBr5LEifvOXMxbE';
var allResults;

hbs.registerHelper('list', (items, options) => {
 items = allResults;

 var out = "<tr><th>Name</th><th>Photo Reference</th></tr>";

 const length = items.length;

 for(var i=0; i<length; i++){
   out = out +  options.fn(items[i]);
 }

 return out;
});

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
    const httpURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

    const placesReq = `${httpURL}location=${locationData.lat},${locationData.lng}&radius=1500&type=school&keyword=school&key=${PLACES_API_KEY}`;

    return axios.get(placesReq);
    //res.status(200).send(JSON.stringify(locationData));
  }).then((response) => {

    allResults = extractData(response.data.results);

    res.render('result.hbs');
  })
  .catch((error) => {
    res.status(200).send('ERRO');
  });

});



const extractData = (allResults) => {
  var placesObj = {
    table : [],
  };

  //extract name and photo_reference and save to new object
  const length = allResults.length;

  for (var i=0; i<length; i++) {

    var tempObj;

    if (allResults[i].photos) {
      const photoRef = allResults[i].photos[0].photo_reference;
      const requestUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${PLACES_API_KEY}`;
      tempObj = {
        name: allResults[i].name,
        photo_reference: requestUrl,
      }
    } else {
      tempObj = {
        name: allResults[i].name,
        photo_reference: undefined,
      }
    }

    placesObj.table.push(tempObj);

  }

  //--- test the content ---------
  // for (var i=0; i<placesObj.table.length; i++) {
  //   if (placesObj.table[i].photo_reference) {
  //     console.log(placesObj.table[i].name);
  //     console.log(placesObj.table[i].photo_reference);
  //     getPhoto(placesObj.table[i].photo_reference);
  //   }
  // }
  return placesObj.table;


};

const getPhoto = (photoRef) => {
  const requestUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${PLACES_API_KEY}`;

  axios.get(requestUrl).then((response) => {
    console.log(response);
  }).catch((error) => {
    res.status(200).send('Cannot get photo');
  });

}

server.listen(port, () => {
  console.log(`server started on port ${port}`);
});
