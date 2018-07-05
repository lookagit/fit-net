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
  query userLoginRegular($email: String, $password: String) 
  {
    userLoginRegular(email: $email, password: $password) { 
      id,
      lastName,
      firstName,
      email,
      imageUrl,
      isFisio
      isCouch
      isClub
      userPerson {
        id
        email
        password
        firstName
        lastName
        personClub
        facebookLink
        instagramLink
        cellPhone
        birthPlace
        birthDay
        hasCerificates
        about
        imageUrl
        skillsArr
        myCertificates {
          id
          name
          certUrl
          personClId
          fisioClId
        }
        personCounties {
          id
          price
          groupTraining
          address
          county {
            id
            countyName
          }
        }
      }
      userFisio {
        id
        email
        password
        firstName
        lastName
        facebookLink
        instagramLink
        cellPhone
        birthPlace
        birthDay
        hasCerificates
        about
        imageUrl
        fisioSkillsArr
        allCertificates {
          id
          name
          certUrl
          personClId
          fisioClId
        }
      }
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

  letsLogin = async () => {
    const { email, password } = this.state;
    const { data } = await this.props.data.refetch({
      email: this.state.email,
      password: this.state.password
    });
    if (data.userLoginRegular) {
      const { email, id } = data.userLoginRegular;
      window.localStorage.setItem('fbToken', JSON.stringify({ accessToken: { ...data.userLoginRegular } }));
      this.props.dispatch({ type: 'FACEBOOK_LOGIN', accessToken: { ...data.userLoginRegular } })
      this.props.history.push(`/user-loged-in/${id}`);
    }
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
          className={css.brightFont}
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
          className={css.brightFont}
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
