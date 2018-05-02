import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import css from './styles/styles.scss';

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
        id,
        name,
        phone,
        email,
        address,
        personClub,
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
    this.state = {
      clubCl: []
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.data.clubCl != undefined) {
      this.setState({clubCl: nextProps.data.clubCl})
    }
  }

  render() {
    return(
      <div>
        blblalbbsaa
      </div>
    )
  }
}
export default FilteredClubs;