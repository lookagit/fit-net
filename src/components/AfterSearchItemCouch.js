import React from "react";
import css from './styles/styles.scss';
import { Link } from 'react-router-dom';
import facebookIco from '../../static/facebook.png';
import instagramIco from '../../static/instagram.png';
class AfterSearchItemCouch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgHover: 'none',
    };
  }
  imgHoverOn() {
    this.setState({
      imgHover: 'block',
    });
  }
  imgHoverOff() {
    this.setState({
      imgHover: 'none',
    });
  }
  render() {
    const { couchProp } = this.props;
    const { trainingPersonSkills } = couchProp;
    const letsSplice = [...trainingPersonSkills].splice(0,3);
    const giveMeSkills = letsSplice.map(item => item.trainSkillName);
    const joinedSkills = giveMeSkills.join(', ');
    return (
      <div className={css.filteredCoaches}>
        <div
          onMouseOver={ () => this.imgHoverOn() }
          onMouseOut={ () => this.imgHoverOff() }
          style={{
            backgroundImage: `url(${couchProp.imageUrl})`,
          }}
          className={css.filteredCoachesImgWrapper}
        >
          <div
            style={{display: `${this.state.imgHover}`}}
            className={css.socialWrapper} >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '50%',
                  height: '100%',
                }}
              >
                <a href={`${couchProp.instagramLink}`} target="_blank">
                  <img
                    alt="instagram link"
                    src={instagramIco}
                    width="50"
                    height="50"
                  />
                </a>
                <a href={`${couchProp.facebookLink}`} target="_blank">
                  <img
                    alt="facebook link"
                    src={facebookIco}
                    width="50"
                    height="50"
                  />
                </a>
              </div>
            </div>
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
            <Link
              to={`/coaches-one/${couchProp.id}`}
            >
              <div className={css.coacheMoreButton}>
                <h3 className={css.coacheButton}>
                  VIŠE
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default AfterSearchItemCouch;
