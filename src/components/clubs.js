import React from 'react';
import { connect } from 'react-redux';
import css from './styles/styles.scss';
import SearchBox from './searchBox';
import CoachesImg from './coachesImg';

@connect(state => ({ clubs: state.clubs }))

class Clubs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesAlert: 'none',
      countiesAlert: 'none',
      categoriesId: null,
      countiesId: null,
    };
  }
  runActionForRedux = () => {
    this.props.dispatch({
      type: 'CLUBS_FILTER',
      skillId: this.state.categoriesId,
      countiesId: this.state.countiesId,
    });
    this.props.history.push('/listOfClubs');
  }
  selectCategories = categoriesId => {
    this.setState({
      categoriesId,
    });
  }
  selectCounties = countiesId => {
    this.setState({
      countiesId,
    });
  }
  render() {
    return (
      <div className={css.coaches}>
        <SearchBox
          clubs
          categories
          counties
          searchClubs
          categoriesAlert={this.state.categoriesAlert}
          countiesAlert={this.state.countiesAlert}
          selectCategories={this.selectCategories}
          selectCounties={this.selectCounties}
          runActionForRedux={this.runActionForRedux} />
        <CoachesImg />
      </div>
    );
  }
}
export default Clubs;
