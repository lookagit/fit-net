import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import css from '../styles/styles.scss';
import logoBright from '../../../static/logoBright.png';

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
      console.log('GET USER ', getUser);
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
            <FacebookLogin
              appId="1900315403334325"
              className={css.sendParams}
              fields="name,email,picture"
              callback={this.responseFacebook}
              render={renderProps => (
                <button
                  className={css.loginBtnFacebook}
                  onClick={() => this.componentClicked(renderProps)}
                >
                  FACEBOOK LOGIN
                </button>
              )}
            />
            <GoogleLogin
              clientId="712543376267-mi996e5cu5bkgn1vj9v19lmlm6fdifam.apps.googleusercontent.com"
              style={{}}
              className={css.loginBtnGoogle}
              disabledStyle
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}>
                  GMAIL LOGIN
            </GoogleLogin>
          </div>
        </div>
      </div>
    );
  }
}
export default ModalClass;
