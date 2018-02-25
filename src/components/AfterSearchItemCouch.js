import React from "react";
import css from './styles/styles.scss';
import { Link } from 'react-router-dom';

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
    console.log("JA SAM COUCH ",couchProp);
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
        style={{
          display: `${this.state.imgHover}`,
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: '0',
          background: 'rgba(0, 0, 0, .5)'
        }}>
        OVO JE HOVER
      </div>
      </div>
      <div
        style={{
          flex: 2.3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "300px",
          alignItems: "flex-start",
          paddingLeft: "10px"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "250px",
            alignItems: "flex-start",
            paddingLeft: "10px"
          }}
        >
        <h3 style={{ fontSize: "40px", color: "#2a87e9", fontWeight: "700" }}>
          {`${couchProp.firstName} ${couchProp.lastName}`}
        </h3>
        <h4 style={{ fontSize: "25px", color: "#fff", fontWeight: "700" }}>
          {`${couchProp.birthPlace}`}
        </h4>
          <h4 style={{ fontSize: "25px", color: "#fff", fontWeight: "700" }}>
            {`${couchProp.birthDay}`}
          </h4>
          <h4 style={{ fontSize: "25px", color: "#fff", fontWeight: "700" }}>
            {`Fitness klub Agoga`}
          </h4>
          <h4 style={{ fontSize: "18px", color: "#fff", fontWeight: "700" }}>
            {`Tagovi: ${joinedSkills}`}
          </h4>
        </div>
      </div>
      <div
        style={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          height: "300px"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            height: "250px"
          }}
        >
          <h5 style={{ fontSize: "22px", color: "#fff", fontWeight: "700" }}>
            {`${couchProp.about}`}
          </h5>
          <Link
            to={`/coaches-one/${couchProp.id}`}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgb(42, 135, 233)",
                width: "135px",
                borderRadius: "10px",
                padding: "13px"
              }}
            >
              <h3 style={{ fontSize: "18px", color: "#fff", fontWeight: "700" }}>
                VIŠE
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
}
export default AfterSearchItemCouch;