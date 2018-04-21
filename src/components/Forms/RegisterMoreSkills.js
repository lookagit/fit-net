import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RegisterInput from './RegisterInput';
import css from '../styles/styles.scss';
import SearchBox from '../searchBox';

@withRouter
@connect(state => ({
  fizio: state.fizio,
  coaches: state.coaches,
}))
class RegisterMoreSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillArr: [],
      countiesAlert: 'none',
      opstinaId: '',
      groupTraining: false,
      items: []
    };
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
        skillArr: [...skillArr, parseInt(skillId)], //eslint-disable-line
      });
    }
  }

  addToCountiesArr = countiesId => {
    this.setState({
      opstinaId: countiesId,
    });
  }

  groupTainingFunc = isGroup => {
    this.setState({
      groupTraining: isGroup,
    });
  }

  render() {
    return (
      <div>
        <OneItem
          handleSkillArr={this.addToSkillArr}
          handleCounties={this.addToCountiesArr}
          handleTraning={this.groupTainingFunc}
          groupTraining={this.state.groupTraining}
        />
      </div>
    );
  }
}

const OneItem = ({ handleSkillArr, handleCounties, handleTraning, groupTraining }) => (
  <div className={css.registerFisioWrapper}>
    <div className={css.registerFisio}>
      <SearchBox
        categories
        coaches
        addToSkillArr={handleSkillArr}
      />
      <SearchBox
        counties
        coaches
        group
        countiesAlert={'none'}
        addToCountiesArr={handleCounties}
        groupTraining={groupTraining}
        groupTrainingFunc={handleTraning}
      />
      <div className={css.registerFisioOne}>
        <RegisterInput
          styles={{ width: '100%' }}
          placeHolder="Cena"
          type="text"
          updateFunc={e => {
            console.log('blabla', e);
          }}
        />
      </div>
    </div>
  </div>
);
export default RegisterMoreSkills;
