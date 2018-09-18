import React, { Component } from 'react';
import ScheduleType from './ScheduleType';

class ScheduleList extends Component{
  constructor(props){
    super(props);
    this.state={
      idMasajista:'',
      horaInicio:'',
      horaFin:'',
      tipo:''
    }
    this.selectType=this.selectType.bind(this);
  }
  selectType(type, masajista){
    const tipe = type;
    const m = masajista;
    this.setState({
      tipo: tipe,
      idMasajista: m
      }, ()=>{
        this.props.selectType(this.state.tipo, this.state.idMasajista);
      }
      );
  }
  render (){
  			if(this.props.horarios){
  			let ms =this.props.horarios.map((masajista,i)=>{
        		return(
        			<li key={"listScheduleItem"+masajista.idMasajista}>
        			<div key={masajista.HoraLlegada+masajista.idMasajista}>
        			<h4>Nombre: {masajista.idMasajista}</h4>
        			<h5>Horario: {masajista.HoraLlegada} - {masajista.HoraSalida}</h5>
        			<ScheduleType selectType={this.selectType} 
              tipos={masajista.types} masajista={masajista.idMasajista}/>
        			</div>
        			</li>
        				);
        		});
  			return(
  				<div>
  					<ul>
  						{ms}
  					</ul>
  				</div>
  				);
  }
  return(
  	<div >
        <p>...Loading...</p>
        </div>
  	);
};
};
export default ScheduleList;