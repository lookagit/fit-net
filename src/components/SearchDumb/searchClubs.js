import React from 'react';
import css from '../styles/styles.scss';

class SearchClubs extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',paddingTop: '20px'}}>
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
        );
    }
}

export default SearchClubs;