import React from 'react';
import { connect } from 'react-redux';
import css from './styles/styles.scss';
import SearchBox from './searchBox';
import CoachesImg from './coachesImg';
import { history } from 'kit/lib/routing';

@connect(state => ({ coaches: state.coaches }))

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
    };
  }
  sendToRedux = () => {
    console.log(this.state);
    this.props.dispatch({
      type: "COACHES_FILTRATION",
      skillArr: this.state.skillArr,
      countyId: this.state.countiesId,
      certified: this.state.certified,
      groupTraining: this.state.groupTraining,
      priceFrom: this.state.priceFrom,
      priceTo: this.state.priceTo,
    });
    history.push('/listofcoaches');
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
      this.setState({
        skillArr: [],
        countiesId: null,
        certified: false,
        groupTraining: false,
        priceFrom: 0,
        priceTo: 0,
        categoriesAlert: 'none',
        countiesAlert: 'none',
      });
      this.sendToRedux();
    }
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
          getParams={this.getParams} />
        <CoachesImg />
      </div>
    );
  }
}
export default Coaches;
