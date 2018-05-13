import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import css from '../styles/styles.scss';

@connect(state => ({ login: state.login }))
@graphql(gql`
  query userLogin($fbToken: String) 
  {
    userLogin(fbToken: $fbToken) { 
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
      fbToken: props.login.accessToken,
    },
  }),
})
class FacebookLoginContainer extends React.Component {
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

  render() {
    return (
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
    );
  }
}
export default FacebookLoginContainer;
