import React from 'react';
import css from '../styles/styles.scss';

const DropdownSelectCity = ({ array, handleClick, styles, firstOption, label, selected }) => (
  <div className={css.customSelect} style={styles}>
    <h3 style={{ color: 'white', padding: 5, paddingTop: 0 }}>{label}</h3>
    <select onChange={handleClick}>
      <option selected={selected === '' ? 'selected' : null}>{firstOption}</option>
      {
        array.map((item, key) => (
          <option value={item.id} key={key} selected={selected === item.id ? 'selected' : null}>{item.cityName}</option>
        ))
      }
    </select>
  </div>
);

export default DropdownSelectCity;
