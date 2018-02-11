import React from 'react';
import { Link } from 'react-router-dom';
import css from './styles/styles.scss';

class Navigation extends React.Component {
  render() {
    return(
      <div className={css.navigation}>
        <div className={css.navigationItem}><Link to="/page/coaches"><p>Treneri</p></Link></div>
				<div className={css.navigationItem}><Link to="/page/clubs"><p>Klubovi</p></Link></div>
				<div className={css.navigationItem}><Link to="/page/fizio"><p>Fizio</p></Link></div>
      </div>
    )
  }
}
export default Navigation;
