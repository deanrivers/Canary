import React, { Component } from 'react';
import DeviceChildren from './deviceChildren'
import axios from 'axios'
import camera from '../assets/camera.png'

class Device extends Component {
    constructor(props){
        super(props);    
        this.state = {            
            deviceChildren: [],
            oneObjectData: [{"name":"Dean's Bedroom","type":"temperature","value":"73","createdAt":"2018-06-01T18:27:51.699Z","updatedAt":"2018-06-01T18:27:51.699Z","id":"Syg4xfke776"}],
            transferData : this.props.objectData,
        };      
        this.removeClicked = this.removeClicked.bind(this);
    }

    componentWillMount(){
        axios.get('/myapi/getDevices')
            .then( data => {
                console.log(data)
            })
            .catch( error => {
                console.log(error)
            })
    }
    fetchData = async () => {
        const response = await axios.get('/myapi/getDevices')
        const data = await response.data
    }

    componentDidMount(){
        var props = this.props.objectData
        var array = []
        array.push(props)
        console.log(array)        
        console.log('before')
        console.log(this.state.transferData)
       // this.setState({transferData: array}
        console.log('after')
        console.log(this.state.transferData) 
        
    }

    removeClicked(key){
        this.props.remove(key)
        var array = [...this.state.transferData]
        var index = array.indexOf(key)

        //remove device
        if(index !== -1){
            array.splice(index,1);
            this.setState({transferData: array })
        }
    console.log(array)
    console.log('remove child array state')
    console.log(this.state.transferData)
    }

    render(){    
        return(
            <div id="devices-main-container">
                <div id="device-flex-container-children">
                    {this.state.transferData.map(i => {
                        const id = i['id']
                        //console.log(id)
                        return (
                            <DeviceChildren key={i['id']}name={i['name']} type={i['type']} temp={i['temperature']} value={i['value']} removeClicked={ () => this.removeClicked(i)} />
                        )
                    })}      
                </div>
                <div id="add-button-container">
                    <img src={camera}></img>
                    <button id="add-button" onClick={this.props.add}  >Add New Device</button>
                </div>
            </div>        
        );
    }
}
export default Device;