import React from 'react';
import { withRouter } from 'react-router-dom';
import Loading from 'react-loading-components';
import faker from 'faker';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import UppyCertificates from '../UppyCertificates';
import css from '../styles/styles.scss';
import logoBright from '../../../static/logoBright.png';

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
      openDialog: false,
      socialMessage: '',
    };
  }
  handleOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };
  certsUpload = async () => {
    let url = '';
    const { files } = this.state;
    if (files.length) {
      this.setState({ loading: true });
      await this.props.updateHasCertificates({
        variables: {
          fisioId: parseInt(this.props.match.params.userId),
          hasCerificates: true,
        },
      });
      const uploadFiles = await files.map(async item => {
        const cloudUrl = `https://api.cloudinary.com/v1_1/drama/upload`;
        const cloudPreset = `ioxmokvx`;
        const formData = new FormData();
        formData.append('file', item);
        formData.append('upload_preset', cloudPreset);
        const uploadNow = await axios({
          url: cloudUrl,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: formData,
        });
        if (uploadNow.status === 200) {
          await this.props.certCreate({
            variables: {
              name: 'nekoImeStaTiJaZnam',
              certUrl: `${uploadNow.data.secure_url}`,
              fisioClId: parseInt(this.props.match.params.userId),
            },
          });
        }
      });
      Promise.all(uploadFiles).then(() => this.props.history.push(`/moreSkillsFisio/${parseInt(this.props.match.params.userId)}`));
    } else {
      this.setState({
        openDialog: true,
        socialMessage: 'Niste uploadovali nijedan sertifikat. Ukoliko želite da se vaši sertifikati prikažu potencijalnim klijentima kliknite Nazad i uploadujte sertifikate, ukoliko nemate sertifikate kliknite Dalje. Hvala!',
      });
    }
  }
  render() {
    const actions = [
      <FlatButton
        label="Nazad"
        labelColor="#fff"
        labelStyle={{ fontWeight: '700', color: '#fff' }}
        style={{ color: '#fff' }}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Dalje"
        labelColor="#fff"
        labelStyle={{ fontWeight: '700', color: '#fff' }}
        style={{ color: '#fff' }}
        onClick={() => this.props.history.push(`/moreSkills/${parseInt(this.props.match.params.userId)}`)}
      />,
    ];
    return (
      <div>
        <Dialog
          title={(
            <img
              alt="FIT NET"
              src={logoBright}
              width="150px"
              height="75px"
              style={{
                borderRadius: '50%',
              }}
            />
          )}
          paperProps={{
            zDepth: 3,
            style: {
              backgroundColor: '#15233c',
            },
          }}
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleClose}
        >
          <h4
            style={{
              color: '#fff',
            }}
          >
            {this.state.socialMessage}
          </h4>
        </Dialog>
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
                    onClick={() => {
                      if (this.state.files.length) {
                        this.certsUpload();
                      } else {
                        this.setState({
                          openDialog: true,
                          socialMessage: 'Niste uploadovali nijedan sertifikat. Ukoliko zelite da se vasi sertifikati prikazu potencijalnim klijentima kliknite Nazad i uploadujte sertifikate, ukoliko nemate sertifikate kliknite Dalje',
                        })
                      }
                    }}
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
