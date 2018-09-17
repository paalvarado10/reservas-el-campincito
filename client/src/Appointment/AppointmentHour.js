import React, { Component } from 'react';
class AppointmentHour extends Component {
	constructor(props){
		super(props);
		this.state = {
		hour:0,
		selected:''
		}

		this.setHour = this.setHour.bind(this);
		this.onHourChange=this.onHourChange.bind(this);
	}
	onHourChange(event){
		this.setState({
			hour: event.target.value
		});
	}
	setHour(event){
		const hour = this.state.hour;
		this.setState({
			hour: hour,
			selected: hour
		}, ()=>{
			let end = parseInt(this.state.selected)+1;
			this.props.setHour(this.state.selected, end);	
		});
		
	}
	render(){
		let {
			hour
		}=this.state;
		return(
			<div className="container">
				<p>Seleccione la hora de tu cita</p>
				<div className="input-group">
					<input 
					type="number" 
					value={hour}
					onChange={this.onHourChange}
					/>
					<div className="input-group-append">
						<button type="button" 
						onClick={this.setHour}
						className="btn btn-outline-primary btn-sm">
						Aceptar
						</button>
					</div>
				</div>
			</div>
			);
	}
}
export default AppointmentHour;
