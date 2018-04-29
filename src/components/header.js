
import React from 'react';
import { connect } from 'react-redux';
import css from './styles/styles.scss';
import Navigation from './navigation';
import Login from './login';
import LogedInOrNot from './SearchDumb/LogedInOrNot';
import logoBright from '../../static/logoBright.png';

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
  logoutNow = () => {
    window.localStorage.removeItem('fbToken');
    this.props.dispatch({ type: 'FACEBOOK_LOGIN', accessToken: undefined });
  }
  render() {
    return (
      <div className={css.header}>
        <div className={css.headerBox1}>
          <div className={css.logoBox}>
            <img
              alt="FIT NET"
              src={logoBright}
              width="150px"
              height="75px"
              style={{
                borderRadius: '50%',
              }}
            />
          </div>
          <div className={css.loginBox}>
            {
              typeof this.props.login.accessToken !== 'undefined' ?
                <div className={css.loginWrapper}>
                  <div>
                    <div className={css.loginLost}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          alt="FIT NET"
                          src={`${this.props.login.accessToken.imageUrl}`}
                          width="50px"
                          height="50px"
                          style={{
                            borderRadius: '50%',
                          }}
                        />
                        <div>
                          <h3
                            style={{
                              marginLeft: '5px',
                              color: '#fff',
                            }}
                          >
                            {`${this.props.login.accessToken.firstName} ${this.props.login.accessToken.lastName}`}
                          </h3>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              alignItems: 'flex-end'
                            }}
                            onClick={this.logoutNow}
                          >
                            <h4
                              style={{
                                color: '#0958ea',
                                textAlign: 'center',
                              }}
                            >
                              Izlogujte se
                            </h4>
                          </div>
                        </div>
                      </div>
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
