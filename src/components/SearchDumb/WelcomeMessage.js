import React from 'react';

const WelcomeMessage = props => (
  <div>
    <h3
      style={{
        color: '#fff',
        fontSize: '22px',
        textAlign: 'center',
      }}
    >
      {`Dobrodosli ${props.firstName} zeli vam vas`}
    </h3>
    <h3
      style={{
        color: '#fff',
        fontSize: '25px',
        textAlign: 'center',
      }}
    >
      FIT-NET
    </h3>
  </div>
);
export default WelcomeMessage;
