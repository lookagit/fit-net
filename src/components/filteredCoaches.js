import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Loading from 'react-loading-components';
import css from './styles/styles.scss';
import AfterSearchItemCouch from './AfterSearchItemCouch';
import LogoBright from '../../static/logoBright.png';

@connect(state => ({ coaches: state.coaches }))
@graphql(gql`
query personCl(
  $skillIds: [Int],
  $priceFrom: Int,
  $priceTo: Int,
  $countyId: Int,
  $groupTraining: Boolean,
  $certified: Boolean) {
    personCl(
      skillIds: $skillIds
      priceFrom: $priceFrom,
      priceTo: $priceTo,
      countyId: $countyId,
      groupTraining: $groupTraining,
      certified: $certified) {
        id
        firstName
        lastName
        facebookLink
        instagramLink
        imageUrl
        about
        birthPlace
        birthDay 
        trainingPersonSkills {
          trainSkillName
        }
    }
  }`,
{
  options: props => {
    return ({
      variables: {
        skillIds: props.coaches.skillArr,
        priceFrom: parseInt(props.coaches.priceFrom),
        priceTo: parseInt(props.coaches.priceTo),
        countyId: props.coaches.countyId,
        groupTraining: props.coaches.groupTraining,
        certified: props.coaches.certified,
      },
    });
  },
})


class FilteredCoaches extends React.Component {
  render() {
    console.log('PROPS ', this.props.data);
    return (
      <div className={css.coachesWrapper}>
        <div className={css.coachesHolder}>
          {
            this.props.data.loading ? 
              <Loading type='puff' width={150} height={150} fill='#f44242' /> :
                this.props.data.personCl.length ?
                this.props.data.personCl.map((item, key) => (
                 <AfterSearchItemCouch couchProp={item} key={key} />
                )) : (
                  <div
                    style={{
                      width: '60%',
                      padding: '20px',
                      display: 'flex',
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
                        textAlign: 'center'
                      }}
                    >
                      ZAO NAM JE TRENUTNO NEMAMO REZULTATE PRETRAGE PO VASEM KRITERIJUMU
                    </h2>
                  </div>
              )
          }
        </div>
      </div>
    )
  }
}
export default FilteredCoaches;
