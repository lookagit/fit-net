import React from 'react';
import css from './styles/styles.scss';
import Navigation from './navigation';
import Login from './login';

class Header extends React.Component {
  render() {
    return(
      <div className={css.header}>
        <div className={css.headerBox1}>
          <div className={css.logoBox}>
            <h1>Fit Net</h1>
          </div>

          {/* COMING SOON <div className={css.loginBox}>
            <Login />
          </div> */}
        </div>
        <div className={css.headerBox2}>
          <Navigation />
        </div>
      </div>
    )
  }
}
export default Header;
