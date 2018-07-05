import React from 'react';
import css from '../styles/styles.scss';



class HomePage extends React.Component {
  render() {
    return (
      <div className={css.coaches}>
        <div className={css.searchBoxWrapper}>
          <div className={css.searchBox}>
            <a
              target="_blank" 
              rel="noopener noreferrer" 
              href="http://portal.fit-net.rs"
            >
              <h1 className={css.homepageHead}>
                Za najnovije vesti iz sporta posetite
              </h1>
              <h1 className={css.homepageSub}>
                Fit-Net Portal
              </h1>
              <div className={css.coverPage}>
              </div>
            </a>
          </div>
        </div>
        {/* <CoachesImg /> */ }
      </div>
    );
  }
}
export default HomePage;
