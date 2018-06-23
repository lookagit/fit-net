import React from 'react';
import TextField from 'material-ui/TextField';
import css from '../styles/styles.scss';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

@withRouter
@connect(state => ({ login: state.login }))
@graphql(gql`
  query userLoginRegular($emal: String, $password: String) 
  {
    userLoginRegular(email: $email, password: $password) { 
      id,
      lastName,
      firstName,
      email,
      imageUrl,
    }
  }`)
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
  }
  
  componentWillReceiveProps(nextProps) {
    console.log("JA SAM NEXT PROPS", nextProps);
  }

  letsLogin = async () => {
    const { email, password } = this.state;
    const { data } = await this.props.data.refetch({
      email: this.state.email,
      password: this.state.password
    });
    console.log("JA SAM DATA ", data);
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
          onClick={() => this.letsLogin()}
          className={css.loginBtnCust}
        >
          Ulogujte se
        </div>
      </div>
    );
  }
}

export default LoginForm;
