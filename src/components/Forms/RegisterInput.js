import React from 'react';
import { validateEmail } from './validationFuncs';

const InputFine = ({placeHolder, type, updateFunc, setWarning}) => (
  <input 
    placeholder={placeHolder} 
    type={type ? type : 'text'}
    onChange={e => {
        if (validateEmail(e.target.value)) {
            updateFunc(e);
        } else {
            console.log("NIJE DOBROOOOOOOO");
            //setWarning();
        }
        
    }}
  />
);
export default InputFine;
