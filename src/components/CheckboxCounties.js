import React from 'react';
import css from './styles/styles.scss';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';

class CheckboxCounties extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      checked: false,
    }
  }
  toggleChange = () => {
    this.props.updateState(this.props.countiesId, this.props.countiesName);
    this.setState({
      checked: !this.state.checked,
    });
  }
  render() {
    return(
      <div  style={{background:`rgba(61, 75, 105,${this.state.checked ? 0.8 : 0.3})`}}  onClick={()=>this.toggleChange()} className={css.categorieModalItem} >
        <label>{this.props.countiesName}</label>
        <input
          type="checkbox"
          checked={this.state.checked}
        />
      </div>
    )
  }
}
export default CheckboxCounties;
