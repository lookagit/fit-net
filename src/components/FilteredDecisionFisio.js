import React from 'react';
import AfterSearchItemFisio from './AfterSearchItemFisio';
import LogoBright from '../../static/logoBright.png';

const FilteredDecisionCoach = ({ fisoCl }) => (
  <div>
    {
      fisoCl.length ?
        fisoCl.map((item, key) => (
          <AfterSearchItemFisio couchProp={item} key={key} />
        )) :
        <div
          style={{
            width: '60%',
            padding: '20px',
            display: 'flex',
            margin: '0 auto',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px',
            backgroundColor: 'rgba(255,255,255,0.2)',
          }}
        >
          <img
            alt="Logo FIT-NET.RS"
            src={LogoBright}
            width="200"
            height="120"
          />
          <h2
            style={{
              color: 'white',
              textAlign: 'center',
            }}
          >
            ZAO NAM JE TRENUTNO NEMAMO REZULTATE PRETRAGE PO VASEM KRITERIJUMU
          </h2>
        </div>
    }
  </div>
);

export default FilteredDecisionCoach;