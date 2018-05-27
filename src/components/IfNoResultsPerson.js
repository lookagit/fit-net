import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import css from './styles/styles.scss';
import AfterSearchItemCouch from './AfterSearchItemCouch';
import LogoBright from '../../static/logoBright.png';

@graphql(gql`
  query personClFindAll {
    personClFindAll {
      id
      firstName
      lastName
      facebookLink
      instagramLink
      imageUrl
      about
      birthPlace
      birthDay
      personClub
      score
      trainingPersonSkills {
        trainSkillName
      }
    }
  }`)
class IfNoResultsPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  render() {
    return (
      <div>
        <div
          style={{
            width: '60%',
            padding: '20px',
            display: 'flex',
            margin: '0 auto',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px',
            backgroundColor: 'rgba(255,255,255,0.2)',
          }}
        >
          <img
            alt="Logo FIT-NET.RS"
            src={LogoBright}
            width="200"
            height="120"
          />
          <h2
            style={{
              color: 'white',
              textAlign: 'center',
            }}
          >
            ZAO NAM JE TRENUTNO NEMAMO REZULTATE PRETRAGE PO VASEM KRITERIJUMU
          </h2>
        </div>
        <div className={css.coachesWrapper}>
          <div className={css.coachesHolder}>
            <h2
              style={{
                color: '#fff',
                marginBottom: '10px',
              }}
            >
              Top 10 trenera
            </h2>
            {
              !this.props.data.loading && this.props.data.personClFindAll.length ?
                this.props.data.personClFindAll.map((item, key) => (
                  <AfterSearchItemCouch couchProp={item} key={key} />
                )) : null
            }
          </div>
        </div>
      </div>
    );
  }
}
export default IfNoResultsPerson;
