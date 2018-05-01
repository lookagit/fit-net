import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Loading from 'react-loading-components';
import css from './styles/styles.scss';
import AfterSearchItemFisio from './AfterSearchItemFisio';
import LogoBright from '../../static/logoBright.png';

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
    }),
  },
)
class FilteredFizio extends React.Component {
  render() {
    /** TODO MAKE ONE FISO COMPONENT */
    console.log("JA SAM PROPS ", this.props.data);
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
    );
  }
}
export default FilteredFizio;
