import React from 'react';
import { Link } from 'react-router-dom';
import css from './styles/styles.scss';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'Treneri',
    }
  }
  hangleNavColor(linkItem) {
    this.setState({
      active: linkItem,
    });
  }
  render() {
    return(
      <div className={css.navigation}>
        <div className={css.navigationItem}>
          <Link to="/page/coaches">
            <p
              style={{color: this.state.active === 'Treneri' ? 'rgb(0, 192, 255)' : '#fff'}}
              onClick={() => this.hangleNavColor('Treneri')}
            >
              Treneri
            </p>
          </Link>
        </div>
        <div className={css.navigationItem}>
          <Link to="/page/clubs">
            <p
              style={{color: this.state.active === 'Klubovi' ? 'rgb(0, 192, 255)' : '#fff'}}
              onClick={() => this.hangleNavColor('Klubovi')}
            >
              Klubovi
            </p>
          </Link>
        </div>
        <div className={css.navigationItem}>
          <Link to="/page/fizio">
            <p
              style={{color: this.state.active === 'Fizio' ? 'rgb(0, 192, 255)' : '#fff'}}
              onClick={() => this.hangleNavColor('Fizio')}
            >
              Fizio
            </p>
          </Link>
        </div>
      </div>
    )
  }
}
export default Navigation;
