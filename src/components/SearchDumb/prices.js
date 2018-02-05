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
              <label style={{color: '#fff', fontSize: '17px', fontWeight: '700',}}>CENA</label>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <input
                  style={{    
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    padding: '10px 14px',
                    width: '48.5%',
                  }}
                  placeholder="OD" 
                  value={this.props.getPriceFrom != 0 ? this.props.getPriceFrom : 'OD'}
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
                  placeholder="DO" 
                  value={this.props.getPriceTo != 0  ? this.props.getPriceTo : 'DO'}
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