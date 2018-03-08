import React from 'react';
import css from './styles/styles.scss';

class Login extends React.Component {
  render() {
    return(
      <div className={css.loginWrapper}>
        <div>
          <div
            onClick={() => this.props.modalOn('login')}
            className={css.login}>
            <p>Uloguj se</p>
          </div>
          <div className={css.loginLost}>Zaboravio si sifru?</div>
        </div>
        <div>
          <div 
            onClick={() => this.props.modalOn('singUp')}
            className={css.singUp}>
            <p>Prijavi se</p>
          </div>
          <div className={css.singUpLost}>Zaboravio si mejl?</div>
        </div>
      </div>
    )
  }
}
export default Login;
