import React from 'react';
import { connect } from 'react-redux';
import css from '../styles/styles.scss';
import ModalClass from './modalClass';
import WelcomeMessage from './WelcomeMessage';

@connect(state => ({ login: state.login }))
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
                <WelcomeMessage firstName={login.accessToken.firstName} /> :
                <ModalClass name={this.props.name} />
          }
        </div>
      </div>
    );
  }
}
export default LogedInOrNot;
