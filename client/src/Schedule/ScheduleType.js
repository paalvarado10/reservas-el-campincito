import React, { Component } from 'react';

class ScheduleType extends Component{
  constructor(props){
    super(props);
    this.state={
    	tipos:this.props.tipos,
      masajista: this.props.masajista,
      tipo:''
    }
       this.selectType=this.selectType.bind(this);
  }
    selectType(event){
      const selected=event.target.value;
      const masajista=this.state.masajista;
    this.setState({
      tipo: selected
    });
    this.props.selectType(selected, masajista);
  }
  render (){
  	let types = this.state.tipos;
  	let t = types.map((tip,i)=>{
  		return (
  			<li>
  				<div>
  					<p>{tip.name}</p>
  					<button type="button"
            value={tip.name}
            onClick={this.selectType} 
            className="btn btn-outline-primary">
            Reservar
            </button>
  				</div>
  			</li>
  			);
  	});
  			return(
  				<div>
  					<ul>
  						{t}
  					</ul>
  				</div>
  				);
  };
};

export default ScheduleType;
