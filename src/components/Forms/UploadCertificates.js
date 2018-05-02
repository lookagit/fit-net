import React from 'react';
import { withRouter } from 'react-router-dom';
import Loading from 'react-loading-components';
import faker from 'faker';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import UppyCertificates from '../UppyCertificates';
import css from '../styles/styles.scss';

const axios = require('axios');
@withRouter
@graphql(
  gql`
  mutation certificateCreate($name: String, $certUrl: String, $fisioClId: Int) {
    certificateCreate(name: $name, certUrl: $certUrl, fisioClId: $fisioClId) {
      name
      certUrl
    }
  }`,
  {
    name: 'certCreate',
  },
)
@graphql(
  gql`
  mutation updateFisioCertificates($fisioId: Int, $hasCerificates: Boolean) {
    updateFisioCertificates(fisioId: $fisioId, hasCerificates: $hasCerificates) {
      id
    }
  }`,
  {
    name: 'updateHasCertificates',
  },
)
class UploadCertificates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploadedArr: [],
      loading: false,
    };
  }
  certsUpload = async () => {
    this.setState({ loading: true });
    let url = '';
    const { files } = this.state;
    if (files.length) {
      await this.props.updateHasCertificates({
        variables: {
          fisioId: parseInt(this.props.match.params.userId),
          hasCerificates: true,
        },
      });
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
                name: 'Certificate for fisio Fit-net.rs',
                certUrl: `https://s3.eu-central-1.amazonaws.com/zaluku/${uniqueNameForImg}`,
                fisioClId: parseInt(this.props.match.params.userId),
              },
            });
            this.props.history.push(`/moreSkillsFisio/${parseInt(this.props.match.params.userId)}`);
          }
        }
      });
    }
  }
  render() {
    return (
      <div>
        {
          this.state.loading ?
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Loading
                type="puff"
                width={150}
                height={150}
                fill="#f44242"
              />
              <h3
                style={{
                  color: '#fff',
                }}
              >
                Molimo sačekajte. Hvala!
              </h3>
            </div>
             :
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
                  Mozete ubaciti do 10 sertifikata ukoliko nemate sertifikate pritisnite dalje da nastavite sa registracijom
                </h2>
              </div>
              <UppyCertificates setRegister={files => this.setState({ files })} />
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    margin: '0 auto',
                  }}
                >
                  <div
                    className={css.sendParams}
                    style={{
                      width: '190px',
                      marginTop: '25px',
                      cursor: 'pointer'
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
                      SAČUVAJTE
                      </h3>
                    </div>
                  </div>
                  <div
                    className={css.sendParams}
                    style={{
                      width: '190px',
                      marginTop: '25px',
                      cursor: 'pointer',
                    }}
                    onClick={() => this.props.history.push(`/moreSkillsFisio/${this.props.match.params.id}`)}
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
                        DALJE
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
      </div>
    );
  }
}

export default withRouter(UploadCertificates);
