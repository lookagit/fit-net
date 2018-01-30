import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

@connect(state => ({ coaches: state.coaches }))

@graphql(gql`
query personCl(
        $skillIds: Int,
        $priceFrom: Int,
        $priceTo: Int,
        $countyId: Int,
        $groupTraining: boolean,
        $certified: boolean) {
        personCl(
          skillIds: $skillIds
          priceFrom: $priceFrom,
          priceTo: $priceTo,
          countyId: $countyId,
          groupTraining: $groupTraining,
          certified: $certified) {
    firstName
    lastName
  }
}`,
{
  options: (props) => {
    return ({
      variables: {
        skillIds: props.coaches.skillIds,
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
    console.log('POZDRAV IZ NOVE KOMPONENTE', this.props.coaches)
    return(
      <div>
        {firstName}
      </div>
    )
  }
}
export default FilteredCoaches;
