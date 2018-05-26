import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import css from '../styles/styles.scss';
import logoBright from '../../../static/logoBright.png';
import FacebookLoginContainer from './FacebookLoginContainer';
import GoogleLoginContainer from './GoogleLoginContainer';

@connect(state => ({ login: state.login }))
@graphql(gql`
  query userLogin($gToken: String) 
  {
    userLogin(gToken: $gToken) { 
      id,
      lastName,
      firstName,
      email,
      imageUrl,
    }
  }`,
{
  options: props => ({
    variables: {
      gToken: props.login.accessToken,
    },
  }),
})
class ModalClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
    };
  }
  responseFacebook = async response => {
    if (response.accessToken) {
      const { accessToken } = response;
      const getUser = await this.props.data.refetch({
        fbToken: accessToken,
      });
      const { token, id } = getUser.data.userLogin;
      if (id) {
        this.props.dispatch({ type: 'FACEBOOK_LOGIN', accessToken: { ...getUser.data.userLogin } });
        window.localStorage.setItem('fbToken', JSON.stringify({ accessToken: { ...getUser.data.userLogin } }));
      }
    }
  }

  componentClicked = renderProps => console.log('click', renderProps.onClick());

  responseGoogle = async response => {
    if (response.profileObj) {
      const { accessToken } = response;
      const getUser = await this.props.data.refetch({
        gToken: accessToken,
      });
      const id = null;
      if (id) {
        this.props.dispatch({ type: 'FACEBOOK_LOGIN', accessToken: { ...getUser.data.userLogin } });
        window.localStorage.setItem('fbToken', JSON.stringify({ accessToken: { ...getUser.data.userLogin } }));
      }
    }
  };

  render() {
    return (
      <div className={css.modalClass}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div style={{ textAlign: 'center', margin: '0 auto', marginBottom: '35px' }}>
            <img
              alt="FIT-NET Logo"
              src={logoBright}
              width="185px"
              height="90px"
            />
            <h3
              style={{
                marginTop: '14px',
                color: 'white',
              }}
            >
             Zbog bezbednosnih razloga FIT-NET trenutno podrzava
             login preko drustvenih mreza. Hvala na razumevanju.
            </h3>
          </div>
          <div
            className={css.socialContainerButton}
          >
            <FacebookLoginContainer />
            <GoogleLoginContainer />
          </div>
        </div>
      </div>
    );
  }
}
export default ModalClass;
