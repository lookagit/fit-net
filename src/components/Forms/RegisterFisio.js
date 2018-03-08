import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import DatePicker from 'react-datepicker';
import Moment from 'moment-timezone';
import Uppy from '../Uppy';
import css from '../styles/styles.scss';
import RegisterInput from './RegisterInput';
import faker from 'faker';
import {
  validateStringNames,
  validateEmail,
  validatePassword,
  validatePhone,
  validateBirthPlace,
  validateUrl,
  validateAbout,
} from './validationFuncs';
import { defaultCipherList } from 'constants';
import { connect } from 'react-redux'
import SearchBox from '../searchBox';
const axios = require('axios');
@connect(state => ({ 
  fizio: state.fizio,
  coaches: state.coaches,
}))
@graphql(gql`
  mutation updateOrCreateFisio(
    $email: String,
    $password: String,
    $firstName: String,
    $lastName: String,
    $facebookLink: String,
    $instagramLink: String,
    $cellPhone: String,
    $birthPlace: String,
    $birthDay: String,
    $hasCerificates: Boolean,
    $about: String,
    $imageUrl: String,
    $fisioSkillsArr: [Int]
  ) {
    updateOrCreateFisio(
      email: $email,
      password: $password,
      firstName: $firstName,
      lastName: $lastName,
      facebookLink: $facebookLink,
      instagramLink: $instagramLink,
      cellPhone: $cellPhone,
      birthPlace: $birthPlace,
      birthDay: $birthDay,
      hasCerificates: $hasCerificates,
      about: $about,
      imageUrl: $imageUrl,
      fisioSkillsArr: $fisioSkillsArr
    ) {
      id
    }
  }`,
  {
    name: 'registerNewFisio',
  },
)
class RegisterFisio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthPlace: '',
      dateSelected: Moment(),
      date: '',
      about: '',
      facebookLink: '',
      instagramLink: '',
      phone: '+381',
      hasCerificates: false,
      file: null,
      imgUrl: 'https://google.com',
      skillArr: [],
      
    }
  }
    newFisio = async () => {
      // let url = '';
      // const { file } = this.state;
      // const fakerUuid = faker.random.uuid();
      // const fileType = file.type.split('/').pop();
      // const uniqueNameForImg = `${fakerUuid}.${fileType}`;
      // if (process.env.NODE_ENV === 'production') {
      //   url = 'https://fit-net.herokuapp.com/ping/';
      // } else {
      //   url = 'http://localhost:8081/ping/';
      // }
      // const axiosStuff = await axios.get(`${url}${uniqueNameForImg}/${file.type}`);
      // if (axiosStuff) {
      //   const signedUrl = axiosStuff.data;
      //   const options = {
      //     'Content-Type': file.type,
      //   };
      //   const putOnServer = await axios.put(signedUrl, file, options);
      //   if (putOnServer) {
      //     console.log("JA SAM NA SERVERU BATICEEEEE 0", putOnServer);
      //   } else {
      //     console.log("IZDUVASMO GA BATICE ", putOnServer);
      //   }
      // }
      const mutation = await this.props.registerNewFisio(
        {
          variables: {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            facebookLink: this.state.facebookLink,
            instagramLink: this.state.instagramLink,
            cellPhone: this.state.phone,
            birthPlace: this.state.birthPlace,
            birthDay: this.state.date,
            hasCertificates: this.state.hasCerificates,
            about: this.state.about,
            imageUrl: `https://fitnetbucket.s3.eu-west-3.amazonaws.com/`,
            fisioSkillsArr: this.state.skillArr,
          },
        },
      );
      console.log("resp:",mutation);
      if (mutation) {
        console.log('prosaooo', mutation);
      } else {
        console.log('prsoo', mutation);
      }
    }

    fizioCategories = (skillId) => {
      let {skillArr} = this.state;
      if (skillArr.includes(skillId)) {
        let a = this.state.skillArr;
        let b = a.indexOf(skillId);
        a.splice(b, 1);
        this.setState({
          skillArr: a
        })
      } else {
        this.setState({
          skillArr: [...skillArr, parseInt(skillId)]
        })
      }
    }
    

    handleChange = (date) => {
      let d1 = Moment(date._d).format();
      let dateformated = d1.slice(0,10);
      this.setState({
        date: dateformated,
        dateSelected: date,
      });
    }
  
  render() {
    console.log('evee ti state iz register fizio',this.state);
    return(
      <div className={css.registerFisioWrapper}>
        <div className={css.registerFisio}>
          <div className={css.registerFisioOne}>
            {/* <h3>Fizio</h3> */}
            <div>
              {/* <label className={css.labelsRegister}>First name</label> */}
              <RegisterInput
                placeHolder="First name"
                type="text"
                updateFunc={(e) => {
                  if (validateStringNames(e.target.value)) {
                    console.log('ime je ok!!')
                     this.setState({firstName: e.target.value})
                  } else {
                    console.warn('nije ok ime!')
                  }
                }}
              />
            </div>
            <div>
              {/* <label className={css.labelsRegister}>Last name</label> */}
              <RegisterInput
                placeHolder="Last name"
                type="text"
                updateFunc={(e) => {
                  if (validateStringNames(e.target.value)) {
                     this.setState({lastName: e.target.value})
                  } else {
                    console.warn('nije ok prezime!')
                  }
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div>
              {/* <label className={css.labelsRegister}>Email</label> */}
              <RegisterInput
                placeHolder="Email"
                type="text"
                updateFunc={(e) => {
                  if (validateEmail(e.target.value)) {
                     this.setState({email: e.target.value})
                  } else {
                    console.warn('nije ok email!')
                  }
                }}
              />
            </div>
            <div>
              {/* <label className={css.labelsRegister}>Password</label> */}
              <RegisterInput
                placeHolder="Password"
                type="text"
                updateFunc={(e) => {
                  if (validatePassword(e.target.value)) {
                     this.setState({password: e.target.value})
                  } else {
                    console.warn('nije ok password!')
                  }
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div>
              {/* <label className={css.labelsRegister}>Phone</label> */}
              <RegisterInput
                placeHolder="Phone"
                type="text"
                value={this.state.phone}
                updateFunc={(e) => {
                  if (validatePhone(e.target.value)) {
                     this.setState({phone: e.target.value})
                  } else {
                    console.warn('nije ok phone!')
                  }
                }}
              />
            </div>
            <div>
              {/* <label className={css.labelsRegister}>Birtday Place</label> */}
              <RegisterInput
                placeHolder="Birthday Place"
                type="text"
                updateFunc={(e) => {
                  if (validateBirthPlace(e.target.value)) {
                     this.setState({birthPlace: e.target.value})
                  } else {
                    console.warn('nije ok birthday place!')
                  }
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div>
              {/* <label className={css.labelsRegister}>Facebook Link</label> */}
              <RegisterInput
                placeHolder="Facebook Link"
                type="text"
                updateFunc={(e) => {
                  if (validateUrl(e.target.value)) {
                     this.setState({facebookLink: e.target.value})
                  } else {
                    console.warn('nije ok link facebooka!')
                  }
                }}
              />
            </div>
            <div>
              {/* <label className={css.labelsRegister}>Instagram Link</label> */}
              <RegisterInput
                placeHolder="Instagram Link"
                type="text"
                updateFunc={(e) => {
                  if (validateUrl(e.target.value)) {
                     this.setState({instagramLink: e.target.value})
                  } else {
                    console.warn('nije ok link instagram!')
                  }
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div>
              {/* <label className={css.labelsRegister}>About</label> */}
              <RegisterInput
                placeHolder="About"
                type="text"
                updateFunc={(e) => {
                  if (validateAbout(e.target.value)) {
                     this.setState({about: e.target.value})
                  } else {
                    console.warn('nije ok about!')
                  }
                }}
                />
            </div>
            <div>
              {/* <label className={css.labelsRegister}>Birtday Date</label> */}
              <DatePicker
                selected={this.state.dateSelected}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
        <div className={css.registerFisioOne}>
          <Uppy setRegister={injectFile => this.setState({file: injectFile })} />
        </div>




        
        <div >
          <SearchBox 
            fizio
            categories
            fizioCategories={this.fizioCategories}
          />
        </div>






        <div className={css.registerFisioOne}>
          <button onClick={() => {
            this.newFisio();
          }}
          >REGISTER FISIO</button>
        </div>
      </div>
    );
  }
}
export default RegisterFisio