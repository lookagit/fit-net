import React from 'react';
import css from '../styles/styles.scss';


class GroupTrening extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
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
                    onClick={() => this.props.comingHome(true) }>
                    <div className={`${!this.props.sendParams ? css.radioOn : css.radioOff}`}>
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
                    onClick={() => this.props.comingHome(false)}>
                    <div className={`${this.props.sendParams ? css.radioOn : css.radioOff}`}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
export default GroupTrening;