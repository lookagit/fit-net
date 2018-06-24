import React from 'react';
import Loading from 'react-loading-components';

const LoadingComponent = () => (
    <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loading
          type="puff"
          width={150}
          height={150}
          fill="#f44242"
        />
        <h3
          style={{
            color: '#fff',
          }}
        >
          Molimo sačekajte. Hvala!
        </h3>
      </div>
)
export default LoadingComponent;