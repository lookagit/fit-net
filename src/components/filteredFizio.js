import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Loading from 'react-loading-components';
import css from './styles/styles.scss';
import AfterSearchItemFisio from './AfterSearchItemFisio';

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
    }
  }
  `,
  {
    options: props => ({
      variables: {
        skillIds: props.fizio.skillArr,
        priceFrom: props.fizio.priceFrom,
        priceTo: props.fizio.priceTo,
        countyId: props.fizio.countyId,
        comesHome: props.fizio.comesHome,
        hasCerificates: props.fizio.certified,
      },
    }),
  },
)
class FilteredFizio extends React.Component {
  render() {
    /** TODO MAKE ONE FISO COMPONENT */
    return (
      <div className={css.coachesWrapper}>
        <div className={css.coachesHolder}>
          {
            this.props.data.loading ? 
              <Loading 
                type='puff' 
                width={150} 
                height={150} 
                fill='#f44242' 
              /> : 
              this.props.data.fisoCl.length ?
                this.props.data.fisoCl.map((item, key) => (
                  <AfterSearchItemFisio
                    couchProp={item}
                    key={key} 
                  />
                )) : null
          }
        </div>
      </div>
    );
  }
}
export default FilteredFizio;
