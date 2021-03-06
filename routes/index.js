require("dotenv").config();
var express = require('express');
var app = express.Router();
const mongoose = require('mongoose');
const Appointment = require('./models/Appointment');
const User = require('./models/User');
const UserSession = require('./models/UserSession');
const Type = require('./models/Type');
const Schedule = require('./models/Schedule');
var path = require('path');
const url = process.env.URL;
console.log(url+" la url de conexion con mongo");
mongoose.connect(url);
mongoose.Promise = global.Promise;

// **********************METODO TYPE ******************************************************
app.get('/types', (req,res)=>{
	Type.find({}, (err, types)=>{
		 res.send({
				success: true,
				types: types
			});
	});
});

// **********************METODOS USER ******************************************************

app.get('/api/account/getMPerson', (req, res, next) =>{
  const { query } = req;
  const {
    role
  } = query;
  User.find({
    role: role
  }, (err, mList) => {
    if (err){
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    if (mList.lenght<1){
    return res.send({
      success: false,
      message: 'Error: Not found masasijstas'
    });  
    }
    return res.send({
      success: true,
      message: 'successfull request',
      mPersons: mList
    });
  });

});




//-----------------------------------------------------------------------
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
    	firstName,
    	lastName,
    	password
    } = body;
    let {
      email
    } = body;
    if (!firstName){
  		return res.end({
  			success: false,
  			message: 'Error: First name canoot be blank.'
  		});
  	}
  	if (!lastName){
  		return res.end({
  			success: false,
  			message: 'Error: Last name canoot be blank.'
  		});
  	}
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
    email = email.toLowerCase();
    email = email.trim();

    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
      	console.log(previousUsers);
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }

      const newUser = new User();
      newUser.firstName=firstName;
      newUser.lastName=lastName;
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up',
          token: user._id,
          email: email
        });
      });
    });
  }); 
  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
    	password
    } = body;
    let {
      email
    } = body;
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
  }
    email = email.toLowerCase();
    email = email.trim();

    User.find({
    	email: email
    }, (err, users) => {

    	if (err){
    		return res.send({
    			success: false,
    			message: 'Error: Server error'
    		});
    	}
    	if (users.length!=1){
    		return res.send({
    			success: false,
    			message: 'Error: Invalid email' 
    		});
    		}
    	const user = users[0];
    	if (!user.validPassword(password)) {
    		return res.send({
    			success: false,
    			message: 'Error: Invalid credentials'
    		});
    	}


    	const userSession = new UserSession;
    	userSession.userId = user._id;
    	userSession.save((err, doc) =>{
    		if (err) {
    			return res.send({
    				success: false,
    				message: 'Error: Server error'
    			});
    		}
    		return res.send({
    			success: true,
    			message: 'Valid sing in',
    			token: doc._id,
          email: user.email
    		});
    	}); 
    });
 });
//----------------------------------------------------
 app.get('/api/account/getById', (req, res, next) => {
    const { query } = req;
    const { id } = query;
    User.find({
      _id: id,
    }, (err, user) =>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      if(!user || !user[0]){
          return res.send({
          success: false,
          message: 'Error: Invalid credentials'
        });
      }
        if(user[0]){
          return res.send({
          success: true,
          message: 'exito',
          email: user[0].email,
          role: user[0].role
        });
        }
        
    });
  });

//--------------------------------------------------------------------
 app.get('/api/account/get', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
      _id: token,
      //isDeleted: false
    }, (err, sessions) =>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      if(sessions.length != 1){

        return res.send({
          success: false,
          message: 'Error: Invalid credentials'
        });
      }
      else {
        return res.send({
          success: true,
          message: 'Verified',
          userId: sessions.userId
        });
      }
    });
  });




//-----------------------------------------------------
  app.get('/api/account/verify', (req, res, next) => {
  	const { query } = req;
  	const { token } = query;

  	UserSession.find({
  		_id: token,
  		isDeleted: false
  	}, (err, sessions) =>{
  		if(err){
  			return res.send({
  				success: false,
  				message: 'Error: Server error'
  			});
  		}
  		if(sessions.length != 1){
  			return res.send({
  				success: false,
  				message: 'Error: Invalid credentials'
  			});
  		}
  		else {
  			return res.send({
  				success: true,
  				message: 'Verified',
          userId: sessions[0].userId
  			});
  		}
  	});
  });

  app.get('/api/account/logout', (req, res, next) => {
  	const { query } = req;
  	const { token } = query;


  	UserSession.findOneAndUpdate({
  		_id: token,
  		isDeleted: false
  	},{
  		$set: 
  		{
  			isDeleted: true
  		}
  	}, null, (err, sessions) =>{
  		if(err){
  			return res.send({
  				success: false,
  				message: 'Error: Server error'
  			});
  		}
  		else {
  			return res.send({
  				success: true,
  				message: 'Loged Out'
  			});
  		}
  	});
  });

// **********************METODOS APPOINTMENT******************************************************

//--------------------------------------------------------------------------
// UPDATE APPOINTMENT

app.put('/appointment/update', (req, res, next)=>{
	const { body } = req;
    let {
    	_id,
    	mType,
    	day,
    	startHour,
    	endHour
    } = body;
    if(mType && day && startHour && endHour){
        Appointment.updateOne(
    	{_id: _id},
    	{
    		$set: { mType: mType, day: day, startHour: startHour, endHour: endHour }
    	}, (err, appoint) =>{
    	if(err){
			return res.send({
				success: false,
				message: 'Error: Error updating the appointment'
			});
		}
		  res.send({
			success: true,
			message: 'Appointment updated'
		});
    	}
    );    	
    }
    else{
    return res.send({
    	success: false,
    	message: 'Error: Error updating the appointment, incomplete params'
    });
}
 });
//-----DELETE APPOINTMENT
app.delete('/appointment/remove', (req, res, next) => {
	const { query } = req;
	let { _id } = query;

	Appointment.deleteOne({
		_id:_id
	}, (err)=>{
		if(err){
			return res.send({
				success: false,
				message: 'Error: Error deleting the appointment'
			});
		}
		return res.send({
			success: true,
			message: 'Appointment deleted'
		});
	});
});


//-----------------------------------------------------------------------------
// GET APPOINTMENTS EMPLOYEE
 app.get('/appointment/massage', (req, res, next) => {
  	const { query } = req;
  	let { email } = query;

  	email=email.toLowerCase();
  	email=email.trim();


  	Appointment.find({
  		idMassageU: email
  	}, (err, appoints) =>{
  		if(err){
  			return res.send({
  				success: false,
  				message: 'Error: Server error'
  			});
  		}
  		console.log(appoints);
  		if(appoints.length < 1){
  			return res.send({
  				success: false,
  				message: 'No appointments found for the user'
  			});
  		}
  		return res.send({
  			success: true,
  			message: 'OK',
  			appoints: appoints
  		});

  	});
  });

//-----------------------------------------------------------------------------
// GET APPOINTMENTS CLIENT

 app.get('/appointment/client', (req, res, next) => {
  	const { query } = req;
  	let { email } = query;

  	email=email.toLowerCase();
  	email=email.trim();


  	Appointment.find({
  		clientEmail: email
  	}, (err, appoints) =>{
  		if(err){
  			return res.send({
  				success: false,
  				message: 'Error: Server error'
  			});
  		}
  		console.log(appoints);
  		if(appoints.length < 1){
  			return res.send({
  				success: true,
  				message: 'No appointments found for the client'
  			});
  		}
  		return res.send({
  			success: true,
  			message: 'OK',
  			appoints: appoints
  		});

  	});
  });


//-----------------------------------------------------------------------------
//CREATE APPOINTMENT
app.post('/api/appointment/create', (req, res, next) => {
	const { body } = req;
    let {
    	clientEmail,
    	idMassageU,
    	mType,
    	day,
    	startHour,
    	endHour
    } = body;
    if (!clientEmail){
  		return res.end({
  			success: false,
  			message: 'Error: There must be a client'
  		});
  	}
  	    if (!idMassageU){
  		return res.end({
  			success: false,
  			message: 'Error: There must be a massage person asigned.'
  		});
  	}
    if (!mType){
  		return res.end({
  			success: false,
  			message: 'Error: A massage type must be specified.'
  		});
  	}
    if (!day){
  		return res.end({
  			success: false,
  			message: 'Error: The Appointment must have a day'
  		});
  	}
    if (!startHour){
  		return res.end({
  			success: false,
  			message: 'Error: The Appointment must have an start hour.'
  		});
  	}

  	clientEmail=clientEmail.toLowerCase();
  	clientEmail=clientEmail.trim();
    User.find({
    	email: clientEmail
    }, (err, users) => {
    	if (err){
    		return res.send({
    			success: false,
    			message: 'Error: Server error'
    		});
    	}
    	let u = users[0];
    	if (!u){
    		console.log(u);
    		return res.send({
    			success: false,
    			message: 'Error: Server error 2'
    		});
    	}    	
    	// Si existe el usuario que va a crear la reserva
    const newAppointment = new Appointment();
      newAppointment.clientEmail=u.email;
      newAppointment.idMassageU=idMassageU;
      newAppointment.mType = mType;
      newAppointment.day = day;
      newAppointment.startHour = startHour;
      if(endHour){
      newAppointment.endHour = endHour;
      }
      newAppointment.save((err, appoint) => {
        if (err) {
        	console.log(err);
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Appointment created'
        });
      });
    });

    });
// **********************FIN METODOS APPOINTMENT******************************************************


app.get('/schedule', (req, res, next) => {
  	const { query } = req;
  	let { idMasajista } = query;

  	idMasajista=idMasajista.toLowerCase();
  	idMasajista=idMasajista.trim();


  	Schedule.find({
  		idMasajista: idMasajista
  	}, (err, schedules) =>{
  		if(err){
  			return res.send({
  				success: false,
  				message: 'Error: Server error'
  			});
  		}
  		console.log(schedules);
  		if(schedules.length < 1){
  			return res.send({
  				success: true,
  				message: 'No schedules avaibles'
  			});
  		}
  		return res.send({
  			success: true,
  			message: 'OK',
  			schedules: schedules
  		});

  	});
  });
// POST HORARIO MASAJISTA 
app.post('/schedule/create', (req, res, next) => {
	const { body } = req;
    let {
    	day,
    	HoraLlegada,
    	HoraSalida,
    	idMasajista,
    	types
    } = body;
    if (!idMasajista){
  		return res.end({
  			success: false,
  			message: 'Error: There must be a user'
  		});
  	}
  	    if (!day){
  		return res.end({
  			success: false,
  			message: 'Error: There must be a day asigned.'
  		});
  	}
    if (types.length<1){
  		return res.end({
  			success: false,
  			message: 'Error: At least a massage type must be specified.'
  		});
  	}
    if (!HoraLlegada){
  		return res.end({
  			success: false,
  			message: 'Error: The Schedule must have a day'
  		});
  	}
    if (!HoraSalida){
  		return res.end({
  			success: false,
  			message: 'Error: The Schedule must have an start hour.'
  		});
  	}
  	idMasajista=idMasajista.toLowerCase();
  	idMasajista=idMasajista.trim();
  	day=day.toLowerCase();
  	day=day.trim();
    Schedule.find({
    	idMasajista: idMasajista,
    	day: day
    }, (err, horarios) => {
    	if (err){
    		return res.send({
    			success: false,
    			message: 'Error: Server error'
    		});
    	}
    	let u = horarios[0];
    	if (u){
    		console.log(u);
    		return res.send({
    			success: false,
    			message: 'Ya existe un horario para ese dia'
    		});
    	} 
    const newSchedule = new Schedule();
      newSchedule.idMasajista=idMasajista;
      newSchedule.day=day;
      newSchedule.HoraLlegada = HoraLlegada;
      newSchedule.HoraSalida = HoraSalida;
      newSchedule.types = types;
      newSchedule.save((err, schedule) => {
        if (err) {
        	console.log(err);
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Schedule created'
        });
      });
    });

    });

// GET HORARIOS POR DIA
app.get('/schedule/day', (req, res, next) => {

  	const { query } = req;
  	let { day } = query;

  	day=day.toLowerCase();
  	day=day.trim();
  	Schedule.find({
  		day: day 
  	}, (err, schedules) =>{
  		if(err){
  			return res.send({
  				success: false,
  				message: 'Error: Server error'
  			});
  		}
  		if(schedules.length < 1){
  			return res.send({
  				success: true,
  				message: 'No schedules avaibles'
  			});
  		}
  		return res.send({
  			success: true,
  			message: 'OK',
  			schedules: schedules
  		});

  	});
  });
//----------------------------------------------------------------------------
// UPDATE SCHEDULE
app.put('/schedule/update', (req, res, next)=>{
	const { body } = req;
    let {
    	_id,
    	day,
    	HoraLlegada,
    	HoraSalida,
    	idMasajista,
    	types
    } = body;
    if(day && HoraSalida && HoraLlegada && types.length>1){
        Schedule.updateOne(
    	{_id: _id},
    	{
    		$set: { types: types, day: day, HoraSalida: HoraSalida, HoraLlegada: HoraLlegada }
    	}, (err, schedule) =>{
    	if(err){
			return res.send({
				success: false,
				message: 'Error: Error updating the schedule'
			});
		}
		  res.send({
			success: true,
			message: 'schedule updated'
		});
    	}
    );    	
    }
    else{
    return res.send({
    	success: false,
    	message: 'Error: Error updating the schedule, incomplete params'
    });
}
 });

//----------------------------------------------------------------------------
// DELETE SHCEDULE
app.delete('/schedule/remove', (req, res, next) => {
	const { query } = req;
	let { _id } = query;

	Schedule.deleteOne({
		_id:_id
	}, (err)=>{
		if(err){
			return res.send({
				success: false,
				message: 'Error: Error deleting the schedule'
			});
		}
		return res.send({
			success: true,
			message: 'schedule deleted'
		});
	});
});
app.get("/*", function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})


module.exports = app;
