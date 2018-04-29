import React from 'react';
import css from './styles/styles.scss';

const Login = props => (
  <div className={css.loginWrapper}>
    <div>
      <div
        style={{
          marginTop: '5px',
        }}
        onClick={() => props.modalOn('login')}
        className={css.login}>
        <p>Ulogujte se</p>
      </div>
    </div>
  </div>
);

export default Login;
