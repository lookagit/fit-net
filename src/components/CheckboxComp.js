import React from 'react';
import css from './styles/styles.scss';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';

class CheckboxComp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      checked: false,
    }
  }
  toggleChange = () => {
    this.props.updateState(this.props.catId, this.props.catName);
    this.setState({
      checked: !this.state.checked,
    });
  }
  render() {
    return(
      <div  onClick={()=>this.toggleChange()} className={css.categorieModalItem}>
        <label>{this.props.catName}</label>
        <input 
          type="checkbox" 
          checked={this.state.checked}
        />
      </div>
    )
  }
}
export default CheckboxComp;
