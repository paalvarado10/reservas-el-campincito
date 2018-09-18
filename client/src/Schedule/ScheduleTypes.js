import React, { Component } from 'react';
import ScheduleHour from'./ScheduleHour';


class ScheduleTypes extends Component{
	constructor(props){
		super(props);
		this.state={
			tipos: '',
			pres:'',
			seleccionados:'',
			horaInicio:'',
     		horaFin:''
		}
		this.selectTypes=this.selectTypes.bind(this);
		this.selectType=this.selectType.bind(this);
		this.setHour=this.setHour.bind(this);

	}
	componentWillMount(){
		console.log('LLega');
		fetch('/types')
		.then(res => res.json())
		.then(json =>{
			console.log(json);
			if(json.success){
				console.log('LLega');
				this.setState({
					tipos:json.types
				});
			}
		});
	}
	selectType(event){
		let pre = [];
		console.log(event.target.value);
		let nuevo =event.target.value;
		console.log("Nuevo: "+nuevo+" Anterior:"+this.state.pres+" Estado anterior");
		pre=this.state.pres;
		pre=pre.concat(nuevo+",");
		console.log(pre);
		this.setState({
			pres:pre
		}, () =>{
			console.log('nuevo estado '+ this.state.pres);
		});
	}
	setHour(ini,fin){
    this.setState({
      horaInicio: ini,
      horaFin: fin
    });
    this.props.setHour(ini,fin);
  }
	selectTypes(event){
		let seleccion = [];
		seleccion=this.state.pres;
		console.log(seleccion);
		seleccion.concat(event.target.value+",");
		console.log(seleccion);
		this.setState({
			seleccionados:seleccion
		}, ()=>{
			console.log(this.state.seleccionados);
			this.props.selectTypes(this.state.seleccionados);
			
		});


		
	}
	render(){
		let {
			tipos,
			seleccionados,
			pres
		} = this.state;
		if(tipos){
			if(seleccionados){
				let servicios = seleccionados.split(",");
				let ind = servicios.map((n,i)=>{
					if(n){
					return(
						<li><h3>{n}</h3></li>
						);
					}
				});
				return(
					<div>
						<h2>Brindando el servicio de:</h2>
						<ul>{ind}</ul>
						<ScheduleHour setHour={this.setHour}/> 
					</div>
					);
			}
			let x=tipos.map((n,i)=>{
				return(
					<div className="form-check" key={i+14}>
							<input className="form-check-input" 
							type="radio" id={n.name} 
							value={n.name}
							onClick={this.selectType}
							/>
							<label className="form-check-label" for={n.name}>
							{n.name}
							</label>
					</div>					
					);
			});
		return(
			<div>
				<div>
					{x}
				</div>
				<button type="button" 
				className="btn btn-outline-dark"
				onClick={this.selectTypes}
				>Siguiente</button>
			</div>
			);
	
	}
	else{
	return(
		<div><h1>No hay tipos</h1></div>
		);
		}	
	};
};

export default ScheduleTypes;