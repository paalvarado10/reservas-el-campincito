import React, { Component } from 'react';
class ScheduleHour extends Component {
	constructor(props){
		super(props);
		this.state = {
		fro:'',
		to:''
		}
		this.onTextChangeHourFrom = this.onTextChangeHourFrom.bind(this);
		this.onTextChangeHourTo = this.onTextChangeHourTo.bind(this);
		this.setHour = this.setHour.bind(this);
	}
	onTextChangeHourFrom(event){
		this.setState({
			fro: event.target.value
		});
	}
		onTextChangeHourTo(event){
		this.setState({
			to: event.target.value
		});
	}
	
	setHour(event){
		const desde = event.target.value;
		console.log(desde); 
		console.log(this.state.fro);
		console.log(this.state.to);
		this.props.setHour(this.state.fro, this.state.to);	
		
	}
	
	render(){
		let {
			fro,
			to,
			selected
		}=this.state;
		return(
			<div className="container">
			<div className="row">
			<div className="col-sm-1"></div>
			<div className="col-sm-4">
			<p>Hora de llegada</p>
			<input 
						type="number" 
						value={fro}
						onChange={this.onTextChangeHourFrom}
						/>
			</div>
			<div className="col-sm-2"></div>
			<div className="col-sm-4">
			<p>Hora de Salida</p>
			<input 
						type="number" 
						value={to}
						onChange={this.onTextChangeHourTo}
						/>
			</div>
			<div className="col-sm-1"></div>
			</div>
			<div className="row">
			<div className="col-sm-4">
			</div>
			<div className="col-sm-4">
				<button type="button" 
				className="btn btn-outline-dark"
				onClick={this.setHour}
				>Siguiente</button>
			</div>
			<div className="col-sm-4">
			</div>
			</div>
			</div>
					
			);
	}
}
export default ScheduleHour;