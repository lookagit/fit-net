import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

@withRouter
@connect(state => ({ login: state.login }))
class UserLogedIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userPerson: null,
            userFisio: null,
            userClub: null,
            doWeHaveAccount: false,
        }
    }
    componentDidMount() {
        this.isLogedIn();
    }
    
    isLogedIn = async () => {
        if (window) {
            const isLogedIn = await window.localStorage.getItem('fbToken');
            if (isLogedIn) {
                const { accessToken } = JSON.parse(isLogedIn);
                if (accessToken) {
                    console.log(accessToken);
                    const { userPerson, userFisio, userClub, id } = accessToken
                    this.setState({
                        userPerson,
                        userFisio,
                        userClub
                    })
                }
            }
        }
    }
    render() {
        const { userPerson, userFisio, userClub, id } = this.state;
        return (
            <div
              style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
              }}
            >
                <div
                  style={{
                      width: '60%',
                      margin: '0 auto',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '20px 0'
                  }}
                >
                    <div
                        style={{
                            padding: '10px 0'
                        }}
                    >
                       <h3
                           style={{
                               color: '#fff'
                           }}
                       >
                           Trener:
                       </h3>
                    </div>
                {
                    userPerson ?
                        <div
                          style={{
                              display: 'flex',
                              flexDirection: 'row',
                              backgroundColor: '#3f4668',
                              borderRadius: '10px',
                              padding: '10px'
                          }}
                        >
                            <div 
                                style={{
                                    display: 'flex',
                                    flex: 1,
                                    margin: '0 auto',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <img 
                                    src={userPerson.imageUrl}
                                    style={{
                                        borderRadius: '10px',
                                        width: '70%',
                                        height: '80%'
                                    }}
                                />
                            </div>
                            <div 
                                style={{
                                    flex: 1,
                                    justifyContent: 'flex-start',
                                    display: 'flex',
                                    padding: '30px 0',
                                }}
                            >
                                <div>
                                    <div>
                                        <h3
                                            style={{
                                                color: '#fff'
                                            }}
                                        >
                                            {`Ime: ${userPerson.firstName} ${userPerson.lastName}`}
                                        </h3>
                                        <h3
                                            style={{
                                                color: '#fff'
                                            }}
                                        >
                                            {`Email: ${userPerson.email}`}
                                        </h3>
                                    </div>
                                </div>
                            </div>  
                            <div
                                style={{
                                    flex: 2,
                                    padding: '30px 10px',
                                    justifyContent: 'flex-end'
                                }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                    <div 
                                        style={{
                                          flexDirection: 'row',
                                          paddingBottom: '5px'
                                          }}
                                    >
                                        <RaisedButton
                                            label="Editujte profil"
                                            labelColor="#fff"
                                            labelStyle={{ fontWeight: '700' }}
                                            backgroundColor="#1da9ec"
                                            onClick={() => {
                                              this.props.history.push('/edit-user');
                                            }}
                                        />
                                    </div>
                                    <div 
                                        style={{
                                          flexDirection: 'row',
                                          paddingBottom: '5px'
                                          }}
                                    >
                                        <RaisedButton
                                            label="Editujte sertifikate"
                                            labelColor="#fff"
                                            labelStyle={{ fontWeight: '700' }}
                                            backgroundColor="#1da9ec"
                                            onClick={() => {
                                              this.props.history.push(`/edit-user-certificates`);
                                            }}
                                        />
                                    </div>
                                    <div 
                                        style={{
                                          flexDirection: 'row',
                                          }}
                                    >
                                        <RaisedButton
                                            label="Editujte lokacije i cene"
                                            labelColor="#fff"
                                            labelStyle={{ fontWeight: '700' }}
                                            backgroundColor="#1da9ec"
                                            onClick={() => {
                                              this.props.history.push(`/edit-user-price-location`);
                                            }}
                                        />
                                    </div>
                                    </div>
                            </div>   
                        </div> : 
                        <h3
                            style={{
                                color: '#fff'
                            }}
                        >
                          Nemate profil
                        </h3>
                }
                <div
                        style={{
                            padding: '10px 0',
                            marginTop: '10px'
                        }}
                    >
                       <h3
                           style={{
                               color: '#fff'
                           }}
                       >
                           Fizijatar:
                       </h3>
                    </div>
                {   userFisio ?
                    <div
                      style={{
                          display: 'flex',
                          flexDirection: 'row',
                          backgroundColor: '#3f4668',
                          borderRadius: '10px',
                          padding: '10px',
                          marginTop: '10px'
                      }}
                    >
                        <div 
                            style={{
                                display: 'flex',
                                flex: 1,
                                margin: '0 auto',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <img 
                                src={userFisio.imageUrl}
                                style={{
                                    borderRadius: '10px',
                                    width: '70%',
                                    height: '80%'
                                }}
                            />
                        </div>
                        <div 
                            style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                                display: 'flex',
                                padding: '30px 0',
                            }}
                        >
                            <div>
                                <div>
                                    <h3
                                        style={{
                                            color: '#fff'
                                        }}
                                    >
                                        {`Ime: ${userFisio.firstName} ${userFisio.lastName}`}
                                    </h3>
                                    <h3
                                        style={{
                                            color: '#fff'
                                        }}
                                    >
                                        {`Email: ${userFisio.email}`}
                                    </h3>
                                </div>
                            </div>
                        </div>  
                        <div
                            style={{
                                flex: 2,
                                padding: '30px 10px',
                                justifyContent: 'flex-end'
                            }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                <div 
                                    style={{
                                      flexDirection: 'row',
                                      paddingBottom: '5px'
                                      }}
                                >
                                    <RaisedButton
                                        label="Editujte profil"
                                        labelColor="#fff"
                                        labelStyle={{ fontWeight: '700' }}
                                        backgroundColor="#1da9ec"
                                        onClick={() => {
                                          this.props.history.push('/edit-fisio');
                                        }}
                                    />
                                </div>
                                <div 
                                    style={{
                                      flexDirection: 'row',
                                      paddingBottom: '5px'
                                      }}
                                >
                                    <RaisedButton
                                        label="Editujte sertifikate"
                                        labelColor="#fff"
                                        labelStyle={{ fontWeight: '700' }}
                                        backgroundColor="#1da9ec"
                                        onClick={() => {
                                          this.props.history.push(`/edit-fisio-certificates`);
                                        }}
                                    />
                                </div>
                                <div 
                                    style={{
                                      flexDirection: 'row',
                                      }}
                                >
                                    <RaisedButton
                                        label="Editujte lokacije i cene"
                                        labelColor="#fff"
                                        labelStyle={{ fontWeight: '700' }}
                                        backgroundColor="#1da9ec"
                                        onClick={() => {
                                          this.props.history.push(`/edit-fisio-price-location`);
                                        }}
                                    />
                                </div>
                                </div>
                        </div>   
                    </div> : null
                }
                </div>
            </div>
        )
    }
}

export default UserLogedIn;