import React from 'react';
import Dropzone from 'react-dropzone';

export default class S3Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const prevAndReal = this.state.prevArray.length + files.length;
    if (files.length <= 5 && prevAndReal <= 5) {
      this.setState({
        prevArray: [...this.state.prevArray, ...files],
      });
      this.props.setRegister([...this.state.prevArray, ...files]);
    } else {
      console.log("JA SAM POPUNJEN MOLIMTE ISPRAZNI ");
    }
  }
  render() {
    return (
      <div>
        <div>
          {
            this.state.prevArray.length ?
              this.state.prevArray.map((item, index) => (
                <img
                  key={index}
                  alt="jojo"
                  width="130"
                  height="130"
                  src={item.preview}
                />
              ))
              : null
          }
        </div>
        <Dropzone onDrop={this.onDrop} size={150}>
          <div>
            Prebacite slike
          </div>
        </Dropzone>
      </div>
    );
  }
}
