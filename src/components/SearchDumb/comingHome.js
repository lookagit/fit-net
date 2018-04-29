import React from 'react';
import css from '../styles/styles.scss';


class GroupTrening extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      console.log('NI SMO PROSP ', this.props);
        return (
            <div  className={css.sertifikat}>
              <div className={css.sertifikatBox1}>
                <p>Dolazi na adresu</p>
              </div>
              <div  className={css.sertifikatBox2}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <label className={css.labelStyle}>DA</label>
                  
                  <div
                    className={css.radio}
                    onClick={() => this.props.comingHomeFunc(true) }
                  >
                    <div className={`${!this.props.comingHomeParams ? css.radioOn : css.radioOff}`}>
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
                    onClick={() => this.props.comingHomeFunc(false)}>
                    <div className={`${this.props.comingHomeParams ? css.radioOn : css.radioOff}`}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
export default GroupTrening;