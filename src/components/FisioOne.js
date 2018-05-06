import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import css from './styles/styles.scss';
import year from '../../static/year.png';
import name from '../../static/name.png';
import phone from '../../static/phone.png';
import email from '../../static/email.png';

@connect(state => ({
  clubs: state.clubs,
  login: state.login,
}))
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
      score
      comesHome
      fisioSkillsArr
      allCertificates {
        certUrl
      }
      fisioCounties {
        id
        price
        address
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
    const [birthDay] = !this.props.data.loading ? this.props.data.oneFisioCl.birthDay.split('-') : '';
    const cellPhone = !this.props.data.loading ? 
      typeof this.props.login.accessToken !== 'undefined' ? 
      this.props.data.oneFisioCl.cellPhone : 
      this.props.data.oneFisioCl.cellPhone.slice(0, this.props.data.oneFisioCl.cellPhone.length - 3) + 'xxx' : '';
    const emailConst = !this.props.data.loading ? 
      typeof this.props.login.accessToken !== 'undefined' ? 
      this.props.data.oneFisioCl.email : 
      "xxx" + this.props.data.oneFisioCl.email.slice(3, this.props.data.oneFisioCl.email.length - 3) + 'xxx' : '';
    return (
      <div>
        {
          this.props.data.loading ? <h3>LOADING</h3> :
          <div>
            <div style={{ width: '100%', display: 'flex', paddingTop: '40px' }}>
              <div
                style={{ maxWidth: '1250px', margin: '0 auto', display: 'flex', flexDirection: 'row', paddingRight: '5px', paddingLeft: '5px' }}
              >
                <div
                  style={{
                    width: '320px',
                  }}
                >
                  <div
                    style={{
                      width: '320px',
                      height: '320px',
                      backgroundImage: `url(${this.props.data.oneFisioCl.imageUrl})`,
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
                      <h4 style={{ color: '#fff' }}>{` ${this.props.data.oneFisioCl.firstName} ${this.props.data.oneFisioCl.lastName}`}</h4>
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
                      <h4 style={{ color: '#fff' }}>{` ${cellPhone}`}</h4>
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
                      <h4 style={{ color: '#fff' }}>{` ${emailConst}`}</h4>
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
                      <h2 style={{ color: '#fff', fontWeight: 'bold' }}>Vrste masaža</h2>
                    </div>
                    <div style={{ marginBottom: 0 }}>
                      {
                      this.props.data.oneFisioCl.fisioSkillsNames.map((item, key) => (
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
                          <h4 style={{ color: '#fff' }}>{`${item.fisioSkillName}`}</h4>
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
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src="https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.0-9/14718614_10153836994745689_8529919099735870266_n.jpg?_nc_cat=0&oh=8faa75a7e99a56567b8ab9d40b00bfb6&oe=5B6C3464" 
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
                        {`Score: ${this.props.data.oneFisioCl.score}`}
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
                        src="https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.0-9/14718614_10153836994745689_8529919099735870266_n.jpg?_nc_cat=0&oh=8faa75a7e99a56567b8ab9d40b00bfb6&oe=5B6C3464" 
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
                        {`Lokacija: ${this.props.data.oneFisioCl.birthPlace}`}
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
                        src="https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.0-9/14718614_10153836994745689_8529919099735870266_n.jpg?_nc_cat=0&oh=8faa75a7e99a56567b8ab9d40b00bfb6&oe=5B6C3464" 
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
                        {`Veštine: ${this.props.data.oneFisioCl.fisioSkillsArr.length}`}
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
                        src="https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.0-9/14718614_10153836994745689_8529919099735870266_n.jpg?_nc_cat=0&oh=8faa75a7e99a56567b8ab9d40b00bfb6&oe=5B6C3464" 
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
                        {`Na kućnu adresu: ${this.props.data.oneFisioCl.comesHome ? `DA`: `Ne`}`}
                      </h4>
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
                        style={{ margin: '0 auto', marginBottom: '15px', display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}
                      >
                        <h3 style={{ color: '#fff', fontSize: '19px', fontWeight: '500' }}>{`${this.props.data.oneFisioCl.about}`}</h3>
                      </div>
                      <div>
                        <h3 style={{ color: '#fff', fontSize: '19px', fontWeight: '500', paddingLeft: '10px' }}>{`Sertifikati:`}</h3>
                        <div
                          style={{
                            display: 'flex',
                            webkitFlexWrap: 'wrap',
                            flexWrap: 'wrap',
                          }}
                        >
                          {
                            this.props.data.oneFisioCl.allCertificates.length ?
                              this.props.data.oneFisioCl.allCertificates.map(certItem => (
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
                              Vrsta masaže
                            </th>
                          </tr>
                        </thead>
                        <tbody className="table-hover">
                          {
                            this.props.data.oneFisioCl.fisioCounties.map((item, key) => (
                              <tr>
                                <td>{`${item.fisioCounty.countyName}`}</td>
                                <td>{`${item.address}`}</td>
                                <td>{`${item.price}`}</td>
                                <td>{item.fisioCategory.fisioSkillName}</td>
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
export default FisioOne;
