import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Loading from 'react-loading-components';
import css from './styles/styles.scss';
import FilteredDecisionCoach from './FilteredDecisionCoach';


@connect(state => ({ coaches: state.coaches }))
@graphql(gql`
  query personCl($skillIds: [Int],
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
        personClub
        trainingPersonSkills {
          trainSkillName
        }
    }
  }`,
{
  options: props => ({
    variables: {
      skillIds: props.coaches.skillArr,
      priceFrom: parseInt(props.coaches.priceFrom),
      priceTo: parseInt(props.coaches.priceTo),
      countyId: props.coaches.countyId,
      groupTraining: props.coaches.groupTraining,
      certified: props.coaches.certified,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  }),
})


class FilteredCoaches extends React.Component {
  render() {
    return (
      <div className={css.coachesWrapper}>
        <div className={css.coachesHolder}>
          {
            this.props.data.loading ?
              <Loading
                type="puff"
                width={150}
                height={150}
                fill="#f44242"
              /> :
              <FilteredDecisionCoach personCl={this.props.data.personCl} />
          }
        </div>
      </div>
    );
  }
}
export default FilteredCoaches;
