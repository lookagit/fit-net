import React from 'react';
import css from '../styles/styles.scss';



class HomePage extends React.Component {
  render() {
    return (
      <div className={css.coaches}>
        <div className={css.searchBoxWrapper}>
          <div className={css.searchBox}>
            <h1>HOMEPAGE</h1>
          </div>
        </div>
        {/* <CoachesImg /> */ }
      </div>
    );
  }
}
export default HomePage;
