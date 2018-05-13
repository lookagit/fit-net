import React from 'react';
import { Link } from 'react-router-dom';
import css from './styles/styles.scss';

class ChooseProfileMake extends React.Component {
  render() {
    return (
      <div 
        style={{
          width: '100%',
          height: '70%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div 
          style={{
            width: '80%',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div 
            style={{
              width: '26%', 
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              background: 'rgba(55, 72, 102, 0.7)',
              borderRadius: '10px'
            }}
          >
            <h3 style={{color: '#fff'}}>Napravite profil za trenera</h3>
            <Link
              to={`/register`}
            >
              <div className={css.coacheMoreButton}>
                <h3 className={css.coacheButton}>
                  DALJE
                </h3>
              </div>
            </Link>
          </div>
          <div 
            style={{
              width: '26%', 
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              background: 'rgba(55, 72, 102, 0.7)',
              borderRadius: '10px'
            }}
          >
            <h3 style={{color: '#fff'}}>Napravite profil za fizio</h3>
            <Link
              to={`/registerFisio`}
            >
              <div className={css.coacheMoreButton}>
                <h3 className={css.coacheButton}>
                  DALJE
                </h3>
              </div>
            </Link>
          </div>
          <div 
            style={{
              width: '26%', 
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              background: 'rgba(55, 72, 102, 0.7)',
              borderRadius: '10px'
            }}
          >
            <h3 style={{color: '#fff'}}>Napravite profil za klub</h3>
            <Link
              to={`/registerFisio`}
            >
              <div className={css.coacheMoreButton}>
                <h3 className={css.coacheButton}>
                  DALJE
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default ChooseProfileMake;