import React, { Component } from 'react';
import ScheduleDay from './ScheduleDay';
import ScheduleTypes from './ScheduleTypes';
import ScheduleHour from'./ScheduleHour';

class SetSchedule extends Component{
  constructor(props){
    super(props);
    this.state={
    	dia:'',
      tipos:'',
      horaInicio:'',
      horaFin:'', 
      correo:this.props.emailUsuario
    }
    this.addSchedule=this.addSchedule.bind(this);
    this.setDay = this.setDay.bind(this);
    this.selectTypes = this.selectTypes.bind(this);
    this.setHour=this.setHour.bind(this);
  }
    setDay(day){
    const dia = day;
    this.setState({
      dia: day,
    });
  }
   setHour(ini,fin){
    this.setState({
      horaInicio: ini,
      horaFin: fin
    },()=>{
      let tipos = this.state.tipos.split(",");
      let{
        dia,
        horaInicio,
        horaFin,
        correo
      }=this.state;
      let r = [];
      tipos.map((t,i)=>{
        if(i<tipos.length-2){
          console.log(t);
          let  item  = new Object();
          item.name= t;
          item.avaible = true;
          item.id=i;
          console.log(item)
          r.push(item);
        }
      });
      let ejemplo = new Object();
      ejemplo.day=dia;
      ejemplo.HoraLlegada= horaInicio;
        ejemplo.HoraSalida= horaFin;
        ejemplo.idMasajista= correo;
        ejemplo.types= r;
      console.log(ejemplo);
      fetch('/schedule/create',
        { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ejemplo),
        /*{
        day: dia,
        HorraLLegada: horaInicio,
        HoraSalida: horaFin,
        idMasajista: correo,
        types: r
      }),*/
  }).then(res => res.json())
  .then(json => {
    if(json.success) {
      this.setState({
      dia:'',
      tipos:'',
      horaInicio:'',
      horaFin:'', 
      });
    }
  })
})
};
  
  selectTypes(tipos){
    const tipes = tipos;
     this.setState({
      tipos: tipes,
    });

  }
  addSchedule(){
  }
  render (){
    let {
      dia,
      tipos,
      horaInicio,
      horaFin,
      correo
    }=this.state;
      if(dia){
        return(
          <div className="col-lg-6 col-lg-offset-3">
            <h1>{"Horario para el día:" + dia}</h1>
            <ScheduleTypes setHour={this.setHour}
            selectTypes={this.selectTypes}/>     
          </div>
      );
      }
      else{
        return(
          <div className="col-lg-6 col-lg-offset-3">
            <ScheduleDay setDay={this.setDay}/>
          </div>
        );
          
      }
      
  };
};

export default SetSchedule;
