import React from 'react';
import css from './styles/styles.scss';

class Login extends React.Component {
  render() {
    return(
      <div className={css.loginWrapper}>
        <div>
          <div className={css.login}>Uloguj se</div>
          <div className={css.loginLost}>Zaboravio si sifru?</div>
        </div>
        <div>
          <div className={css.singUp}>Prijavi se</div>
          <div className={css.singUpLost}>Zaboravio si mejl?</div>
        </div>
      </div>
    )
  }
}
export default Login;
