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
                <p>TRENERI</p>
              </div>
              <div  className={css.sertifikatBox2}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <label className={css.labelStyle}>GRUPNI</label>
                  
                  <div
                    className={css.radio}
                    onClick={() => this.props.setTrening(true) }>
                    <div className={`${!this.props.groupTraining ? css.radioOn : css.radioOff}`}>
                    </div>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <label className={css.labelStyle}>PERSONALNI</label>
                  <div
                    className={css.radio}
                    onClick={() => this.props.setTrening(false)}>
                    <div className={`${this.props.groupTraining ? css.radioOn : css.radioOff}`}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
export default GroupTrening;