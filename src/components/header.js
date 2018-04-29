
import React from 'react';
import { connect } from 'react-redux';
import css from './styles/styles.scss';
import Navigation from './navigation';
import Login from './login';
import LogedInOrNot from './SearchDumb/LogedInOrNot';

@connect(state => ({ login: state.login }))
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalClass: null,
    };
  }
  modalOn = e => {
    this.setState({
      modal: true,
      modalClass: e,
    });
  }
  modalOff = () => {
    this.setState({
      modal: false,
    });
  }
  stopProp = e => {
    e.stopPropagation();
  }
  render() {
    return (
      <div className={css.header}>
        <div className={css.headerBox1}>
          <div className={css.logoBox}>
            <h1>Fit Net</h1>
          </div>
          <div className={css.loginBox}>
            {
              typeof this.props.login.accessToken !== 'undefined' ?
                <div className={css.loginWrapper}>
                  <div>
                    <div className={css.loginLost}>
                      <h3>{`${this.props.login.accessToken.firstName} ${this.props.login.accessToken.lastName}`}</h3>
                    </div>
                  </div>
                </div> :
                <Login modalOn={this.modalOn} />
            }
          </div>
        </div>
        <div className={css.headerBox2}>
          <Navigation />
        </div>
        <div
          onClick={() => this.modalOff()}
          style={{display:`${this.state.modal ? 'block' : 'none'}`}}
          className={css.loginModalWrapper}>
          <div 
            onClick={(e) => this.stopProp(e)}
            className={css.loginModalHolder}>
              <LogedInOrNot name={this.state.modalClass}/>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
