import React, { Component } from 'react';
import './UploadButton.css';
import Fab from '@material-ui/core/Button';

class UploadButton extends Component {
  render(props) {
    return (
      <div className="UploadButton">
      <Fab variant="extendedFab" aria-label="Upload" >
        click
      </Fab>
      
      </div>
    );
  }
}

export default UploadButton;