import React, { Component } from 'react';
import settings from '../assets/settings.png';

import canaryView from '../assets/canary_view.png'



class DeviceChildren extends Component {
    // settingsClicked(){
    //     console.log('Settings Clicked');
    //     this.setState({settingsDisplay: 'settings-popup-active' })
    // }

    closeClicked(){
        this.setState({ settingsDisplay: 'settings-popup-inactive'})
    }
    settingsClicked(){
        console.log('Settings Clicked');
        this.setState({settingsDisplay: 'settings-popup-active' })
    }   

    constructor(props){
        super(props);
    
        this.state = {
            settingsDisplay: 'settings-popup-inactive'
        };
        
        // this.settingsClicked = this.settingsClicked.bind(this)
        this.closeClicked = this.closeClicked.bind(this)
        //this.removeClicked = this.removeClicked.bind(this)
        this.settingsClicked = this.settingsClicked.bind(this)
    }
    
    render(){

        const randomizer = Math.floor(Math.random()*10)

        const props = this.props

        const html =        <div className="settings-container"> 
                                <div className={this.state.settingsDisplay}>
                                    <div className="settings-component-container">
                                        <div className="close-button-container">
                                            <button className="close-button" onClick={this.closeClicked}>x</button>
                                        </div>
                                        <div className="remove-button-container" >                                        
                                            <button className="remove-button" onClick={this.props.removeClicked} ref="removeButton">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
       
        return(
            <div className="device-comp-container" ref="device">                
                <div id="device-container">
                    {html}
                    
                    <div className="device-content-container">
                        <div className="device-header">

                            <p>{props.name}</p>
          
                            <h3 className="device-count">{this.props.text}</h3>
                            <img className="settings-image" src={settings} alt="settings" onClick={this.settingsClicked}></img>
                        </div>
                        <hr/>

                        <div className="device-image-container">
                            <img className="device-image" src={canaryView} alt="device"></img>
                                            

                        </div>
                    </div>                    
                </div>
            </div>
            
            
        );
    }
}
export default DeviceChildren;