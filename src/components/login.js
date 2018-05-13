import React from 'react';
import { Link } from 'react-router-dom';
import css from './styles/styles.scss';

const Login = props => (
  <div className={css.loginWrapper}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Link
        to={`/profile-choose`}
        className={css.login}
        style={{
          marginTop: '5px',
          marginRight: '10px',
        }}
      >
        <p
          style={{ color: '#28a7e9' }}
        >
          Napravite profesionalni profil
        </p>
      </Link>
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
