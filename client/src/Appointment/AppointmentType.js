import React, { Component } from 'react';
class AppointmentType extends Component {
	constructor(props){
		super(props);
		this.state = {
		types:[
			{name: 'chocolate', avaible: true, id: 1},
			{name: 'stones', avaible: false, id: 2},
			{name: 'aroma', avaible: true, id: 3},
			{name: 'exfol', avaible: false, id: 4},
			{name: 'relax', avaible: true, id: 5},
			{name: 'fisio', avaible: false, id: 6}			
		],
		selected:'',
		mName:''
		}

		this.handleChangeType = this.handleChangeType.bind(this);
	}
	componentDidMount() {
		// let mName = this.state.mName;
		// if(mName){
		// 	fetch(){

		// 	}
		// }
	}
	handleChangeType(event){
		this.setState({
			selected: event.target.value
		});
		this.props.handleChangeType(this.state.selected);
	}

	render(){
		let list = this.state.types;
		let selected = this.state.selected;
		let renderTypes=[];
		list.map((type)=>{
			if(type.avaible){
				renderTypes.push(type);
			}
		});
		if(renderTypes.length>0){
			let options=renderTypes.map((n,i)=>{
				return(
						<option key={n.name} 
						value={n.id}>
						{n.name}
						</option>
				);
			});
			return(
				<div>
					<select value={selected} 
					onChange={this.handleChangeType}
					>
					{options}
					</select>
				</div>
				);
		} else {
		return (
			<div>
				<h3> La masajista no tiene masajes disponibles para ese dia </h3>
			</div>
			);
	}
	}
}
export default AppointmentType;