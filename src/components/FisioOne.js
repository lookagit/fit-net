import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import css from './styles/styles.scss';

@connect(state => ({ clubs: state.clubs }))
@graphql(gql`
  query oneFisioCl($fisioClId: Int) {
    oneFisioCl(fisioClId: $fisioClId) {
      firstName
      lastName
      email
      facebookLink
      instagramLink
      imageUrl
      cellPhone
      about
      birthDay
      birthPlace
      hasCerificates
      fisioCounties {
        id
        price
        address
        saloonName
        fisioCounty {
          id
          countyName
        }
        fisioCategory {
          id
          fisioSkillName
        }
      }
      fisioSkillsNames {
        id
        fisioSkillName
      }
    }
  }`, {
  options: props => ({
    variables: {
      fisioClId: props.match.params.id,
    },
  }),
})
class FisioOne extends React.Component {
  render() {
    console.log("JA SAM TAJ ", this.props.data);
    return (
      <div>
        {
          this.props.data.loading ? <h3>LOADING</h3> :
          <div>
            <h1 style={{ color: '#fff' }}>{`Ime i prezime: ${this.props.data.oneFisioCl.firstName} ${this.props.data.oneFisioCl.lastName}`}</h1>
            <h1 style={{ color: '#fff' }}>{`Broj telefona: ${this.props.data.oneFisioCl.cellPhone}`}</h1>
            <h1 style={{ color: '#fff' }}>{`Email: ${this.props.data.oneFisioCl.email}`}></h1>
            <h1 style={{ color: '#fff' }}>{`O nama: ${this.props.data.oneFisioCl.about}`}</h1>
            <h1 style={{ color: '#fff' }}>Radim na lokacijama</h1>
            <div style={{ margin: '20px' }}>
              {
                this.props.data.oneFisioCl.fisioCounties.map((item, key) => (
                  <div key={item.id}>
                    <h3 style={{ color: '#fff' }}>{`Opstina: ${item.fisioCounty.countyName}`}</h3>
                    <h3 style={{ color: '#fff' }}>{`Adresa: ${item.address}`}</h3>
                    <h3 style={{ color: '#fff' }}>{`Cena: ${item.price}`}</h3>
                    <h3 style={{ color: '#fff' }}>{`Ime salona: ${item.saloonName}`}</h3>
                    <h3 style={{ color: '#fff' }}>{`Vrsta masaze: ${item.fisioCategory.fisioSkillName}`}</h3>
                  </div>
                ))
              }
            </div>
            <div style={{ margin: '20px', marginBottom: 0 }}>
              <h1 style={{ color: '#fff' }}>Sve vrste masaza</h1>
              {
                this.props.data.oneFisioCl.fisioSkillsNames.map((item, key) => (
                  <div key={item.id}>
                    <h1 style={{ color: '#fff' }}>{`${item.fisioSkillName}`}</h1>
                  </div>
                ))
              }
            </div>
          </div>
        }
      </div>
    );
  }
}
export default FisioOne;
