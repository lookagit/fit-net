import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import css from './styles/styles.scss';
import Loading from 'react-loading-components';
import AfterSearchItemClub from './AfterSearchItemClub';
@connect(state => ({ clubs: state.clubs }))

@graphql(gql`
query clubCl(
  $skillIds: [Int],
  $countyId: Int,) 
  {
    clubCl(
      skillIds: $skillIds
      countyId: $countyId,) 
      {
        name,
        phone,
        email,
        address,
        facebookLink,
        instagramLink,
        profileImageUrl,
        score,
        clubWorkingTime {
          id
        },
    }
  }`,
{
  options: (props) => {
    return ({
      variables: {
        skillIds: props.clubs.skillId,
        countyId: props.clubs.countiesId,
      }
    })
  },
})


class FilteredClubs extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
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
            this.props.data.clubCl.length ?
               this.props.data.clubCl.map((item, key) => (
                 <AfterSearchItemClub clubs={item} key={key} />
               )) : null
          }
          </div>
      </div>
    )
  }
}
export default FilteredClubs;