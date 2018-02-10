import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import css from './styles/styles.scss';
import Loading from 'react-loading-components';
@connect(state => ({ fizio: state.fizio }))
// @graphql(gql`
// query personCl(
//   $skillIds: [Int],
//   $priceFrom: Int,
//   $priceTo: Int,
//   $countyId: Int,
//   $groupTraining: Boolean,
//   $certified: Boolean) {
//     personCl(
//       skillIds: $skillIds
//       priceFrom: $priceFrom,
//       priceTo: $priceTo,
//       countyId: $countyId,
//       groupTraining: $groupTraining,
//       certified: $certified) {
//         firstName
//         lastName
//         facebookLink
//         instagramLink
//         imageUrl
//         about
//         birthPlace
//         birthDay 
//         trainingPersonSkills {
//           trainSkillName
//         }
//     }
//   }`,
// {
//   options: (props) => {
//     return ({
//       variables: {
//         skillIds: props.coaches.skillArr,
//         priceFrom: props.coaches.priceFrom,
//         priceTo: props.coaches.priceTo,
//         countyId: props.coaches.countyId,
//         groupTraining: props.coaches.groupTraining,
//         certified: props.coaches.certified
//       }
//     })
//   },
// })

class FilteredFizio extends React.Component{
  render(){
    console.log('OVO SI TRAZIO', this.props)
    return(
      <div>
         FIZIO
      </div>
    )
  }
}
export default FilteredFizio;
