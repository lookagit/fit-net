import React from 'react';
import logoBright from '../../../static/logoBright.png';

const WelcomeMessage = props => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <img
      alt="FIT-NET Logo"
      src={logoBright}
      width="185px"
      height="90px"
    />
    <img
      alt="Fit net user"
      src={props.imageUrl}
      width="150px"
      height="150px"
      style={{
        borderRadius: '50%',
        marginTop: '-15px',
      }}
    />
    <h3
      style={{
        color: '#fff',
        fontSize: '22px',
        textAlign: 'center',
        marginTop: '5px',
      }}
    >
      {`Dobrodosli ${props.firstName}`}
    </h3>
  </div>
);
export default WelcomeMessage;
