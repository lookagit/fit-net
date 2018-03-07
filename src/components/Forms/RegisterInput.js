import React from 'react';
import { validateEmail } from './validationFuncs';
import css from '../styles/styles.scss';

const InputFine = ({placeHolder, type, updateFunc, setWarning, value}) => (
  <input
    className={css.registerInput}
    placeholder={placeHolder} 
    type={type ? type : 'text'}
    value={value}
    onChange={e => {
        updateFunc(e);
    }}
  />
);
export default InputFine;
