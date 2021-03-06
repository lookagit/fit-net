import React from 'react';
import { withRouter } from 'react-router-dom';
import Loading from 'react-loading-components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Compress from 'compress.js';
import UppyCertificates from '../UppyCertificates';
import css from '../styles/styles.scss';
import logoBright from '../../../static/logoBright.png';
import removeImg from '../../../static/remove.png';

const compress = new Compress();

const axios = require('axios');

@withRouter
@graphql(
  gql`
  mutation certificateCreate($name: String, $certUrl: String, $fisioClId: Int) {
    certificateCreate(name: $name, certUrl: $certUrl, fisioClId: $fisioClId) {
      id
      name
      certUrl
      fisioClId
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
@graphql(
  gql`
  mutation removeUserCertificates($certUrl: String) {
    removeUserCertificates(certUrl: $certUrl) {
      status
      message
    }
  }`,
  {
    name: 'removeCertificate',
  },
)

class EditFisioCertificates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      openDialog: false,
      socialMessage: '',
      myCertificates: [],
      id: null,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    if (window) {
      const isLogedIn = await window.localStorage.getItem('fbToken');
      if (isLogedIn) {
        const { accessToken } = JSON.parse(isLogedIn);
        if (accessToken) {
          const { userFisio } = accessToken;
          const { allCertificates, id } = userFisio;
          this.setState({
            myCertificates: allCertificates,
            id,
          });
        }
      }
    }
  }


  setCertificatesInLocal = async certificates => {
    const isLogedIn = await window.localStorage.getItem('fbToken');
    if (isLogedIn) {
      const { accessToken } = JSON.parse(isLogedIn);
      if (accessToken) {
        const { userFisio } = accessToken;
        userFisio.allCertificates = [...userFisio.allCertificates, ...certificates];
        await window.localStorage.setItem('fbToken', JSON.stringify({ accessToken: { ...accessToken, userFisio } }));
      }
    }
  }

  removeCertificate = async cerItem => {
    const myCertificates = this.state.myCertificates.filter(item => (
      item.certUrl !== cerItem.certUrl
    ));
    this.setState({
      myCertificates,
    });
    const { data } = await this.props.removeCertificate({
      variables: {
        certUrl: cerItem.certUrl,
      },
    });
    const { removeUserCertificates } = data;
    if (removeUserCertificates.status === 200) {
      const isLogedIn = await window.localStorage.getItem('fbToken');
      if (isLogedIn) {
        const { accessToken } = JSON.parse(isLogedIn);
        if (accessToken) {
          const { userFisio } = accessToken;
          userFisio.allCertificates = [...myCertificates];
          await window.localStorage.setItem('fbToken', JSON.stringify({ accessToken: { ...accessToken, userFisio } }));
        }
      }
    }
  }

  certsUpload = async () => {
    let url = '';
    const { myCertificates } = this.state;
    const justNewCer = myCertificates.filter(item => (
      item.personClId === undefined
    ));
    if (justNewCer.length) {
      this.setState({ loading: true });
      await this.props.updateHasCertificates({
        variables: {
          fisioId: parseInt(this.state.id),
          hasCerificates: true,
        },
      });
      const compressedFile = await compress.compress(justNewCer, {
        size: 4, // the max size in MB, defaults to 2MB
        quality: 0.55, // the quality of the image, max is 1,
        maxWidth: 1920, // the max width of the output image, defaults to 1920px
        maxHeight: 1920, // the max height of the output image, defaults to 1920px
        resize: true, // defaults to true, set false
      });
      const filesUpload = await compressedFile.map(async item => {
        const cloudUrl = `https://api.cloudinary.com/v1_1/drama/upload`;
        const cloudPreset = `ioxmokvx`;
        const base64Str = item.data;
        const imgExt = item.ext;
        const filer = Compress.convertBase64ToFile(base64Str, imgExt);
        const formData = new FormData();
        formData.append('file', filer);
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
          const { data } = await this.props.certCreate({
            variables: {
              name: 'UploadedFitNetPersonCertify',
              certUrl: `${uploadNow.data.secure_url}`,
              fisioClId: parseInt(this.state.id),
            },
          });
          const { certificateCreate } = data;
          if (certificateCreate) {
            return certificateCreate;
          }
        }
      });
      Promise.all(filesUpload).then(certify => {  //eslint-disable-line
        this.setCertificatesInLocal(certify);
        this.setState({
          openDialog: true,
          socialMessage: 'Uspesno ste uploadovali sertifikate. Hvala!',
        });
      });
    } else {
      this.setState({
        openDialog: true,
        socialMessage: 'Uspesno sacuvani sertifikati. Hvala!',
      });
    }
  }

  handleOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
    this.props.history.goBack();
  };

  render() {
    const actions = [
      <FlatButton
        label="Hvala"
        labelColor="#fff"
        labelStyle={{ fontWeight: '700', color: '#fff' }}
        style={{ color: '#fff' }}
        keyboardFocused
        onClick={this.handleClose}
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
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
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
                Molimo sačekajte.
              </h3>
              <h3
                style={{
                  color: '#fff',
                }}
              >
                Upload može potrajati duže ako su slike veće rezolucije.
              </h3>
              <h4
                style={{
                  color: '#fff',
                }}
              >
                Hvala na razumevanju!
              </h4>
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
                    textAlign: 'center',
                    margin: '10px',
                  }}
                >
                  Mozete ubaciti do 10 sertifikata.
                </h2>
              </div>
              <div style={{ display: 'flex', marginBottom: 10 }}>
                {
                  this.state.myCertificates.map((item, key) => (
                    <div
                      style={{
                        width: '150px',
                        height: '150px',
                        paddingRight: '10px',
                      }}
                      key={key}
                    >
                      <div
                        style={{
                          position: 'absolute',
                        }}
                        onClick={() => {
                          this.removeCertificate(item);
                        }}
                      >
                        <img src={removeImg} width={25} height={25} alt="remove" />
                      </div>
                      <img src={item.certUrl} width={150} height={150} alt="certificate" />
                    </div>
                  ))
                  }
              </div>
              <UppyCertificates
                setRegister={myCertificates => {
                  const [first] = myCertificates;
                  first.certUrl = first.preview;
                  this.setState(prevState => ({
                    myCertificates: [...prevState.myCertificates, first],
                  }));
                }}
                edit
              />
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
                  className={css.uploadButtonsContainer}
                >
                  <div
                    className={css.sendParams}
                    style={{
                      width: '190px',
                      marginTop: '25px',
                    }}
                    onClick={() => this.props.history.goBack()}
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
                        NAZAD
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
                      if (this.state.myCertificates.length) {
                        this.certsUpload();
                      } else {
                        this.setState({
                          openDialog: true,
                          socialMessage: 'Uspesno sacuvani sertifikati. Hvala!',
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
                        SNIMITE
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

export default withRouter(EditFisioCertificates);
