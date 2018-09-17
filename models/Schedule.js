const mongoose = require('mongoose');
const { Schema } = mongoose;
const ScheduleSchema = new mongoose.Schema({
  day:{
   type: String,
   default: '' 
}, 
  HoraLlegada: { 
  	type: Number,
  	default: '' 
  },
  HoraSalida: { 
  	type: Number, 
  	default: '' 
  }, 
  idMasajista: { 
  	type: String, 
  	default: '' 
  },
  avaible:{
  	type: Boolean,
  	default: true
  },
  types: {
  	type: [],
  	default: []
  }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
