// ----- Uses Mongodb and promises to save data ---------
const { MongoClient } = require('mongodb');
const fs = MongoClient;

//--  for development:
const database = 'mongodb://localhost:27017';
//-- for deployment:
//const database = 'mongodb://inti2018:inti2018@ds259255.mlab.com:59255/weatherapp'
//const database = 'mongodb://paulc:abc123@ds117701.mlab.com:17701/placesapp';
var obj = {
  table: []
};

const getAllData = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      database,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          reject('Unable to connect to MongoDB server');
        }
        console.log('Connected to MongoDB server');

        const db = client.db('placesapp');

        db.collection('placesappcollection')
          .find()
          .toArray()
          .then(
            docs => {
              resolve(docs);
            },
            err => {
              reject('Unable to fetch data', err);
            }
          );
        client.close();
      }
    );
  });
};

const saveData = newdata => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      database,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          reject('Unable to connect to MongoDB server');
        }
        console.log('Connected to MongoDB server');

        const db = client.db('placesapp');
        const length = newdata.length;
        for (var i = 0; i < length; i++) {
          db.collection('placesappcollection').insertOne(
            newdata[i],
            (err, result) => {
              if (err) {
                reject(`Unable to insert ${err}`);
              }
            }
          );
        }
        resolve(1);
        client.close();
      }
    );
  });
};

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      database,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          reject('Unable to connect to MongoDB server');
        }
        console.log('Connected to MongoDB server');
        const db = client.db('placesapp');
        db.collection('placesappcollection')
          .remove({})
          .then(result => {
            resolve(result.result);
          });
        client.close();
      }
    );
  });
};

module.exports = {
  getAllData,
  saveData,
  deleteAll
};
