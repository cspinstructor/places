const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSchema = new Schema(
  {
    name: {
      type: String
    },
    address: {
      type: String
    },
    photo_reference: {
      type: String
    }
  },
  {
    collection: 'placesappcollection'
  }
);

const Model = mongoose.model('placesapp', ModelSchema);
module.exports = Model;
