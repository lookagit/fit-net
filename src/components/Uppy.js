
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
      url = 'http://apps.fit-net.rs/ping/';
    } else {
      url = 'http://localhost:8081/ping/';
    }
    const file = files[0];
    this.setState({
      prev: file.preview,
    });
    if (this.props.setRegister) {
      this.props.setRegister(files[0]);
    }
  }
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {
          this.state.prev ?
            <img
              style={{
                paddingBottom: '20px',
              }}
              alt="fit-net-placeholder"
              width="160"
              height="160"
              src={this.state.prev}
            />
            : null
        }
        <Dropzone 
          onDrop={this.onDrop}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
            width: '700px',
            border: '3px white dashed',
        }}>
          <div>
            <h3 style={{ color: '#fff' }}>
              Postavite profilnu sliku
            </h3>
          </div>
        </Dropzone>
      </div>
    );
  }
}
