import React from 'react';
import { withRouter } from 'react-router-dom';
import faker from 'faker';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import UppyCertificates from '../UppyCertificates';
import css from '../styles/styles.scss';

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
      files.map(async item => {
        const fakerUuid = faker.random.uuid();
        const fileType = item.type.split('/').pop();
        const uniqueNameForImg = `${fakerUuid}.${fileType}`;
        if (process.env.NODE_ENV === 'production') {
          url = 'https://honesty-app.herokuapp.com/ping/';
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
            await this.props.certCreate({
              variables: {
                name: 'nekoImeStaTiJaZnam',
                certUrl: `https://s3.eu-central-1.amazonaws.com/zaluku/${uniqueNameForImg}`,
                personClId: parseInt(this.props.match.params.userId),
              },
            });
            this.props.history.push(`/moreSkills/${parseInt(this.props.match.params.userId)}`);
          } else {
            console.log('IZDUVASMO GA BATICE ', putOnServer);
          }
        }
      });
    }
  }
  render() {
    return (
      <div    
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          paddingTop: '30px',
        }}
      >
        <div
          style={{
            paddingBottom: '15px',
          }}
        >
          <h2
            style={{
              color: '#fff',
            }}
          >
            Mozete ubaciti do 10 sertifikata
          </h2>
        </div>
        <UppyCertificates setRegister={files => this.setState({ files })} />
        <div
          className={css.sendParams}
          style={{
            width: '190px',
            marginTop: '25px',
          }}
          onClick={() => this.certsUpload()}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h3
              style={{
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              SNIMITE
            </h3>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(UploadCertificates);