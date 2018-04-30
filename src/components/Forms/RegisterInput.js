import React from 'react';
import { validateEmail } from './validationFuncs';
import css from '../styles/styles.scss';

const InputFine = ({ placeHolder, type, updateFunc, value, styles, disableClass }) => (
  <input
    className={disableClass ? '' : css.registerInput}
    style={styles}
    placeholder={placeHolder} 
    type={type ? type : 'text'}
    value={value}
    onChange={e => {
        updateFunc(e);
    }}
  />
);
export default InputFine;
