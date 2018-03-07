import React from 'react';
import { withRouter } from 'react-router-dom';
import UppyCertificates from '../UppyCertificates';
import faker from 'faker';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
const axios = require('axios');

@graphql(
  gql`
  mutation certificateCreate($name: String, $certUrl: String, $personClId: Int) {
    certificateCreate(name: $name, certUrl: $certUrl, personClId: $personClId) {
      name
      certUrl
    }
  }`,
  {
    name: 'certCreate',
  },
)
class UploadCertificates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploadedArr: [],
    };
  }
  certsUpload = async () => {
    let url = '';
    const { files } = this.state;
    if (files.length) {
      const filesUpload = files.map(async item => {
        const fakerUuid = faker.random.uuid();
        const fileType = item.type.split('/').pop();
        const uniqueNameForImg = `${fakerUuid}.${fileType}`;
        if (process.env.NODE_ENV === 'production') {
          url = 'https://fit-net.herokuapp.com/ping/';
        } else {
          url = 'http://localhost:8081/ping/';
        }
        const axiosStuff = await axios.get(`${url}${uniqueNameForImg}/${item.type}`);
        if (axiosStuff) {
          const signedUrl = axiosStuff.data;
          const options = {
            'Content-Type': item.type,
          };
          const putOnServer = await axios.put(signedUrl, item, options);
          if (putOnServer) {
            this.setState({
              uploadedArr: [...this.state.uploadedArr, putOnServer],
            });
            const letsMutate = await this.props.certCreate({
              variables: {
                name: 'nekoImeStaTiJaZnam',
                certUrl: `https://fitnetbucket.s3.eu-west-3.amazonaws.com/${uniqueNameForImg}`,
                personClId: parseInt(this.props.match.params.userId),
              },
            });
            console.log("JA SAM LETS MUTATE ", letsMutate);
          } else {
            console.log("IZDUVASMO GA BATICE ", putOnServer);
          }
        }
      });
    }
  }
  render() {
    console.log("E JA NESTO RENDERUJEM RI{ ", this.props);
    return (
      <div    
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            color: '#fff',
          }}
        >
          Mozete ubaciti do 5 sertifikata
        </h2>
        <UppyCertificates setRegister={files => this.setState({ files })} />
        <h3
          onClick={() => this.certsUpload()}
        >
          POSALJI
        </h3>
      </div>
    );
  }
};

export default withRouter(UploadCertificates);