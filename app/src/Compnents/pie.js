import createG2 from 'g2-react';
import { Stat } from 'g2';
import React, { Component } from 'react';
import DataAPI from "../utilities/DataAPI";
import Navbar from './Nav';
import '../App.css';

const Pie = createG2(chart => {
    chart.coord('theta');
    chart.intervalStack().position(Stat.summary.proportion()).color('item').label('count');
    chart.render();
  });
  const Pie2 = createG2(chart => {
    chart.coord('theta');
    chart.intervalStack().position(Stat.summary.proportion()).color('item').label('count');
    chart.render();
  });
class Piechart extends Component {

    state = {
        total: 0,
        data: [],
        data2: [],
        width: 500,
        height: 500,
        plotCfg: {
            margin: [10, 100, 50, 120],
        },
        tCount: 0
    }

    // Get data for chart 
    getData = () => {
        DataAPI.getAllCount().then(res => {
            console.log(res.data);
        })
        DataAPI.getDataType("text").then(res => {
            console.log(res.data)
            this.setState({ data: [...this.state.data, {item: "text", count: res.data }]})
            DataAPI.getDataType("call").then(res => {
                this.setState({ data: [...this.state.data, {item: "call", count: res.data }]})
                DataAPI.getDataType("email").then(res => {
                    this.setState({
                        data: [...this.state.data, {item: "email", count: res.data }]
                    })
                    
                })
            })
        })
        DataAPI.getDataType("transfer").then(res => {
            console.log(res.data);
            this.setState({ data2: [...this.state.data2, {item: "transfer", count: res.data }]})
            DataAPI.getDataType("forbearance").then(res => {
                this.setState({ data2: [...this.state.data2, {item: "forbearance", count: res.data }]})
                DataAPI.getDataType("repayment").then(res => {
                    this.setState({
                        data2: [...this.state.data2, {item: "repayment", count: res.data }]
                    })
                    
                })
            })
        })
    }

    componentDidMount = () => {
        this.getData();
    }

    render() {
        return (
            <div className="pies">
            <Navbar />
            <div className="charts">
            <Pie
                data={this.state.data}
                width={this.state.width}
                height={this.state.height}
                plotCfg={this.state.plotCfg}
                className="pieChart"
                ref="myChart"
            />
            <Pie2
                data={this.state.data2}
                width={this.state.width}
                height={this.state.height}
                plotCfg={this.state.plotCfg}
                className="pieChart2"
                ref="myChart2"
            />
            </div>
            </div>
        );
    }
}

export default Piechart;