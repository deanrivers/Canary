import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios'

//import components
import Nav from './components/nav'
import Details from './components/details'
import Device from './components/devices'


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      modalClass: 'add-device-modal-inactive',
      objectData: 'route test',
      ///dummyData :[{"name":"Dean's Bedroom","type":"temperature","value":"73","createdAt":"2018-06-01T18:27:51.699Z","updatedAt":"2018-06-01T18:27:51.699Z","id":"Syg4xfke7"},{"name":"Figgis Agency","type":"humidity","value":"52","createdAt":"2018-06-01T18:28:23.217Z","updatedAt":"2018-06-01T18:28:23.218Z","id":"ByyLef1em"},{"name":"Front Desk","type":"airquality","value":"97","createdAt":"2018-06-01T18:28:57.650Z","updatedAt":"2018-06-01T18:28:57.650Z","id":"rkfOgMJe7"},{"name":"Canary Office","createdAt":"2018-06-07T18:59:02.706Z","updatedAt":"2018-06-07T18:59:02.715Z","id":"Sk1txZvxX"},{"name":"Eric's \\0ffice","createdAt":"2019-09-16T18:28:01.918Z","updatedAt":"2019-09-16T18:28:01.919Z","id":"HyqVV8p8B"}],
      dummyData: [],
    };
    this.addDevice = this.addDevice.bind(this)
    this.submitDevice = this.submitDevice.bind(this)
    this.removeClicked = this.removeClicked.bind(this)
    this.cancelClicked = this.cancelClicked.bind(this)
  }

  addDevice(){
    //bring in modal
    console.log('add clicked')
    this.setState({modalClass: 'add-device-modal-active'})
  }

  submitDevice(e){
    e.preventDefault()
    console.log('submit clicked')
    console.log(this.state.dummyData)

    var array = this.state.dummyData

    var isValid = false

    //set values for device
    var id = Math.floor((Math.random()*1000))
    var name = document.getElementById("name-input").value
    var type = document.getElementById("modal-dropdown").value
    var timeNow = Date.now()
    var value;
    console.log(type)

    //validate fields
    if(name === ''){
      console.log(name)
      alert('Please enter a name')
    } else{
      isValid = true
    }

    //randomize values
    if(type === "temperature"){
      value = Math.floor(Math.random()*100)
    } else if(type === "humidity"){
      value = Math.floor(Math.random()*100)
    } else{
      value = Math.floor(Math.random()*500)
    }

    console.log(value)
    
    //push name to array
    if(isValid){
      array.push({'name':name,'type':type,'value':value,'id':id})

      this.setState({dummyData:array, modalClass: 'add-device-modal-inactive'})

      //this.postData()
      //post via axios
      axios.post('http://5d6ddcb7777f670014036266.mockapi.io/api/v1/devices', {
        'name': name,
        'type': type,
        'value': value,
        'createdAt': timeNow
      })
      .then( data => {
        console.log(data)
        console.log('triggere')
      })
      .catch( error => {
          console.log(error)
      })

      //reset input fields
      document.getElementById("name-input").value = ''
    }

  }

  removeClicked(key){
    console.log('parent remove triggered');
    console.log(key)

    var array = [...this.state.dummyData]
    var index = array.indexOf(key)

    
    //remove device
    if(index !== -1){
        const name = array[index]['name']
        array.splice(index,1);
        console.log(name)

        // axios.delete("http://5d6ddcb7777f670014036266.mockapi.io/api/v1/devices", { params: { 'name': name } })
        // .then(response => {
        //   console.log(response);
        // });

        this.setState({dummyData: array })

        
    }
    console.log('remove parent array state')
    console.log(this.state.dummyData);

  }

  cancelClicked(){
    this.setState({ modalClass: 'add-device-modal-inactive' })
    document.getElementById("name-input").value = ''
  }

  render(){

    return(
      <div id="main-app-container">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>

        <Router>
          <Route>
            <Switch>              
              <Route path="/devices" render={()=><Device objectData={this.state.dummyData} add={this.addDevice} remove={this.removeClicked}/>}/>
              <Route path="/details" render={()=> <Details objectData={this.state.dummyData}/>}/>
            </Switch>
          </Route>
          <Nav/>
        </Router>
        <div id={this.state.modalClass}>
          <div id="modal-content">
              <div id="modal-inputs">
                <input type="text" placeholder="device-name" id="name-input"></input>
                <select id="modal-dropdown">
                  <option>temperature</option>
                  <option>humidity</option>                  
                  <option>air quality</option>                  
                </select>
                {/* <input type="text" placeholder="value" id="value-input"></input> */}
              </div>              
              <button name="submit" id="submit-modal-button" onClick={this.submitDevice}>Submit</button>
              <button name="cancel" id="modal-cancel-button" onClick={this.cancelClicked}>Cancel</button>
          </div>
        </div>
        
      </div>
    );
  }
}
export default App;

