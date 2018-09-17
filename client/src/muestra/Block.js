import React, { Component } from 'react';

class Block extends Component{
  constructor(props){
    super(props);
    this.state={
      types: []
    }
  }
  componentWillMount() {
    fetch('/types')
    .then(res =>res.json())
    .then(json=>{
      if (json.success) {
        let types = json.types;
        this.setState({
          types: types
        });
      }
    });
  };

  render (){
    let tList = [];
    tList = this.state.types;
        if(tList.length>0){
      let ms = tList.map((n,i)=>{
        return (
              <div className="col-sm-4" key={n.name + n.id}>
                  <h4 style={{textAlign: "center"}}>{n.name}</h4>
                  <img src={n.img} 
                  alt={n.name} 
                  className="img-thumbnail"/>
                  <br/>
              </div>
                
              );
            });

      return (
          <div className="container-fluid" style={{ margin: "auto"}}>
          <h2 style={{textAlign: "center"}}> Nuestros masajes</h2>
            <div className="row">
              {ms}
              <hr/>
              <br/>
            </div>
            <br/>
          </div>

          );
            }
        return (
          <div>
            <h3>Lista de masajes</h3>
            <h4>Vacia :(</h4>
          </div>

          );
  };
};

export default Block;