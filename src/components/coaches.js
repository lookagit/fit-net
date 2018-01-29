import React from 'react';
import css from './styles/styles.scss';
import SearchBox from './searchBox';
import CoachesImg from './coachesImg';

class Coaches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillArr: [],
      countiesId: null,
      certified: false,
      counties: 0,
      groupTraining: false,
      priceFrom: 0,
      priceTo: 0,
    }
  }

  addToSkillArr = (skillId) => {
    let {skillArr} = this.state;
    if (skillArr.includes(skillId)) {
      let a = this.state.skillArr;
      let b = a.indexOf(skillId);
      a.splice(b, 1);
      this.setState({
        skillArr: a
      })
    } else {
      this.setState({
        skillArr: [...skillArr, skillId]
      })
    }
  }
  addToCountiesArr = (countiesId) => {
    this.setState({
      countiesId,
    })
  }
  certifiedFunc = (isCert) => {
    this.setState({
      certified: isCert,
    });
  }

  groupTainingFunc = (isGroup) => {
    this.setState({
      groupTraining: isGroup,
    })
  }

  priceFromFunc = (priceFrom) => {
    this.setState({
      priceFrom,
    })
  }

  priceToFunc = (priceTo) => {
    this.setState({
      priceTo,
    })
  }
  render() {

    console.log('state', this.state)
    return(
      <div className={css.coaches}>
        <SearchBox 
          certifiedField={this.state.certified}
          certifiedFunc={this.certifiedFunc}
          addToSkillArr={this.addToSkillArr}
          addToCountiesArr={this.addToCountiesArr}
          groupTraining={this.state.groupTraining}
          groupTrainingFunc={this.groupTainingFunc}
          priceFromFunc={this.priceFromFunc}
          priceToFunc={this.priceToFunc} />
        <CoachesImg />
      </div>
    )
  }
}
export default Coaches;
