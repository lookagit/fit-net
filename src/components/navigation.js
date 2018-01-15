import React from 'react';
import { Link } from 'react-router-dom';
import css from './styles/styles.scss';

class Navigation extends React.Component {
  render() {
    return(
      <div className={css.navigation}>
        <ul>
          <li><Link to="/page/coaches">Treneri</Link></li>
					<li><Link to="/page/clubs">Klubovi</Link></li>
					<li><Link to="/page/fizio">Fizio</Link></li>
        </ul>
      </div>
    )
  }
}
export default Navigation;
