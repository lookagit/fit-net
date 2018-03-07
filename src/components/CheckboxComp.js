import React from 'react';
import css from './styles/styles.scss';

class CheckboxComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }
  toggleChange = () => {
    this.props.updateState(this.props.catId, this.props.catName);
    this.setState({
      checked: !this.state.checked,
    });
  }
  render() {
    return (
      <div 
        style={{pointerEvents:`${this.props.clickCount > 4 &&
        this.state.checked ==false ? 'none' : 'auto'}`,
        background:`${this.state.checked ?
        'rgba(61, 75, 105, .8)' : 'rgba(61, 75, 105, .3)'}`}}
        onClick={()=>this.toggleChange()}
        className={css.categorieModalItem}>
        <label 
          style={{
          cursor:'pointer',
          color:`${this.state.checked ? '#fff' :
          !this.state.checked && this.props.clickCount > 4 ?
          'rgba(61, 75, 105, .3)' :
          '#000'}`}}>
          {this.props.catName}
        </label>
        <input
          disabled={this.props.clickCount > 4 && this.state.checked === false}
          type="checkbox"
          checked={this.state.checked}
        />
      </div>
    );
  }
}
export default CheckboxComp;
