import React, { Component } from 'react'
import Chart from 'react-apexcharts'

class Details extends Component {

    componentWillMount(){
        this.setState({transferredData: this.props.objectData})
        console.log(this.state.transferredData)
    }

    constructor(props){
        super(props);
    
        this.state = {
            transferredData:[{}],
            options: {},
        };
    }

    render(){
        return(
            <div id="details-main-container">
                <div id="details-sub-container">
                

                {this.state.transferredData.map(i => {

                    const name = []
                    const value = []
                    value.push(i['value'])

                    return (
                        <div id="details-parent-container" key={i}>
                            <div className="details-children">
                            <div className="name-container"><h1>{i['name']}</h1></div>
                            
                            {/* temperature */}
                            {i['type'] ==='temperature' ? <div className="temperature"><h2>Temperature (Celsius)</h2><h2>{i['value']}</h2></div>:null}
                   

                            {/* humidity */}
                            {i['type'] === 'humidity' ? <div className="humidity"><h2>Humidity (%)</h2><h2>{i['value']}</h2></div>:null}
                            <div className="chart-container">
                                <Chart
                                    options={this.state.options}
                                    series={value}
                                    type="radialBar"
                                    width="380"
                                    labels={['progress']}
                                />
                            </div>
                            </div>
                            
                            
                            <hr/>
                        </div>
                    )

                    })}
                </div>
                
            </div>
        );
    }
}
export default Details;