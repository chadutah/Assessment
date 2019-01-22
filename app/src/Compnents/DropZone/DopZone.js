import React from 'react';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Papa from 'papaparse';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import '../../App.css';

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
            console.log(response );
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

    onDrop = (acceptedFiles, rejectedFiles) => {
        let config = {
            delimiter: "",	// auto-detect
            newline: "",	// auto-detect
            quoteChar: '"',
            escapeChar: '"',
            header: true,
            transformHeader: undefined,
            dynamicTyping: false,
            preview: 0,
            encoding: "",
            worker: false,
            comments: false,
            step: undefined,
            complete: undefined,
            error: undefined,
            download: false,
            skipEmptyLines: false,
            chunk: undefined,
            fastMode: undefined,
            beforeFirstChunk: undefined,
            withCredentials: undefined,
            transform: undefined
        }

        // Do something with files
        console.log(acceptedFiles[0]);
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const fileAsBinaryString = reader.result;
                // console.log(fileAsBinaryString);
                let sendData = Papa.parse(fileAsBinaryString, config);
                // let dbsendData = sendData.data
                let dbsendData = sendData.data;
                dbsendData.forEach(element => {
                    // console.log(element.person_id)
                    axios.post('/api/data/allData', {
                        person_id: element.person_id,
                        communication_date: element.communication_date,
                        communication_type: element.communication_type,
                        reason: element.reason,
                        direction: element.direction
                    })
                        .then(function (response) {
                            // console.log(response);

                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                });
                alert('Successfully Uploaded');
                alert('Please wait a moment for the db to populate the table')
                this.getData();


            };
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');

            reader.readAsText(file);
        });
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
                <Dropzone onDrop={this.onDrop} className="dropzone">
                    {({ getRootProps, getInputProps, isDragActive }) => {
                        return (
                            <div
                                {...getRootProps() }
                                className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}
                            >
                                <input {...getInputProps() } />
                                {
                                    isDragActive ?
                                        <p>Drop files here...</p> :
                                        <p>Try dropping some files here, or click to select files to upload.</p>
                                }
                            </div>
                        )
                    }}
                </Dropzone>
                <br/>
                <hr />
                <br/>
                <button className="clearbtn" onClick={this.clear} >Clear DB</button>
                <br/>
                <hr/>
                <br/>
                <ReactTable
                    data={this.state.tableData}
                    resolveData={data => data.map(row => row)}
                    columns={columns}
                    className="table"
                />

            </div>
        );
    }
}
export default MyDropzone;