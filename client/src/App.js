import React, { Component } from 'react';
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from './utils/storage';
import SignIn from './log/SignIn';
import SignUp from './log/SignUp';
import Appointment from './Appointment/Appointment';
import Block from './muestra/Block';
import SetSchedule from'./Schedule/SetSchedule';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      email: '',
      role: '',
      userId:''
    };
    this.logOut = this.logOut.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token){
       const { token } = obj;
       console.log('AQUI ESTAMOS');
      fetch('/api/account/verify?token=' +token)
      .then(res => res.json())
      .then(json =>{
        if(json.success) {
          this.setState({
            token,
            isLoading: false,
            userId: json.userId
          }, ()=>{
                fetch('/api/account/getById?id='+this.state.userId)
    .then(res=> res.json())
    .then(js =>{
      if(js.success){
        let loading = false;
        let x = this.state.token;
        this.setState({
          email: js.email,
          isLoading: false,
          token: x,
          role: js.role
        }, ()=>{  
        });
        
      }    
    })

          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    }
    else {
      this.setState({
        isLoading: false
      });
    }
  }
  signUp(signUpToken){
    this.setState({
      token: signUpToken
    });
  }  
  signIn(logInToken){
    this.setState({
      token: logInToken
    });
  }
  logOut(){
    this.setState({
      isLoading: true
    });

    const obj = getFromStorage('the_main_app');
    if (obj && obj.token){
       const { token } = obj;
      fetch('/api/account/logout?token=' +token)
      .then(res => res.json())
      .then(json =>{
        if(json.success) {
          this.setState({
            token: '',
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
      isLoading,
      token,
      email,
      role
    } = this.state;
    if(isLoading){
      return (
        <div >
        <p>...Loading...</p>
        </div>);
    }
    if(!token){
      return (
        <div >
          <div>
            <Block/>
          </div>
          <div className="col-sm-8"> 
            <h3 style={{textAlign: "center"}}>Para Agendar su cita por favor regitrese o inicie sesión</h3> 
              <div className="row" style={{ margin: "auto"}}>
                <div className="col-sm-2"></div>
                <SignUp  signUp={this.signUp}/>
                <div className="col-sm-2"></div>
                <SignIn signIn={this.signIn}/>
              </div>
            
          </div>
        </div>
        );
    }
    if(token && email && role==="mPerson"){

//-------------------------------------------------------------------------
// FALTA COMPONENTE PARA REGISTRO DE HORARIO
// CITAS ACTUALES E HISTORIAL 
    return(
      <div>
      <div className="container">
       <div className="row" style={{margin: 'auto'}}>
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
                       
          </div>
          <div className="col-sm-4" style={{margin: 'auto'}}>
          <button type="button" 
             className="btn btn-danger"
             onClick={this.logOut} style={{margin: 'auto'}}>
             Cerrar Sesion</button> 
          </div>
          </div>
          </div>
          <br/>
          <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-6">        
          <h3>Registro de Horario Masajistas</h3>
        <SetSchedule emailUsuario={this.state.email}/>
        </div>
          <div className="col-sm-1"></div>
          <div className="col-sm-4">
          <div className="row">
          <div className="col-sm-6">
          <button type="button" class="btn btn-outline-dark btn-lg">Mis Citas</button>
          </div>
          <div className="col-sm-6">
          <button type="button" class="btn btn-outline-dark btn-lg">Mis Horarios</button>

          </div>
          </div>
          </div>
          <div className="col-sm-1"></div>
          </div>

      </div>
      );
//-------------------------------------------------------------------------

    }
    else if (token && email && role==="client"){
      return (
      <div >
        <div className="row" style={{margin: 'auto'}}>
          <div className="col-sm-5"></div>
          <div className="col-sm-4"></div>
          <div className="col-sm-3" style={{margin: 'auto'}}>
            <div style={{margin: 'auto'}}>


            <div className="row" style={{margin: 'auto'}}>
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
          <button type="button" 
             className="btn btn-danger"
             onClick={this.logOut} style={{margin: 'auto'}}>
             Cerrar Sesion</button>              
          </div>
          <div className="col-sm-4" style={{margin: 'auto'}}>
          </div>
          </div>


            </div>
          </div>
        </div>
        <Appointment emailUsuario={this.state.email}/>
      </div>
    );

    }
    return (
      <div >
        <div className="row" style={{margin: 'auto'}}>
          <div className="col-sm-5"></div>
          <div className="col-sm-4"></div>
          <div className="col-sm-3" style={{margin: 'auto'}}>
            <div style={{margin: 'auto'}}>
            <div className="row" style={{margin: 'auto'}}>
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
          <button type="button" 
             className="btn btn-danger"
             onClick={this.logOut} style={{margin: 'auto'}}>
             Cerrar Sesion</button>              
          </div>
          <div className="col-sm-4" style={{margin: 'auto'}}>
          </div>
          </div>
            </div>
          </div>
        </div>
      <Appointment/>  
      </div>
    );
  }
}

export default Home;
