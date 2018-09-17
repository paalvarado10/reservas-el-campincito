import React, { Component } from 'react';
class AppointmentMPerson extends Component {
	constructor(props){
		super(props);
		this.state = {
		masajistas:[			
		],
		selected:''
		}

		this.handleChangeType = this.handleChangeType.bind(this);
	}
	componentWillMount() {
		fetch('/api/account/getMPerson?role=' +"mPerson")
		.then(res => res.json())
	.then(json => {
		if(json.success) {
			let m =json.mPersons;
			this.setState({
				masajistas: m
			});
		}
	});
	};
	handleChangeType(event){
		this.setState({
			selected: event.target.value
		});
		this.props.handleChangeType(this.state.selected);
	}

	render(){
		let mList = [];
		mList =this.state.masajistas;
		if(mList.length>0){
			let ms=mList.map((n,i)=>{
				return(
						<div className="col-sm-6" key={n._id+"div"}>
							<h3>Nombre: {n.firstName}</h3>
							<div>
								<h3>Contacto: {n.email}</h3>
							</div>
							<div>
								<button type="button" className="btn btn-success" key={n._id}>Reservar</button>
							</div>
						</div>
				);
			});
			return(
				<div className="row">
					{ms}
				</div>
				);
		}
		else{
			return (
			<div>
				<h3> No Hay masajistas disponibles </h3>
			</div>
			);
		}
		
	}
}
export default AppointmentMPerson;