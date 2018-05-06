import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import css from './styles/styles.scss';
import year from '../../static/year.png';
import name from '../../static/name.png';
import phone from '../../static/phone.png';
import email from '../../static/email.png';
import certificate from '../../static/cetificate.png';
import locationImage from '../../static/location.png';
import score from '../../static/score.png';
import skill from '../../static/skill.png';
import DumbDate from './DumbDate/DumbDateComponent';

@connect(state => ({
  clubs: state.clubs,
  login: state.login,
}))
@graphql(gql`
query onePresonCl($personClId: Int) {
    onePresonCl(personClId: $personClId) { 
      lastName
      firstName
      about
      email
      imageUrl
      instagramLink
      facebookLink
      cellPhone
      birthDay
      birthPlace
      about
      score
      hasCerificates
      myCertificates {
        certUrl
        name
        id
      }
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
        skills {
          trainSkillName
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
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  render() {
    const [birthDay] = !this.props.data.loading ? this.props.data.onePresonCl.birthDay.split('-') : '';
    const cellPhone = !this.props.data.loading ? 
      typeof this.props.login.accessToken !== 'undefined' ? 
      this.props.data.onePresonCl.cellPhone : 
      this.props.data.onePresonCl.cellPhone.slice(0, this.props.data.onePresonCl.cellPhone.length - 3) + 'xxx' : '';
    const emailConst = !this.props.data.loading ? 
      typeof this.props.login.accessToken !== 'undefined' ? 
      this.props.data.onePresonCl.email : 
      "xxx" + this.props.data.onePresonCl.email.slice(3, this.props.data.onePresonCl.email.length - 3) + 'xxx' : '';
    return (
      <div>
        {
          this.props.data.loading ? <h3>LOADING</h3> :
          <div>
            <div style={{ width: '100%', display: 'flex', paddingTop: '40px' }}>
              <div
                style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'row', paddingRight: '5px', paddingLeft: '5px' }}
              >
                <div
                  style={{
                    width: '300px',
                  }}
                >
                  <div
                    style={{
                      width: '300px',
                      height: '300px',
                      backgroundImage: `url(${this.props.data.onePresonCl.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
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
                      <h4
                        style={{ color: '#fff', cursor: this.props.login.accessToken === undefined? 'pointer': 'default' }} 
                        onClick={() => {
                          if (this.props.login.accessToken === undefined) {
                            this.props.dispatch({ type: 'MODAL_VISIBLE', isVisible: true, modalClass: 'login' });
                          }
                        }}>{` ${cellPhone}`}</h4>
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
                      <h4
                        style={{ color: '#fff', cursor: this.props.login.accessToken === undefined? 'pointer': 'default' }} 
                        onClick={() => {
                          if (this.props.login.accessToken === undefined) {
                            this.props.dispatch({ type: 'MODAL_VISIBLE', isVisible: true, modalClass: 'login' });
                          }
                        }}>{` ${emailConst}`}</h4>
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
                      <DumbDate
                        isDate
                        date={this.props.data.onePresonCl.birthDay}
                      />
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
                  style={{ marginLeft: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '760px' }}
                >
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(41, 53, 81, 0.6)',
                      borderRadius: '5px',
                      paddingTop: '10px',
                    }}
                  >
                    <div
                      style={{ display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-between', alignItems: 'space-between', paddingBottom: '15px' }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={score}
                          alt="Smiley face"
                          height="90"
                          width="90"
                        />
                        <h4
                          style={{
                            color: '#fff',
                            textAlign: 'center',
                            marginTop: '5px',
                          }}
                        >
                          {`Score: ${this.props.data.onePresonCl.score}`}
                        </h4>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          alt="Fit net couch location"
                          src={locationImage}
                          height="90"
                          width="90"
                        />
                        <h4
                          style={{
                            color: '#fff',
                            textAlign: 'center',
                            marginTop: '5px',
                          }}
                        >
                          {`Lokacija: ${this.props.data.onePresonCl.birthPlace}`}
                        </h4>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={skill}
                          alt="Smiley face"
                          height="90"
                          width="90"
                        />
                        <h4
                          style={{
                            color: '#fff',
                            textAlign: 'center',
                            marginTop: '5px',
                          }}
                        >
                          {`Veštine: ${this.props.data.onePresonCl.trainingPersonSkills.length}`}
                        </h4>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={certificate}
                          alt="Smiley face"
                          height="90"
                          width="90"
                        />
                        <h4
                          style={{
                            color: '#fff',
                            textAlign: 'center',
                            marginTop: '5px',
                          }}
                        >
                          {`Sertifikati: ${this.props.data.onePresonCl.hasCerificates ? 'Da' : 'Ne'}` }
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '10px',
                      }}
                    >
                      <div
                        style={{ margin: '0 auto', marginBottom: '15px', display: 'flex', flexDirection: 'column' }}
                      >
                        <h3 style={{ color: '#fff', fontSize: '19px', fontWeight: '500' }}>{`Opis: ${this.props.data.onePresonCl.about}`}</h3>
                      </div>
                      <div>
                        <h3 style={{ color: '#fff', fontSize: '19px', fontWeight: '500' }}>{`Sertifikati:`}</h3>
                        <div
                          style={{
                            display: 'flex',
                            webkitFlexWrap: 'wrap',
                            flexWrap: 'wrap',
                          }}
                        >
                          {
                            this.props.data.onePresonCl.myCertificates.length ?
                              this.props.data.onePresonCl.myCertificates.map(certItem => (
                                <div
                                  style={{
                                    padding: '10px',
                                  }}
                                >
                                  <img
                                    alt="Fit-net.rs certificate"
                                    width="80"
                                    height="80"
                                    src={`${certItem.certUrl}`}
                                  />
                                </div>
                              )) : <h3 style={{ color: '#fff' }}>Ovaj korisnik nema sertifikate.</h3>
                        }
                        </div>
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
                            <th
                              style={{
                                paddingTop: '25px',
                                paddingBottom: '25px',
                                fontSize: '22px',
                                color: '#fff',
                              }}
                            >
                              Kategorija
                            </th>
                          </tr>
                        </thead>
                        <tbody className="table-hover">
                          {
                            this.props.data.onePresonCl.personCounties.map((item, key) => (  
                              <tr>
                                <td>{`${item.county.countyName}`}</td>
                                <td>{`${item.address}`}</td>
                                <td>{`${item.price}`}</td>
                                <td>{item.groupTraining ? `Grupni Trening` : `Personalni trening`}</td>
                                <td>{item.skills.trainSkillName}</td>
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