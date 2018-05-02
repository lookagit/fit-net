import React from 'react';
import Dropzone from 'react-dropzone';
import logoBright from '../../static/logoBright.png';

export default class S3Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevArray: [],
    };
  }
  onDrop = async files => {
    const prevAndReal = this.state.prevArray.length + files.length;
    if (files.length <= 10 && prevAndReal <= 10) {
      this.setState({
        prevArray: [...this.state.prevArray, ...files],
      });
      this.props.setRegister([...this.state.prevArray, ...files]);
    }
  }
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            paddingBottom: '15px',
          }}
        >
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
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              alt="FIT NET"
              src={logoBright}
              width="150px"
              height="75px"
              style={{
                borderRadius: '50%',
              }}
            />
            <h3
              style={{
                color: '#068ed8',
                textAlign: 'center',
              }}
            >
              Prevucite sliku ili kliknite ovde!
            </h3>
          </div>
        </Dropzone>
      </div>
    );
  }
}
