import React from 'react';
import css from '../styles/styles.scss';

class Sertifikat extends React.Component {
  render() {
        return (
          <div className={css.sertifikat}>
              <div className={css.sertifikatBox1}>
              {
                this.props.switchTitle ?
                <p> SERTIFIKOVANI TRENERI </p> :
                <p> SERTIFIKOVANI FIZIJATRI </p>
              }
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
                    onClick={() => this.props.setCertificat(true)}>
                    <div className={`${this.props.certifiedField ? css.radioOff : css.radioOn}`}>
                    </div>
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
                    onClick={() => this.props.setCertificat(false)}>
                    <div className={`${!this.props.certifiedField ? css.radioOff : css.radioOn}`}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default Sertifikat;