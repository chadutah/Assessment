import React from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import '../../App.css';
import Navbar from '../Nav';

class MyDropzone extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tableData: []

        }

    }
    clear = () => {
        axios.delete('/api/data/allData')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getData = () => {
        let that = this;
        let tdata = [];
        axios.get('/api/data/allData')
            .then(function (response) {
                console.log(response);
                response.data.forEach(element => {
                    // console.log(element.communication_type)
                    let obj = {
                        person_id: element.person_id,
                        communication_date: element.communication_date,
                        communication_type: element.communication_type,
                        reason: element.reason,
                        direction: element.direction

                    }
                    // console.log(obj);
                    tdata.push(obj);
                });
                that.setState({
                    tableData: tdata

                });


                console.log(that.state.tableData)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentWillMount = () => {
        this.getData();
    }


    render() {
        const columns = [{
            Header: 'Person Id',
            accessor: 'person_id' // String-based value accessors!
        }, {
            Header: 'Communcation Date',
            accessor: 'communication_date',
        }, {
            Header: 'Communication Type',
            accessor: 'communication_type' // String-based value accessors!
        }, {
            Header: 'Reason',
            accessor: 'reason',
        }, {
            Header: 'Direction',
            accessor: 'direction',
        }]
        return (
            <div>
            <Navbar/>
                
                <br />
                <ReactTable
                    data={this.state.tableData}
                    resolveData={data => data.map(row => row)}
                    columns={columns}
                    className="table"
                />
                <br />
                <button className="clearbtn" onClick={this.clear} >Clear DB</button>
                <br />
                <br />

            </div>
        );
    }
}
export default MyDropzone;