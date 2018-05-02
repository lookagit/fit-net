import React from 'react';
import css from '../styles/styles.scss';


const GroupTrening = props => (
  <div className={css.sertifikat}>
    <div className={css.sertifikatBox1}>
      <p>Dolazi na adresu</p>
    </div>
    <div className={css.sertifikatBox2}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <label className={css.labelStyle}>DA</label>
        
        <div
          className={css.radio}
          onClick={() => props.comingHomeFunc(true) }
        >
          <div className={`${!props.comingHomeParams ? css.radioOn : css.radioOff}`} />
        </div>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <label className={css.labelStyle}>NE</label>
        <div
          className={css.radio}
          onClick={() => props.comingHomeFunc(false)}>
          <div className={`${props.comingHomeParams ? css.radioOn : css.radioOff}`} />
        </div>
      </div>
    </div>
  </div>
);
export default GroupTrening;
