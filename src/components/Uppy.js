
import React from 'react';
import Dropzone from 'react-dropzone';
const axios = require('axios');

export default class S3Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prev: null,
      prevArray: [],
    };
  }
  onDrop = async files => {
    let url = '';
    if (process.env.NODE_ENV === 'production') {
      url = 'https://honesty-app.herokuapp.com/ping/';
    } else {
      url = 'http://localhost:8081/ping/';
    }
    let file = files[0];
    this.setState({
      prev: file.preview,
    });
    if (this.props.setRegister) {
      this.props.setRegister(files[0]);
    }
  }
  render() {
    return (
      <div>
        {
          this.state.prev ?
            <img
              
              alt="jojo"
              width="130"
              height="130"
              src={this.state.prev}
            />
            : null
        }
        <Dropzone 
          onDrop={this.onDrop}
          style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'100px',
            width:"700px",
            border:'2px red dashed'
        }}>
          <div>
            Drop some files here!
          </div>
        </Dropzone>
      </div>
    );
  }
}
