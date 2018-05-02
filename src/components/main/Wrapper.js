import React from 'react';
import { connect } from 'react-redux';

@connect(state => ({ login: state.login }))
class Wrapper extends React.Component {
  componentDidMount() {
    const myItem = window.localStorage.getItem('fbToken');
    if (myItem) {
      const user = JSON.parse(myItem);
      this.props.dispatch({ type: 'FACEBOOK_LOGIN', accessToken: { ...user.accessToken } });
    }
  }
  render() {
    return this.props.children;
  }
}

export default Wrapper;

