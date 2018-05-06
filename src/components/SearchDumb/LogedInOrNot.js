import React from 'react';
import { connect } from 'react-redux';
import css from '../styles/styles.scss';
import ModalClass from './modalClass';
import WelcomeMessage from './WelcomeMessage';


@connect(state => ({
  login: state.login,
  modal: state.modal,
}))
class LogedInOrNot extends React.Component {
  render() {
    const { login } = this.props;
    return (
      <div className={css.modalClass}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {
              typeof login.accessToken !== 'undefined' ?
                <WelcomeMessage
                  imageUrl={login.accessToken.imageUrl}
                  firstName={login.accessToken.firstName}
                /> :
                <ModalClass name={this.props.modal.modalClass} />
          }
        </div>
      </div>
    );
  }
}
export default LogedInOrNot;
