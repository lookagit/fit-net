import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import css from './styles/styles.scss';
import SearchBox from './searchBox';
import CoachesImg from './coachesImg';
import { history } from 'kit/lib/routing';

@connect(state => ({ coaches: state.coaches }))

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

class Coaches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillArr: [],
      countiesId: null,
      certified: false,
      groupTraining: false,
      priceFrom: 0,
      priceTo: 0,
      categoriesAlert: 'none',
      countiesAlert: 'none',
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

  addToSkillArr = skillId => {
    const { skillArr } = this.state;
    if (skillArr.includes(skillId)) {
      const a = this.state.skillArr;
      const b = a.indexOf(skillId);
      a.splice(b, 1);
      this.setState({
        skillArr: a,
      });
    } else {
      this.setState({
        skillArr: [...skillArr, skillId],
      });
    }
  }
  addToCountiesArr = countiesId => {
    this.setState({
      countiesId,
    });
  }
  certifiedFunc = isCert => {
    this.setState({
      certified: isCert,
    });
  }

  groupTainingFunc = isGroup => {
    this.setState({
      groupTraining: isGroup,
    });
  }

  priceFromFunc = priceFrom => {
    this.setState({
      priceFrom,
    });
  }

  priceToFunc = priceTo => {
    this.setState({
      priceTo,
    });
  }
  // SUBMIT AND CHECKING SEARCH
  getParams = () => {
    if (this.state.skillArr.length < 1) {
      this.setState({
        categoriesAlert: 'block',
      });
      if (this.state.countiesId == null) {
        this.setState({
          countiesAlert: 'block',
        });
      }
    } else {
      this.sendToRedux();
    }
  }

  sendToRedux = () => {
    this.props.dispatch({
      type: "COACHES_FILTRATION",
      skillArr: this.state.skillArr,
      countyId: this.state.countiesId,
      certified: this.state.certified,
      groupTraining: this.state.groupTraining,
      priceFrom: this.state.priceFrom,
      priceTo: this.state.priceTo,
    });
    setTimeout(() => history.push('/listofcoaches'), 500);
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
          coaches
          categories
          sertifikat
          counties
          group
          prices
          categoriesAlert={this.state.categoriesAlert}
          countiesAlert={this.state.countiesAlert}
          certifiedField={this.state.certified}
          certifiedFunc={this.certifiedFunc}
          addToSkillArr={this.addToSkillArr}
          addToCountiesArr={this.addToCountiesArr}
          groupTraining={this.state.groupTraining}
          groupTrainingFunc={this.groupTainingFunc}
          priceFromFunc={this.priceFromFunc}
          getPriceFrom={this.state.priceFrom}
          priceToFunc={this.priceToFunc}
          getPriceTo={this.state.priceTo}
          getParams={this.getParams}
          arrayForCity={this.state.arrayCities} //list of city for select city in searchBox
          arrayForCounties={this.state.arrayCounties} //list of counties refetched when select city
          handleCityClick={this.selectCity} //func for select cityId
          handleCounties={this.selectCounties} //func for select couniesId
          valueCity={this.state.cityId} //value for selected city
          valueCounties={this.state.countiesId} //value for selected counties
          visibleCounties={this.state.visibleCounties} //value for visible counties dropdown
        />
        {/* <CoachesImg /> */ }
      </div>
    );
  }
}
export default Coaches;
