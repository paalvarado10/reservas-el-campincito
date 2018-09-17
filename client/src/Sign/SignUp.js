import React, { Component } from 'react';
import { getFromStorage, setInStorage } from '../../utils/storage';
import { Button } from 'reactstrap';


class SignUp extends Component {
     constructor(props){
     super(props);

     this.state = {
      signUpEmail: '',
      signUpPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpError: '',
      signUpToken:'',
      isLoading: false
    };
    this.signUp = this.signUp.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this)
    this.onTextboxChangeSignUpLastName= this.onTextboxChangeSignUpLastName.bind(this);
}

onTextboxChangeSignUpFirstName(event){
        this.setState({
    signUpFirstName: event.target.value,
  });
}

onTextboxChangeSignUpLastName(event){
      this.setState({
    signUpLastName: event.target.value,
  });
}

onTextboxChangeSignUpEmail(event){
    this.setState({
    signUpEmail: event.target.value,
  });
}

onTextboxChangeSignUpPassword(event){
    this.setState({
    signUpPassword: event.target.value,
  });
}


signUp(){
  const {
    signUpFirstName,
    signUpLastName,
    signUpEmail,
    signUpPassword,
    signUpToken
  } = this.state;

  this.setState({
    isLoading: true
  });

  fetch('/api/account/signup',
    { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword 
      }),
  }).then(res => res.json())
  .then(json => {
    if(json.success) {
      setInStorage('the_main_app', { token: json.token, });
      this.setState({
        signUpError: json.message,
        isLoading: false,
        signUpFirstName: '',
        signUpLastName: '',
        signUpEmail: '',
        signUpPassword: '',
        signUpToken: json.token
      });
      console.log('Usuario registrado, Inicio sesion');
      this.props.signUp(this.state.signUpToken);
    }
    else {
      this.setState({
        signUpError: json.message
      });
    }
  })
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
            signUpToken: json.token,
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
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state; 
    if (signUpError){
           return (
       <div>
        <h2>{signUpError}</h2>
       </div>   
      );

    }
     return (
       <div className="col-sm-4" style={{ margin: "auto"}}>
        <div className="form-group" style={{ margin: "auto"}}>
          <h3> Registrarse </h3>
          <p>Nombre:</p>
          <input type="text" 
          placeholder="Ingrese su nombre"
          value={signUpFirstName}
          onChange={this.onTextboxChangeSignUpFirstName}
          />
          <p>Apellido:</p>
          <input type="text" 
          placeholder="Ingrese sus apeliidos"
          value={signUpLastName}
          onChange={this.onTextboxChangeSignUpLastName}
          />
          <br/>
          <p>Correo:</p>
          <input type="email" 
          placeholder="Ingrese Correo"
          value={signUpEmail}
          onChange={this.onTextboxChangeSignUpEmail}
          />
          <p>Clave:</p>
          <input type="password" 
          placeholder="Ingrese Clave"
          value={signUpPassword}
          onChange={this.onTextboxChangeSignUpPassword}
          />
          
          </div>
          <div className='container'  style={{margin: 'auto'}}>
          <br/>
          <button style={{margin: 'auto'}} type="button" className="btn btn-secondary" onClick={this.signUp}>Aceptar</button>
          </div>
        <br/>
      </div>   
      );
 }
}
export default SignUp;
