import React from 'react';
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
class GoogleLoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
    };
  }
  responseGoogle = async response => {
    if (response.profileObj) {
      const { accessToken } = response;
      const getUser = await this.props.data.refetch({
        gToken: accessToken,
      });
      const id = null;
      console.log('GOOG ', getUser.data);
      if (id) {
        this.props.dispatch({ type: 'FACEBOOK_LOGIN', accessToken: { ...getUser.data.userLogin } });
        window.localStorage.setItem('fbToken', JSON.stringify({ accessToken: { ...getUser.data.userLogin } }));
      }
    }
  };

  render() {
    return (
      <GoogleLogin
        clientId="712543376267-mi996e5cu5bkgn1vj9v19lmlm6fdifam.apps.googleusercontent.com"
        style={{}}
        className={css.loginBtnGoogle}
        disabledStyle
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}>
            GMAIL LOGIN
      </GoogleLogin>
    );
  }
}
export default GoogleLoginContainer;
