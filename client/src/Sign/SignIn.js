import React, { Component } from 'react';
import { getFromStorage, setInStorage } from '../../utils/storage';

class SignIn extends Component {
     constructor(props){
     super(props);

     this.state = {
       signInEmail: '',
       signInPassword: '',
       signInError: '',
       signInToken:'',
       isLoading: false
    };
    this.signIn = this.signIn.bind(this);
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
}
signIn(){
	const {
		signInEmail,
		signInPassword
	} = this.state;

	this.setState({
		isLoading: true
	});

	fetch('/api/account/signin',
		{ 
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: signInEmail,
				password: signInPassword 
			}),
	}).then(res => res.json())
	.then(json => {
		if(json.success) {
			setInStorage('the_main_app', { token: json.token, email: json.email});
			this.setState({
				signInError: json.message,
				isLoading: false,
				signInEmail: '',
				signInPassword: '',
				signInToken: json.token
			});
			console.log('Inicio sesion');
			this.props.signIn(this.state.signInToken);
		}
		else {
			this.setState({
				signInError: json.message
			});
		}
	})

}
onTextboxChangeSignInEmail(event){
	this.setState({
		signInEmail: event.target.value,
	});
}
onTextboxChangeSignInPassword(event){
	this.setState({
		signInPassword: event.target.value,
	});
}

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token){
    	const { token } = obj;
      fetch('/api/account/verify?token=' +token)
      .then(res => res.json())
      .then(json =>{
        if(json.success) {
          this.setState({
            signInToken: json.token,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      })
    }
    else {
      this.setState({
        isLoading: false
      });
    }
  }
   render() {
   	const {
   		signInEmail,
   		signInPassword,
   		signInError
   	} = this.state; 
     return (
       <div className="col-sm-4" style={{ margin: "auto"}}>
       {
       	(signInError) ? (
       		<h4>{signInError}</h4>
       		): (null)
       }
       	<h3> Iniciar Sesion </h3>
		<p>Correo:</p>
		<input 
		type="email" 
		placeholder="Ingrese Correo" 
		value={signInEmail}
		onChange={this.onTextboxChangeSignInEmail}
		/>
		<p>Clave:</p>
		<input type="password" 
		placeholder="Ingrese Clave" 
		value={signInPassword}
		onChange={this.onTextboxChangeSignInPassword}
		/>
		<br/>
		<h1></h1>
		<br/>
		<button style={{margin: 'auto'}} type="button" className="btn btn-secondary" onClick={this.signIn}>Aceptar</button>
       </div>
       );
 }
}
export default SignIn;
