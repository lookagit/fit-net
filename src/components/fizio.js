import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import css from './styles/styles.scss';
import SearchBox from './searchBox';
import CoachesImg from './coachesImg';
import { connect } from 'react-redux';
import { history } from 'kit/lib/routing';

@connect(state => ({ clubs: state.clubs }))

@graphql(
  gql`
  query getCounties {
    getCounties {
      id
      countyName
    }
    getCities{
      id,
      cityName
    }
  }
  `,
)

class Fizio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesAlert: 'none',
      countiesAlert: 'none',
      skillArr: [],
      countiesId: null,
      certified: false,
      comesHome: false,
      priceFrom: 0,
      priceTo: 0,
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
  
  sendToRedux = () => {
    this.props.dispatch({
      type: "FIZIO_FILTRATION",
      skillArr: this.state.skillArr,
      countiesId: this.state.countiesId,
      certified: this.state.certified,
      comesHome: this.state.comingHome,
      priceFrom: this.state.priceFrom,
      priceTo: this.state.priceTo,
    });
    history.push('/listoffizio');
  }
  getParams = () => {
    this.setState({
      skillArr: [],
      countiesId: null,
      certified: false,
      comingHome: false,
      priceFrom: 0,
      priceTo: 0,
      categoriesAlert: 'none',
      countiesAlert: 'none',
    });
    this.sendToRedux();
  }

  fizioCounties = countiesId => {
    this.setState({
      countiesId,
    });
  }

  fizioCategories = skillId => {
    const { skillArr } = this.state;
    if (skillArr.includes(skillId)) {
      let a = this.state.skillArr;
      let b = a.indexOf(skillId);
      a.splice(b, 1);
      this.setState({
        skillArr: a
      });
    } else {
      this.setState({
        skillArr: [...skillArr, skillId]
      });
    }
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

  comesHome = comesHome => {
    this.setState({
      comesHome,
    });
  }

  certifiedFunc = certified => {
    this.setState({
      certified,
    });
  }

  selectCity = async e => {
    let id = parseInt(e.target.value); //eslint-disable-line
    await this.props.data.refetch();
    this.setState({
      visibleCounties: true,
      countiesId: '',
    });
  }

  selectCounties = e => {
    this.setState({
      countiesId: e.target.value,
    });
  }

  comingHomeFunc = comingHome => this.setState({ comingHome });

  render() {
    return (
      <div className={css.coaches}>
        <SearchBox
          fizio
          categories
          counties
          sertifikat
          prices
          categoriesAlert={this.state.categoriesAlert}
          countiesAlert={this.state.countiesAlert}
          fizioCounties={this.fizioCounties}
          fizioCategories={this.fizioCategories}
          priceFromFunc={this.priceFromFunc}
          getPriceFrom={this.state.priceFrom}
          priceToFunc={this.priceToFunc}
          getPriceTo={this.state.priceTo}
          getParams={this.getParams}
          comingHomeFunc={this.comingHomeFunc}
          comingHomeParams={this.state.comingHome}
          certifiedField={this.state.certified}
          certifiedFunc={this.certifiedFunc}
          arrayForCounties={this.state.arrayCounties} //list of counties refetched when select city
          handleCounties={this.selectCounties} //func for select couniesId
          valueCounties={this.state.countiesId} //value for selected counties
          visibleCounties={this.state.visibleCounties} //value for visible counties dropdown
        />
        {/* <CoachesImg /> */}
      </div>
    );
  }
}
export default Fizio;
// 
// categoriesAlert={this.state.categoriesAlert}
// countiesAlert={this.state.countiesAlert}
// certifiedField={this.state.certified}
// certifiedFunc={this.certifiedFunc}
// addToSkillArr={this.addToSkillArr}
// addToCountiesArr={this.addToCountiesArr}

// comingHome={this.state.comingHome}
// comingHomeFunc={this.comingHomeFunc}

// priceFromFunc={this.priceFromFunc}
// getPriceFrom={this.state.priceFrom}
// priceToFunc={this.priceToFunc}
// getPriceTo={this.state.priceTo}
// getParams={this.getParams} />
