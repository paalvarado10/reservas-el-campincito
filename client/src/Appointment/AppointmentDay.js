import React, { Component } from 'react';
class AppointmentDay extends Component {
	constructor(props){
		super(props);
		this.state = {
		day:[			
		],
		selectedDay:''
		}

		this.setDay = this.setDay.bind(this);
		this.onTextChangeDay=this.onTextChangeDay.bind(this);
	}
	onTextChangeDay(event){
		this.setState({
			day: event.target.value
		});
	}
	setDay(event){
		const dia = event.target.value;
		this.setState({
			day: dia,
			selectedDay: dia
		});
		this.props.setDay(this.state.day);	
	}
	render(){
		let {
			day
		}=this.state;
		return(
			<div className="container">
					<p>Seleccione el dia de tu visita</p>
			<div className="input-group">
						<input 
						type="text" 
						value={day}
						onChange={this.onTextChangeDay}
						/>
						<div className="input-group-append">
						<button type="button" 
						onClick={this.setDay}
						className="btn btn-outline-primary btn-sm">
						Aceptar
						</button>
						</div>
					</div>
			</div>
			);
	}
}
export default AppointmentDay;