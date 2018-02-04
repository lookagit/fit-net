import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import css from './styles/styles.scss';

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
        firstName
        lastName
        facebookLink
        instagramLink
        imageUrl
        about
        birthPlace
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
  constructor(props){
    super(props);
    this.state = {
      people: []
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.data.personCl != undefined) {
      this.setState({people: nextProps.data.personCl})
    }
  }

  render() {
    console.log("OVO SU LJUDI ", this.state.people);
    let proba = this.state.people.map(item => {
      return item.firstName
    });
    return(
      <div>
        {proba}
      </div>
    )
  }
}
export default FilteredCoaches;
