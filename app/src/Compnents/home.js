import React, { Component } from 'react';
import Navbar from './Nav';
import '../App.css';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import Papa from 'papaparse';

class Home extends Component {
    sendForm(event) {
        event.preventDefault();
    
        let createForm = {
          person_id: document.getElementById("person_id").value,
          communication_date: document.getElementById("communication_date").value,
          communication_type: document.getElementById("communication_type").value,
          reason: document.getElementById("reason").value,
          direction: document.getElementById("direction").value
        };
        console.log(createForm);
    
        axios
          .post("/api/data/allData", createForm)
          .then(function(response) {
            // handle success
            console.log(response);
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          })
          .then(function() {
            // always executed
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
                    alert('Please wait a moment for the database to update');
                    this.getData();
    
    
                };
                reader.onabort = () => console.log('file reading was aborted');
                reader.onerror = () => console.log('file reading has failed');
    
                reader.readAsText(file);
            });
        }
    
    render(props) {
        return (
            <div className="home">
                <Navbar />
                <br />
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
                <br />

                <form className="form-style-7">
                    <ul>
                        <li>
                            <label className="person_id">Person Id</label>
                            <input id="person_id" type="number" name="person_id"  />
                            <span>Enter Person Id here</span>
                        </li>
                        <li>
                            <label className="communication_date">Communication Date</label>
                            <input id="communication_date" default={Date.now()} type="text" name="communication_date"  />
                            <span>Enter date of communication</span>
                        </li>
                        <li>
                            <label className="communication_type">Communication Type</label>
                            <input id="communication_type" type="text" name="communication_type"  />
                            <span>Enter type of communication</span>
                        </li>
                        <li>
                            <label className="reason">Reason</label>
                            <input id="reason" type="text" name="reason"  />
                            <span>Enter Reason for communication</span>
                        </li>
                        <li>
                            <label className="direction">Direction</label>
                            <input id="direction" type="text" name="direction"  />
                            <span>Inbound or Outbound</span>
                        </li>
                        <li>
                            <input onClick={this.sendForm} type="submit" value="Send" className="submitbtn"/>
                        </li>
                    </ul>
                </form>

            </div>
        );
    }
}

export default Home;