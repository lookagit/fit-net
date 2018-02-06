import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import css from './styles/styles.scss';
import Loading from 'react-loading-components';
@connect(state => ({ fizio: state.fizio }))

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
