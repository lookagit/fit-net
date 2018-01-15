import React from 'react';
import css from './styles/styles.scss';
import SearchBox from './searchBox';
import CoachesImg from './coachesImg';

class Coaches extends React.Component {
  render() {
    return(
      <div className={css.coaches}>
        <SearchBox />
        <CoachesImg />
      </div>
    )
  }
}
export default Coaches;
