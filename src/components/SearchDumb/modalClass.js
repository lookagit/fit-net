import React from 'react';
import css from '../styles/styles.scss';

class ModalClass extends React.Component{
  render(){
    return(
      <div className={css.modalClass}>
        {this.props.name}
      </div>
    )
  }
}
export default ModalClass;
