import React from 'react';
import css from '../styles/styles.scss';


class Prices extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <div style={{ display: 'flex', flexDirection: 'column',}}>
            <div style={{paddingBottom: '10px'}}>
              <label className={css.priceLabel}>CENA</label>
            </div>
            <div className={css.pricesInputHolder}>
              <div className={css.priceContainer}>
                <input
                  style={{    
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    padding: '10px 14px',
                    width: '48.5%',
                  }}
                  placeholder="OD (RSD)" 
                  value={this.props.getPriceFrom != 0 ? this.props.getPriceFrom : 'OD (RSD)'}
                  type="number" 
                  onChange={(val) => this.props.priceFromFunc(val.target.value)} />
                <input
                  style={{    
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    padding: '10px 14px',
                    width: '48.5%',
                  }}
                  placeholder="DO (RSD)" 
                  value={this.props.getPriceTo != 0  ? this.props.getPriceTo : 'DO (RSD)'}
                  type="number"
                  onChange={(val) => this.props.priceToFunc(val.target.value)} />
              </div>
              <div 
                className={css.sendParams}
                onClick={() => this.props.sendParams()}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',}}>
                  <h3 style={{
                    color: '#fff',
                    fontWeight: 'bold',
                  }}>TRAŽI</h3> 
                </div>
              </div>
            </div>
          </div> 
        );
    }
}

export default Prices;