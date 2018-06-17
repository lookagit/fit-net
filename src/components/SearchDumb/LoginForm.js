import React from 'react';
import TextField from 'material-ui/TextField';
import css from '../styles/styles.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
  }
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField
          hintText="Unesite email"
          hintStyle={{ color: '#FFF' }}
          floatingLabelText="Email"
          value={this.state.email}
          floatingLabelStyle={{ color: '#FFF' }}
          underlineFocusStyle={{ borderColor: '#FFF' }}
          onChange={e => this.setState({ email: e.target.value })}
          className={css.biggerFont}
        />
        <TextField
          hintText="Unesite šifru"
          hintStyle={{ color: '#FFF' }}
          floatingLabelText="Šifra"
          type="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
          floatingLabelStyle={{ color: '#FFF' }}
          underlineFocusStyle={{ borderColor: '#FFF' }}
          className={css.biggerFont}
        />
        <div
          className={css.loginBtnCust}
        >
          Ulogujte se
        </div>
      </div>
    );
  }
}

export default LoginForm;
