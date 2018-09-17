const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
	clientEmail: {
		type: String,
		default: ''
	},
	idMassageU: {
		type: String,
		default: ''		
	},
	mType: {
		type: String,
		default: ''		
	},
	day: {
		type: Date,
		default: ''		
	},
	startHour: {
		type: Number,
		default: ''		
	},
	endHour: {
		type: Number,
		default: ''		
	}
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
