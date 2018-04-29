import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import css from './styles/styles.scss';
import year from '../../static/year.png';
import name from '../../static/name.png';
import phone from '../../static/phone.png';
import email from '../../static/email.png';

@connect(state => ({ clubs: state.clubs }))
@graphql(gql`
query onePresonCl($personClId: Int) {
    onePresonCl(personClId: $personClId) { 
      lastName
      firstName
      about
      email
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
    const [birthDay] = !this.props.data.loading ? this.props.data.onePresonCl.birthDay.split('-') : '';
    return (
      <div>
        {
          this.props.data.loading ? <h3>LOADING</h3> :
          <div>
            <div style={{ width: '100%', display: 'flex', paddingTop: '40px' }}>
              <div
                style={{ maxWidth: '1330px', margin: '0 auto', display: 'flex', flexDirection: 'row', paddingRight: '5px', paddingLeft: '5px' }}
              >
                <div>
                  <img
                    src="https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.0-9/14718614_10153836994745689_8529919099735870266_n.jpg?_nc_cat=0&oh=8faa75a7e99a56567b8ab9d40b00bfb6&oe=5B6C3464" 
                    alt="Smiley face"
                    height="350"
                    width="320"
                  />
                  <div className={css.card}>
                    <div
                      style={{
                        marginTop: '5px',
                        marginBottom: '5px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        alt="name for couch"
                        src={name}
                        style={{
                          width: '30px',
                          height: '30px',
                          marginRight: '10px',
                        }}
                      />
                      <h4 style={{ color: '#fff' }}>{` ${this.props.data.onePresonCl.firstName} ${this.props.data.onePresonCl.lastName}`}</h4>
                    </div>
                    <div
                      style={{
                        marginTop: '5px',
                        marginBottom: '5px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        alt="phone for couch"
                        src={phone}
                        style={{
                          width: '30px',
                          height: '30px',
                          marginRight: '10px',
                        }}
                      />
                      <h4 style={{ color: '#fff' }}>{` ${this.props.data.onePresonCl.cellPhone}`}</h4>
                    </div>
                    <div
                      style={{
                        marginTop: '5px',
                        marginBottom: '5px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        alt="email for couch"
                        src={email}
                        style={{
                          width: '35px',
                          height: '25px',
                          marginRight: '10px',
                        }}
                      />
                      <h4 style={{ color: '#fff' }}>{` ${this.props.data.onePresonCl.email}`}</h4>
                    </div>
                    <div
                      style={{
                        marginTop: '5px',
                        marginBottom: '5px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        alt="email for couch"
                        src={year}
                        style={{
                          width: '30px',
                          height: '30px',
                          marginRight: '10px',
                        }}
                      />
                      <h4 style={{ color: '#fff' }}>{` ${birthDay}`}</h4>
                    </div>
                    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                      <h2 style={{ color: '#fff', fontWeight: 'bold' }}>Veštine</h2>
                    </div>
                    <div style={{ marginBottom: 0 }}>
                      {
                      this.props.data.onePresonCl.trainingPersonSkills.map((item, key) => (
                        <div
                          style={{
                            paddingLeft: '10px',
                            paddingTop: '15px',
                            paddingBottom: '15px',
                            border: '1px solid rgb(129,154,206)',
                            borderTopWidth: key === 0 ? '1px' : 0,
                            borderLeftWidth: 0,
                            borderRightWidth: 0,
                            borderBottomColor: 'rgb(129,154,206)',
                          }}
                        >
                          <h4 style={{ color: '#fff' }}>{`${item.trainSkillName}`}</h4>
                        </div>
                      ))
                    }
                    </div>
                  </div>
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
                    <div
                      style={{ display: 'flex' }}
                    >
                      <div
                        style={{ margin: '0 auto', marginBottom: '25px' }}
                      >

                        <h3 style={{ color: '#fff', fontSize: '19px', fontWeight: '500' }}>{`${this.props.data.onePresonCl.about}`}</h3>
                      </div>
                    </div>
                    <div>
                      <table className={css.tableFill}>
                        <thead>
                          <tr>
                            <th
                              style={{
                                paddingTop: '25px',
                                paddingBottom: '25px',
                                fontSize: '22px',
                                color: '#fff',
                              }}
                            >
                              Opština
                            </th>
                            <th
                              style={{
                                paddingTop: '25px',
                                paddingBottom: '25px',
                                fontSize: '22px',
                                color: '#fff',
                              }}
                            >
                              Adresa
                            </th>
                            <th
                              style={{
                                paddingTop: '25px',
                                paddingBottom: '25px',
                                fontSize: '22px',
                                color: '#fff',
                              }}
                            >
                              Cena
                            </th>
                            <th
                              style={{
                                paddingTop: '25px',
                                paddingBottom: '25px',
                                fontSize: '22px',
                                color: '#fff',
                              }}
                            >
                              Tip
                            </th>
                          </tr>
                        </thead>
                        <tbody class="table-hover">
                          {
                            this.props.data.onePresonCl.personCounties.map((item, key) => (  
                              <tr>
                                <td>{`${item.county.countyName}`}</td>
                                <td>{`${item.address}`}</td>
                                <td>{`${item.price}`}</td>
                                <td>{item.groupTraining ? `Grupni Trening` : `Personalni trening`}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
export default CoachesOne;