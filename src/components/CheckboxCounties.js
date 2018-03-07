import React from 'react';
import css from './styles/styles.scss';

class CheckboxCounties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }
  toggleChange = () => {
    this.props.updateState(this.props.countiesId, this.props.countiesName);
    this.setState({
      checked: !this.state.checked,
    });
  }
  render() {
    return (
      <div
        style={{
          pointerEvents:`${this.props.clickCount == 1 &&
            this.state.checked ==
            false ? 'none' : 'auto'}`,
          background:`rgba(61, 75, 105,${this.state.checked ? 0.8 : 0.3})`}}
        onClick={()=>this.toggleChange()}
        className={css.categorieModalItem}>
        <label
          style={{
            cursor:'pointer',
            color:`${this.state.checked ? '#fff' :
                  !this.state.checked && this.props.clickCount == 1 ? 'rgba(61, 75, 105, .3)' :
                  '#000'}`
          }}>
          {this.props.countiesName}
        </label>
        <input
          disabled={this.props.clickCount === 1 && this.state.checked === false}
          type="checkbox"
          checked={this.state.checked}
        />
      </div>
    );
  }
}
export default CheckboxCounties;
