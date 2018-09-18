const mongoose = require('mongoose');
const { Schema } = mongoose;

const TypeSchema = new mongoose.Schema({
  name:{
   type: String,
   default: '' 
}, 
  avaible: { 
    type: Boolean,
    default: false 
  },
  id: { 
    type: String, 
    default: '' 
  },
  img: {
    type: String,
    default: ''
  }
});
module.exports = mongoose.model('Type', TypeSchema);