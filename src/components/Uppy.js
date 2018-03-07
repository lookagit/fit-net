
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
    console.log('JA SAM FAJLIC HEHE ', file);
    // axios.get(`${url}${file.name}/${file.type}`).then(result => {
    //   console.log(result)
    //   let signedUrl = result.data;
    //   let options = {
    //     headers: {
    //       'Content-Type': file.type
    //     },
    //   };
    //   return axios.put(signedUrl, file, options);
    // }).then(result => {
    //   console.log(result);
    // }).catch(err => {
    //   console.log(err);
    // });
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
        <Dropzone onDrop={this.onDrop} size={150}>
          <div>
            Drop some files here!
          </div>
        </Dropzone>
      </div>
    );
  }
}
