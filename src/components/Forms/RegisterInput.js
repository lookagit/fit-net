import React from 'react';
import { validateEmail } from './validationFuncs';

const InputFine = ({placeHolder, type, updateFunc, setWarning, value}) => (
  <input 
    placeholder={placeHolder} 
    type={type ? type : 'text'}
    value={value}
    onChange={e => {
        updateFunc(e);
    }}
  />
);
export default InputFine;
