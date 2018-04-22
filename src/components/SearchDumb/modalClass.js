import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import css from '../styles/styles.scss';

class ModalClass extends React.Component{
  responseFacebook = (response) => {
    console.log('JA SAM RESPOJNNSE ', response);
  }

  componentClicked = () => console.log('click');
  
  responseGoogle = (response) => console.log(response)
  render(){
    return(
      <div className={css.modalClass}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
          <div style={{textAlign: 'center', margin: '0 auto', marginBottom: '35px'}}>
            <h2
              style={{
                color: 'white',
                fontSize: '35px'
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
              Zbog bezbednosnih razloga FIT-NET trenutno podrzava login preko drustvenih mreza. Hvala na razumevanju.
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
              autoLoad={true}
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
                    onClick={() => this.componentClicked()}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',}}>
                      <h3 style={{
                        color: '#fff',
                        fontWeight: 'bold',
                      }}>FACEBOOK LOGIN</h3> 
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
                  borderRadius: '5px'
                }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',}}>
                  <h3 style={{
                    color: '#fff',
                    fontWeight: 'bold',
                  }}>GOOGLE LOGIN</h3> 
                </div>
              </div>
            </GoogleLogin>
          </div>
        </div>
        
        
      </div>
    )
  }
}
export default ModalClass;
