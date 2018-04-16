import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import css from './styles/styles.scss';

@connect(state => ({ clubs: state.clubs }))
@graphql(gql`
query onePresonCl($personClId: Int) {
    onePresonCl(personClId: $personClId) { 
      lastName
      firstName
      about
      instagramLink
      facebookLink
      cellPhone
      birthDay
      birthPlace
      about
      hasCerificates
      trainingPersonSkills {
        trainSkillName
      }
      personCounties {
        address
        groupTraining
        price
        county {
          countyName
        }
      }
    }
  }`,
{
  options: props => ({
    variables: {
      personClId: props.match.params.id,
    },
  }),
})
class CoachesOne extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.data.loading ? <h3>LOADING</h3> :
          <div>
            <div style={{ width: '100%', display: 'flex', paddingTop: '40px' }}>
              <div
                style={{ maxWidth: '1350px', margin: '0 auto', display: 'flex', flexDirection: 'row' }}
              >
                <div>
                  <img
                    src="https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.0-9/14718614_10153836994745689_8529919099735870266_n.jpg?_nc_cat=0&oh=8faa75a7e99a56567b8ab9d40b00bfb6&oe=5B6C3464" 
                    alt="Smiley face"
                    height="280"
                    width="260"
                  />
                </div>
                <div
                  style={{ marginLeft: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
                >
                  <div
                    style={{ display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'space-between', alignItems: 'space-between', paddingBottom: '15px' }}
                  >
                    <img
                      src="https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.0-9/14718614_10153836994745689_8529919099735870266_n.jpg?_nc_cat=0&oh=8faa75a7e99a56567b8ab9d40b00bfb6&oe=5B6C3464" 
                      alt="Smiley face"
                      height="90"
                      width="90"
                    />
                    <img
                      src="https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.0-9/14718614_10153836994745689_8529919099735870266_n.jpg?_nc_cat=0&oh=8faa75a7e99a56567b8ab9d40b00bfb6&oe=5B6C3464" 
                      alt="Smiley face"
                      height="90"
                      width="90"
                    />
                    <img
                      src="https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.0-9/14718614_10153836994745689_8529919099735870266_n.jpg?_nc_cat=0&oh=8faa75a7e99a56567b8ab9d40b00bfb6&oe=5B6C3464" 
                      alt="Smiley face"
                      height="90"
                      width="90"
                    />
                    <img
                      src="https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.0-9/14718614_10153836994745689_8529919099735870266_n.jpg?_nc_cat=0&oh=8faa75a7e99a56567b8ab9d40b00bfb6&oe=5B6C3464" 
                      alt="Smiley face"
                      height="90"
                      width="90"
                    />
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '25px' }}>{`O nama: ${this.props.data.onePresonCl.about}`}</h3>
                  </div>
                </div>
              </div>
            </div>
            <h1 style={{ color: '#fff' }}>{`Ime i prezime: ${this.props.data.onePresonCl.firstName} ${this.props.data.onePresonCl.lastName}`}</h1>
            <h1 style={{ color: '#fff' }}>{`Broj telefona: ${this.props.data.onePresonCl.cellPhone}`}</h1>
            <h1 style={{ color: '#fff' }}>Radim na lokacijama</h1>
            <div style={{ margin: '20px' }}>
              {
                this.props.data.onePresonCl.personCounties.map((item, key) => (
                  <div>
                    <h3 style={{ color: '#fff' }}>{`Opstina: ${item.county.countyName}`}</h3>
                    <h3 style={{ color: '#fff' }}>{`Adresa: ${item.address}`}</h3>
                    <h3 style={{ color: '#fff' }}>{`Cena: ${item.price}`}</h3>
                    <h3 style={{ color: '#fff' }}>{item.groupTraining ? `Grupni Trening` : `Personalni trening`}</h3>
                  </div>
                ))
              }
            </div>
            <div style={{ margin: '20px', marginBottom: 0, }}>
              <h1 style={{ color: '#fff' }}>Posedujem skilove</h1>
              {
                this.props.data.onePresonCl.trainingPersonSkills.map((item, key) => (
                  <div>
                    <h1 style={{ color: '#fff' }}>{`${item.trainSkillName}`}</h1>
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
export default CoachesOne;