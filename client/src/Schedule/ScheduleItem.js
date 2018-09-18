import React, { Component } from 'react';

class ScheduleType extends Component{
  constructor(props){
    super(props);
    this.state={
    	tipos:this.props.tipos,
      tipo:''
    }
    this.selectType=this.selectType.bind(this);
  }
  selectType(event){
    console.log('HACE CLICK');
    console.log(event.target.value);
    this.setState({
      tipo: event.target.value
    });

  }
  render (){
  	let types = this.state.tipos;
  	let t = types.map((tip,i)=>{
  		return (
  			<li key={tip.name+i}>
  				<div key={tip.name+i*2}>
  					<h5>{tip.name}</h5>
  					<button type="button"
            onClick={this.selectType} 
            className="btn btn-outline-primary">
            Reservar
            </button>
  				</div>
  			</li>
  			);
  	});
  			return(
  				<div key={t.length}>
  					<ul>
  						{t}
  					</ul>
  				</div>
  				);
  };
};

export default ScheduleType;
