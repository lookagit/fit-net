import React from 'react';
import css from './styles/styles.scss';
import SearchBox from './searchBox';
import CoachesImg from './coachesImg';

class Coaches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillArr: [],
      certified: false,
      county: 0,
      groupTraining: false,
      priceFrom: 0,
      priceTo: 0,
    }
  }

  addToArr = (skillId) => {
    let {skillArr} = this.state;
    if (this.state.skillArr.includes(skillId)) {
      let a = this.state.wantedSkill;
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

  certifiedFunc = (isCert) => {
    this.setState({
      certified: isCert,
    });
  }

  countyFunc = (countyId) => {
    this.setState({
      countyId,
    })
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

          addToArr={this.addToArr}
          
          countyFunc={this.countyFunc}
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
