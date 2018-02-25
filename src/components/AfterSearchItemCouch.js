import React from "react";
import css from './styles/styles.scss';

class AfterSearchItemCouch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      imgHover: 'none'
    }
  }
  imgHoverOn(){
    this.setState({
      imgHover: 'block',
    })
  }
  imgHoverOff(){
    this.setState({
      imgHover: 'none',
    })
  }
  render(){
    let couchProp = this.props.couchProp
    let {trainingPersonSkills} = couchProp;
    let letsSplice = [...trainingPersonSkills].splice(0,3);
    let giveMeSkills = letsSplice.map(item => item.trainSkillName);
    let joinedSkills = giveMeSkills.join(', ');
  return (
    <div className={css.filteredCoaches}>
      <div
        onMouseOver={()=>this.imgHoverOn()}
        onMouseOut={()=>this.imgHoverOff()}
        style={{backgroundImage: `url(${couchProp.imageUrl})`}}
        className={css.filteredCoachesImgWrapper}
      >
        <div 
        style={{display: `${this.state.imgHover}`}}
        className={css.socialWrapper}>
        OVO JE HOVER
      </div>
      </div>
      <div className={css.infoProfileWrapper}>
        <div className={css.infoProfileHolder}>
        <h3 className={css.coacheName}>
          {`${couchProp.firstName} ${couchProp.lastName}`}
        </h3>
        <h4 className={css.coacheBirthPlace}>
          {`${couchProp.birthPlace}`}
        </h4>
          <h4 className={css.coacheBday}>
            {`${couchProp.birthDay}`}
          </h4>
          <h4 className={css.coacheClub}>
            {`Fitness klub Agoga`}
          </h4>
          <h4 className={css.coacheTags}>
            {`Tagovi: ${joinedSkills}`}
          </h4>
        </div>
      </div>
      <div className={css.profileAboutWrapper}>
        <div className={css.profileAboutHolder}>
          <h5 className={css.coacheAbout}>
            {`${couchProp.about}`}
          </h5>
          <div className={css.coacheMoreButton}>
            <h3 className={css.coacheButton}>
              VIŠE
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}
}
export default AfterSearchItemCouch;