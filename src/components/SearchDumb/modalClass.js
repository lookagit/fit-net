import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
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
class ModalClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log('MI SMO NEXT ', nextProps);
  }
  responseFacebook = response => {
    if (response.accessToken) {
      const { accessToken } = response;
      console.log('JAAA SAM PROPS ', this.props);
      this.props.dispatch({ type: 'FACEBOOK_LOGIN', accessToken });
    }
  }

  componentClicked = renderProps => console.log('click', renderProps.onClick());

  responseGoogle = response => console.log(response);

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
            <h2
              style={{
                color: 'white',
                fontSize: '35px',
              }}
            >
              Login
            </h2>
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
            style={{
              textAlign: 'center',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '35%',
            }}
          >
            <FacebookLogin
              appId="1900315403334325"
              className={css.sendParams}
              fields="name,email,picture"
              callback={this.responseFacebook}
              render={renderProps => (
                <div 
                  style={{
                    background: '#28a7e9',
                    padding: '20px',
                    borderRadius: '5px'
                  }}
                  onClick={() => this.componentClicked(renderProps)}>
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
                      FACEBOOK LOGIN
                    </h3>
                  </div>
                </div>
              )}
            />
            <GoogleLogin
              clientId="712543376267-mi996e5cu5bkgn1vj9v19lmlm6fdifam.apps.googleusercontent.com"
              style={{}}
              disabledStyle
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}>
              <div
                style={{
                  background: '#28a7e9',
                  padding: '20px',
                  borderRadius: '5px',
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
                    GOOGLE LOGIN
                  </h3>
                </div>
              </div>
            </GoogleLogin>
          </div>
        </div>
      </div>
    );
  }
}
export default ModalClass;
