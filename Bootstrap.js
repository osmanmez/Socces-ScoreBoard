import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { render } from 'react-dom';

class Bootstrap extends Component {
  

  render() {
    return (
      <div className ="container">
        <div className="row">
            <div className="col" > 
                12
            </div>
        </div>
        <div className="row">
            <div  className="col" > 
                6
            </div>
            <div className="col">
                6
            </div>
            </div>
        <div className="row">
            <div className="col">
                12
            </div>            
        </div>
        <div className="row">
            <div className="col">
                12
            </div>
            
        </div>
    </div>
    );
  }
}


export default Bootstrap;