import React from 'react';

const WelcomeMessage = props => (
  <div>
    <h3
      style={{
        color: '#fff',
        fontSize: '22px',
      }}
    >
      {`Dobrodosli ${props.lastName} zeli vam vas`}
    </h3>
    <h3
      style={{
        color: '#fff',
        fontSize: '25px',
      }}
    >
      FIT-NET
    </h3>
  </div>
);
export default WelcomeMessage;
