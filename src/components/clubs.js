import React from 'react';
import css from './styles/styles.scss';
import SearchBox from './searchBox';
import CoachesImg from './coachesImg';
import { connect } from 'react-redux';
import { history } from 'kit/lib/routing';

@connect(state => ({ clubs: state.clubs }))

class Clubs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesAlert: 'none',
      countiesAlert: 'none',
      categoriesId : null,
      countiesId: null,
    }
  }
  runActionForRedux = () => {
    this.props.dispatch({
      type: 'CLUBS_FILTER',
      skillId: this.state.categoriesId,
      countiesId: this.state.countiesId,
    });
    this.props.history.push('/listOfClubs');
  }
  selectCategories = (categoriesId) => {
    this.setState({
      categoriesId
    });
  }
  selectCounties = (countiesId) => {
    this.setState({
      countiesId
    });
  }
  render() {
    return(
      <div className={css.coaches}>
        <SearchBox
          clubs={true}
          categories={true}
          counties={true}
          searchClubs={true}
          categoriesAlert={this.state.categoriesAlert}
          countiesAlert={this.state.countiesAlert}
          selectCategories={this.selectCategories}
          selectCounties={this.selectCounties}
          runActionForRedux={this.runActionForRedux}
        />
        <CoachesImg />
      </div>
    )
  }
}
export default Clubs;
