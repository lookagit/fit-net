import React from 'react';
import css from './styles/styles.scss';
import SearchBox from './searchBox';
import CoachesImg from './coachesImg';
import { connect } from 'react-redux';
import { history } from 'kit/lib/routing';

@connect(state => ({ clubs: state.clubs }))

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
    };
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

  comingHomeFunc = comingHome => this.setState({ comingHome });

  render() {
    console.log('THISA STATE ', this.state);
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
        />
        <CoachesImg />
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
