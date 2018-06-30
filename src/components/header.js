
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import css from './styles/styles.scss';
import Navigation from './navigation';
import Login from './login';
import LogedInOrNot from './SearchDumb/LogedInOrNot';
import logoBright from '../../static/logoBright.png';
import menuIcon from '../../static/menuIcon.png';

@withRouter
@connect(state => ({
  login: state.login,
  modal: state.modal,
  drawer: state.drawer,
}))
class Header extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      lastName: null,
      firstName: null,
      imageUrl: null,
      loggedIn: false,
    }
  }

  modalOn = e => {
    this.props.dispatch({ type: 'MODAL_VISIBLE', isVisible: true, modalClass: e });
  }
  modalOff = () => {
    this.props.dispatch({ type: 'MODAL_VISIBLE', isVisible: false, modalClass: '' });
  }
  stopProp = e => {
    e.stopPropagation();
  }
  logoutNow = () => {
    console.log("EVO JA LOGOUT")
    window.localStorage.removeItem('fbToken');
    this.props.dispatch({ type: 'FACEBOOK_LOGIN', accessToken: undefined });
    this.props.history.push('/');
    this.setState({
      loggedIn: false
    });

  }
  componentDidMount() {
    this.getUser();  
  }
  componentWillReceiveProps(nextProps){
    if (typeof nextProps.login.accessToken !== "undefined") {
      this.getUser();
    }
  }
  getUser = async () => {
    if (typeof this.props.login.accessToken !== "undefined") {
      const { firstName, lastName, imageUrl, id } = this.props.login.accessToken;
      this.setState({
        id,
        firstName,
        lastName,
        imageUrl,
        loggedIn: true,
      });
      return;
    } else if (window) {
        const isLogedIn = await window.localStorage.getItem('fbToken');
        if (isLogedIn) {
            const { accessToken } = JSON.parse(isLogedIn);
            if (accessToken) {
                const { lastName, firstName, imageUrl, id } = accessToken
                this.setState({
                    id,
                    lastName,
                    firstName,
                    imageUrl,
                    loggedIn: true
                });
            }
        }
    }
  }
  render() {
    const { loggedIn, lastName, firstName, imageUrl, id } = this.state;
    return (
      <div className={css.header}>
        <div className={css.headerBox1}>
          <div
            onClick={() => this.props.dispatch({type: 'DRAWER_OPEN'})}
            className={css.logoBox}
          >
            <img
              alt="FIT NET"
              src={logoBright}
              width="150px"
              height="75px"
            />
          </div>
          <div className={css.loginBox}>
            {
              loggedIn ?
                <div 
                  className={css.loginWrapper}
                >
                  <div>
                    <div className={css.loginLost}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column'
                        }}
                      >
                      <div
                        
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onClick={() => this.props.history.push(`/user-loged-in/${id}`)}
                        >
                          <img
                            alt="FIT NET"
                            src={`${imageUrl}`}
                            width="50px"
                            height="50px"
                            style={{
                              borderRadius: '50%',
                            }}
                          />
                          <h3
                            style={{
                              marginLeft: '5px',
                              color: '#fff',
                            }}
                          >
                            {`${firstName} ${lastName}`}
                          </h3>
                        </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              alignItems: 'flex-end',
                              width: '100%'
                            }}
                            onClick={this.logoutNow}
                          >
                            <h4
                              style={{
                                color: '#0958ea',
                                textAlign: 'center',
                                marginTop: -20,
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
          style={{display:`${this.props.modal.isVisible ? 'block' : 'none'}`}}
          className={css.loginModalWrapper}>
          <div 
            onClick={(e) => this.stopProp(e)}
            className={css.loginModalHolder}>
              <LogedInOrNot />
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
