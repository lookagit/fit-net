import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import css from './styles/styles.scss';
import SearchBox from './searchBox';
import CoachesImg from './coachesImg';

@connect(state => ({ clubs: state.clubs }))

@graphql(
  gql`
  query getCounties(
    $cityId: Int
  ) {
    getCounties(
      cityId: $cityId,
    ) {
      id
      countyName
    }
    getCities{
      id,
      cityName
    }
  }
  `,
  {
    options: props => ({
      variables: {
        cityId: 1,
      },
    }),
  },
)

class Clubs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesAlert: 'none',
      countiesAlert: 'none',
      categoriesId: null,
      countiesId: null,
      arrayCities: [],
      arrayCounties: [],
      visibleCounties: false,
      cityId: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.data.getCities !== 'undefined') {
      this.setState({ arrayCities: nextProps.data.getCities });
    }
    if (typeof nextProps.data.getCounties !== 'undefined') {
      this.setState({ arrayCounties: nextProps.data.getCounties });
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

  selectCategories = categoriesId => {
    this.setState({
      categoriesId,
    });
  }

  selectCity = async e => {
    let id = parseInt(e.target.value); //eslint-disable-line
    await this.props.data.refetch({ cityId: id });
    this.setState({
      visibleCounties: true,
      cityId: id,
      countiesId: '',
    });
  }

  selectCounties = e => {
    this.setState({
      countiesId: e.target.value,
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
          runActionForRedux={this.runActionForRedux} 
          arrayForCity={this.state.arrayCities} //list of city for select city in searchBox
          arrayForCounties={this.state.arrayCounties} //list of counties refetched when select city
          handleCityClick={this.selectCity} //func for select cityId
          handleCounties={this.selectCounties} //func for select couniesId
          valueCity={this.state.cityId} //value for selected city
          valueCounties={this.state.countiesId} //value for selected counties
          visibleCounties={this.state.visibleCounties} //value for visible counties dropdown
        />
        <CoachesImg />
      </div>
    );
  }
}
export default Clubs;
