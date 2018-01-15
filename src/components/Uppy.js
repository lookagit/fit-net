
import React from 'react';
import Dropzone from 'react-dropzone';
var axios = require('axios');
export default class S3Uploader extends React.Component {
  _onDrop = (files) => {
    let url = "";
    if(process.env.NODE_ENV === 'production') {
      url = 'https://wwww.fit-net.herokuapp.com/ping/'
    } else {
      url = 'http://localhost:8081/ping/';
    }
     var file = files[0];
     console.log("JA SAM FILENAME ", file.name, "A JA SAM TYPE ", file.type);
     axios.get(`${url}${file.name}/${file.type}`)
     .then(function (result) {
       console.log(result)

       var signedUrl = result.data;
       var options = {
         headers: {
           'Content-Type': file.type
         }
       };

       return axios.put(signedUrl, file, options);
     })
     .then(function (result) {
       console.log(result);
     })
     .catch(function (err) {
       console.log(err);
     });
   }
  render() {
    return (
      <Dropzone onDrop={ this._onDrop } size={ 150 }>
        <div>
          Drop some files here!
        </div>
      </Dropzone>
    );
  }
}
