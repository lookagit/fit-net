import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import css from './styles/styles.scss';
import AfterSearchItemCouch from './AfterSearchItemCouch';
import Loading from 'react-loading-components';
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
  options: (props) => {
    return ({
      variables: {
        skillIds: props.coaches.skillArr,
        priceFrom: props.coaches.priceFrom,
        priceTo: props.coaches.priceTo,
        countyId: props.coaches.countyId,
        groupTraining: props.coaches.groupTraining,
        certified: props.coaches.certified
      }
    })
  },
})


class FilteredCoaches extends React.Component {
  render() {
    console.log("JA SAM BRT PROPS ", this.props);
    return(
      <div 
        style={{
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div 
          style={{
            width: '80%',
            paddingTop: '50px',
            maxWidth: '1400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          {
            this.props.data.loading ? <Loading type='puff' width={150} height={150} fill='#f44242' /> : 
            this.props.data.personCl.length ?
               this.props.data.personCl.map((item, key) => (
                 <AfterSearchItemCouch couchProp={item} key={key} />
               )) : null
          }
        </div>
      </div>
    )
  }
}
export default FilteredCoaches;
