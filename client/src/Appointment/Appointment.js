import React, { Component } from 'react';
import AppointmentMPerson from './AppointmentMPerson';
import AppointmentType from './AppointmentType';
import AppointmentDay from './AppointmentDay';
import AppointmentHour from './AppointmentHour';
//import ScheduleList from '../Schedule/ScheduleList';
import { getFromStorage, setInStorage } from '../utils/storage';


class Appointment extends Component {
	constructor(props){
		super(props);

		this.state ={
			horarios: [],
			clientEmail: this.props.emailUsuario,
			idMassageU: '',
			mType: '',
			day: '',
			startHour: '',
			endHour: '',
			createAppointmentError:''
		};
		this.onTextChangeStart = this.onTextChangeStart.bind(this);
		this.onTextChangeEnd = this.onTextChangeEnd.bind(this);
		this.addAppointment = this.addAppointment.bind(this);
		this.setDay = this.setDay.bind(this);
		this.setHour = this.setHour.bind(this);
		this.selectType = this.selectType.bind(this);
	}
//-----------------------------------------------------------------
	selectType(tipo, masajista){
		const day = this.state.day;
		this.setState({
			idMassageU: masajista,
			mType: tipo,
			day: day
		});
	}
	setHour(start, end){
		const day = this.state.day;
	
		const idMassageU = this.state.idMassageU;
		const tipo = this.state.mType;
		const email = this.state.clientEmail;
		this.setState({
			startHour: start,
			endHour: end
		}, ()=>{
		this.addAppointment(start);
		});
	}
	setDay(day){
		this.setState({
			day: day
		}, ()=>{
		fetch('/schedule/day?day='+this.state.day)
		.then(res => res.json())
		.then(json =>{
        if(json.success) {
        	this.setState({
        		horarios: json.schedules
        	});
			}
		})
		});
			
	}
	addAppointment(start){
			
		let{
			idMassageU,
			mType,
			day,
			endHour
		}=this.state;
		let clientEmail=this.props.emailUsuario;	
	fetch('/api/appointment/create',
		{ 
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				clientEmail: clientEmail,
				idMassageU: idMassageU,
				mType: mType,
				day: day,
				startHour: start,
				endHour: endHour 
			}),
	}).then(res => res.json())
	.then(json => {
		if(json.success) {
			this.setState({
				clientEmail: clientEmail,
				idMassageU: '',
				mType: '',
				day: '',
				startHour: '',
				endHour: '',
				created: true
			});
			console.log("ENTRA CITA CREADA");
		}
		else {
			this.setState({
				createAppointmentError: json.message
			});
		}
	})
	
 }
	onTextChangeStart(event){
		this.setState({startHour: event.target.value});
	}
	onTextChangeEnd(event){
		this.setState({endHour: event.target.value});
	}

	render(){
		const {
		clientEmail,
   		day,
   		idMassageU,
   		mType,
   		startHour,
   		endHour,
   		created,
   		horarios
   	} = this.state; 
   	if(horarios){
   	if(day && horarios.length>0 &&!idMassageU){
   		let dia=day.split(" ");	
   		return (
   			<div className="container-fluid">
   				<div className="row">
   					<div className="col-sm-3"></div>
   					<div className="col-sm-6">
   						<h2>Agende su cita</h2>
   						<h3>Dia: {dia[0]} lista horarios</h3>
   						{/*<ScheduleList horarios={horarios}*/}
   						selectType={this.selectType}
   						/>
   					</div>
   					<div className="col-sm-3"></div>
   				</div>
   			</div>
   			);
   	}
   	else if(day && horarios.length>0 && idMassageU){
   		return(
   			<AppointmentHour setHour={this.setHour}/>
   			);

   	}
   }
		return(
		<div className='container' style={{margin: 'auto'}}>
		<div className="row" style={{margin: 'auto'}}>
          <div className="col-sm-4"></div>
			<div className="col-sm-4" style={{margin: 'auto'}}>
				<h2>Agende su cita</h2>
				<AppointmentDay setDay={this.setDay}/>			
				<br/>

			</div>
			<div className="col-sm-4"></div>
			</div>
			<br/>
			</div>

			);
	}

}
export default Appointment;