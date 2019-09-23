import React, { Component } from 'react';
import Logo from '../assets/sensor.png';
import Thermometer from '../assets/thermometer.png'

import { NavLink } from "react-router-dom";

class Nav extends Component {

    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return(
            <div id="nav">
                <div id="nav-flex">

                    <NavLink activeClassName="activeRoute" to="/devices">
                        <div className="link-container">
                            <img src={Logo} alt="devices"></img>
                        </div>
                        
                    </NavLink>
                    
                    <NavLink activeClassName="activeRoute" to="/details">
                        <div className="link-container">
                            <img src={Thermometer} alt="devices"></img>
                        </div>
                    </NavLink>
                    


                </div>
            </div>
        );
    }
}
export default Nav;