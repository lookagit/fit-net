import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Lightbox } from 'react-modal-image';
import ToolTip from 'react-portal-tooltip';
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
import TextEditorDiabled from './Forms/TextEditorDisabled';

@connect(state => ({
  clubs: state.clubs,
  login: state.login,
}))
@graphql(gql`
  query oneClubCl($clubClId: Int) {
    oneClubCl(clubClId: $clubClId) {
      name
      address,
      galleryImages{
        fileUrl
      },
      webAddress,
      skillsArr,
      email,
      phone,
      facebookLink,
      instagramLink,
      profileImageUrl,
      score,
      about,
      imgsArr
      clubCounty{
        id
        countyName
      }
      memberShipsFees{
        id
        price
        description
        trainingSkill{
          id
          trainSkillName
        }
      }
      clubWorkingTime{
        id
        workDayTo
        workDayFrom
        satFrom
        satTo
        sunFrom
        sunTo
      }
    }
  }`, {
  options: props => ({
    variables: {
      clubClId: props.match.params.id,
    },
  }),
})
class ClubOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalImageVisible: false,
      selectedImageForModal: '',
      isTooltipActive: true,
      about: '',
    };
  }
  componentDidMount() {
    setTimeout(() => this.setState({ isTooltipActive: false }), 1700);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.oneClubCl !== undefined && !nextProps.data.loading) {
      const { data } = nextProps;
      const { oneClubCl } = data;
      const { about } = oneClubCl;
      this.setState({
        about,
      });
    }
  }

  getValueForRTEditor = () => {
    const tmp = this.state.about || '';
    return RichTextEditor ? RichTextEditor.createValueFromString(tmp, 'html') : {};
  };

  showTooltip = () => this.setState({ isTooltipActive: true });

  hideTooltip = () => this.setState({ isTooltipActive: false });

  selecetThisForModal = selectedImageForModal => {
    this.setState({
      selectedImageForModal,
      modalImageVisible: true,
    });
  }

  render() {
    // const [birthDay] = !this.props.data.loading ? this.props.data.oneClubCl.birthDay.split('-') : '';
    const cellPhone = !this.props.data.loading ? 
      typeof this.props.login.accessToken !== 'undefined' ? 
      this.props.data.oneClubCl.phone : 
      this.props.data.oneClubCl.phone.slice(0, this.props.data.oneClubCl.phone.length - 3) + 'xxx' : '';
    const emailConst = !this.props.data.loading ? 
      typeof this.props.login.accessToken !== 'undefined' ? 
      this.props.data.oneClubCl.email : 
      "xxx" + this.props.data.oneClubCl.email.slice(3, this.props.data.oneClubCl.email.length - 3) + 'xxx' : '';
    return (
      <div>
        {
          this.state.modalImageVisible
          ?
            <Lightbox
              medium={this.state.selectedImageForModal}
              alt="Fit-net.rs certificate"
              onClose={() => {
                this.setState({
                  modalImageVisible: false,
                });
              }
              }
            />
          : null
        }
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
                      backgroundImage: `url(${this.props.data.oneClubCl.profileImageUrl})`,
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
                      <h4 style={{ color: '#fff' }}>{` ${this.props.data.oneClubCl.name} `}</h4>
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
                        id="fisioEmail"
                        style={{ color: '#fff', cursor: this.props.login.accessToken === undefined? 'pointer': 'default' }} 
                        onMouseEnter={() => this.showTooltip()} 
                        onMouseLeave={() => this.hideTooltip()}
                        onClick={() => {
                          if (this.props.login.accessToken === undefined) {
                            this.props.dispatch({ type: 'MODAL_VISIBLE', isVisible: true, modalClass: 'login' });
                          }
                        }}
                      >
                        {` ${cellPhone}`}
                      </h4>
                      <ToolTip active={this.state.isTooltipActive} position="bottom" arrow="center" parent="#fisioEmail">
                        <div style={{ maxWidth: '200px', backgroundColor: 'rgba(61,75,105,.7)' }}>
                          <p
                            style={{
                              textAlign: 'center',
                              color: '#fff',
                            }}
                          >
                            Kliknite ovde kako biste se ulogovali i videli kontakt informacije
                          </p>
                        </div>
                      </ToolTip>
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
                    {/* <div
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
                        date={this.props.data.oneFisioCl.birthDay}
                      />
                    </div> */}
                    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                      <h2 style={{ color: '#fff', fontWeight: 'bold' }}>Radno vreme</h2>
                    </div>
                    <div style={{ marginBottom: 0 }}>
                      <div
                        style={{
                          paddingLeft: '10px',
                          paddingTop: '15px',
                          paddingBottom: '15px',
                          border: '1px solid rgb(129,154,206)',
                          borderTopWidth: '1px',
                          borderLeftWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: 'rgb(129,154,206)',
                        }}
                      >
                        <h4 style={{ color: '#fff' }}>Ponedeljak - Petak</h4>
                        <h4 style={{ color: '#fff' }}>{`${this.props.data.oneClubCl.clubWorkingTime.workDayFrom} : ${this.props.data.oneClubCl.clubWorkingTime.workDayTo}`}</h4>
                      </div>
                      <div
                        style={{
                          paddingLeft: '10px',
                          paddingTop: '15px',
                          paddingBottom: '15px',
                          border: '1px solid rgb(129,154,206)',
                          borderTopWidth: '1px',
                          borderLeftWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: 'rgb(129,154,206)',
                        }}
                      >
                        <h4 style={{ color: '#fff' }}>Subota</h4>
                        <h4 style={{ color: '#fff' }}>{`${this.props.data.oneClubCl.clubWorkingTime.satFrom} : ${this.props.data.oneClubCl.clubWorkingTime.satTo}`}</h4>
                      </div>
                      <div
                        style={{
                          paddingLeft: '10px',
                          paddingTop: '15px',
                          paddingBottom: '15px',
                          border: '1px solid rgb(129,154,206)',
                          borderTopWidth: '1px',
                          borderLeftWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: 'rgb(129,154,206)',
                        }}
                      >
                        <h4 style={{ color: '#fff' }}>Nedelja</h4>
                        <h4 style={{ color: '#fff' }}>{`${this.props.data.oneClubCl.clubWorkingTime.sunFrom} : ${this.props.data.oneClubCl.clubWorkingTime.sunTo}`}</h4>
                      </div>
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
                          {`Score: ${this.props.data.oneClubCl.score}`}
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
                          src={locationImage}
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
                          {`Web: ${this.props.data.oneClubCl.webAddress}`}
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
                          alt="Skill for fisio Fit-Net"
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
                          {`Veštine: ${this.props.data.oneClubCl.memberShipsFees.length}`}
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
                          alt="Score for fisio Fit-Net"
                          height="90"
                          width="90"
                        />
                        {/* <h4
                          style={{
                            color: '#fff',
                            textAlign: 'center',
                            marginTop: '5px',
                          }}
                        >
                          {`Na kućnu adresu: ${this.props.data.oneFisioCl.comesHome ? `DA`: `Ne`}`}
                        </h4> */}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                     width: '100%',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                      }}
                    >
                      <div
                        style={{ display: 'flex', flexDirection: 'column', paddingBottom: '10px' }}
                      >
                        <h3 style={{ color: '#fff', fontSize: '19px', fontWeight: '500' }}>{`Opis:`}</h3>
                        <TextEditorDiabled
                          text={this.state.about}
                        />
                      </div>
                      <div>
                        <h3 style={{ color: '#fff', fontSize: '19px', fontWeight: '500'}}>{`Slike:`}</h3>
                        <div
                          style={{
                            display: 'flex',
                            webkitFlexWrap: 'wrap',
                            flexWrap: 'wrap',
                          }}
                        >
                          {
                            this.props.data.oneClubCl.galleryImages.length ?
                              this.props.data.oneClubCl.galleryImages.map(certItem => (
                                <div
                                  style={{
                                    padding: '10px',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => {
                                    this.selecetThisForModal(certItem.fileUrl);
                                  }}
                                >
                                  <img
                                    alt="Fit-net.rs certificate"
                                    width="80"
                                    height="80"
                                    src={`${certItem.fileUrl}`}
                                  />
                                </div>
                              )) : <h3 style={{ color: '#fff' }}>Ovaj klub nema slike.</h3>
                          }
                        </div>
                      </div>
                    </div>
                    <div style={{ overflowX: 'auto', marginBottom: '50px' }}>
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
                          </tr>
                        </thead>
                        <tbody className="table-hover">
                          {
                            this.props.data.oneClubCl.memberShipsFees.map((item, key) => (
                              <tr>
                                {/* <td>{`${item.fisioCounty.countyName}`}</td> */}
                                <td>test</td>
                                <td>{`${item.description}`}</td>
                                <td>{`${item.price}`}</td>
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
export default ClubOne;
