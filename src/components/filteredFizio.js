import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Loading from 'react-loading-components';
import css from './styles/styles.scss';
import AfterSearchItemFisio from './AfterSearchItemFisio';
import LogoBright from '../../static/logoBright.png';
import FilteredDecisionFisio from './FilteredDecisionFisio';

@connect(state => ({ fizio: state.fizio }))
@graphql(
  gql`
  query fisoCl(
    $skillIds: [Int],
    $priceFrom: Int,
    $priceTo: Int,
    $countyId: Int,
    $comesHome: Boolean,
    $hasCerificates: Boolean
  ) {
    fisoCl(
      skillIds: $skillIds,
      priceFrom: $priceFrom,
      priceTo: $priceTo,
      countyId: $countyId,
      comesHome: $comesHome,
      hasCerificates: $hasCerificates
    ) {
      id
      firstName
      lastName
      facebookLink
      instagramLink
      imageUrl
      about
      birthPlace
      birthDay
      saloonName
      fisioSkillsNames {
        fisioSkillName
      }
    }
  }
  `,
  {
    options: props => ({
      variables: {
        skillIds: props.fizio.skillArr,
        priceFrom: parseInt(props.fizio.priceFrom),
        priceTo: parseInt(props.fizio.priceTo),
        countyId: props.fizio.countiesId,
        comesHome: props.fizio.comesHome,
        hasCerificates: props.fizio.certified,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
    }),
  },
)
class FilteredFizio extends React.Component {
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
              <FilteredDecisionFisio fisoCl={this.props.data.fisoCl} />
          }
        </div>
      </div>
    );
  }
}
export default FilteredFizio;
