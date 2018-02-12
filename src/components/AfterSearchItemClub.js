import React from 'react';

export default class AfterSearchItemClub extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      console.log('evo ti props', this.props.clubs)
        return(
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: '20px',
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${this.props.clubs.profileImageUrl})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  width: "27%",
                  height: "100%",
                  borderRadius: "5px"
                }}
              />
              <div
                style={{
                  width: '33%',
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
                    Naziv: {`${this.props.clubs.name}`}
                  </h3>
                  <h4 style={{ fontSize: "25px", color: "#fff", fontWeight: "700" }}>
                    Adresa: {`${this.props.clubs.address}`}
                  </h4>
                  <h4 style={{ fontSize: "25px", color: "#fff", fontWeight: "700" }}>
                    Telefon: {`${this.props.clubs.phone}`}
                  </h4>
                  <h4 style={{ fontSize: "25px", color: "#fff", fontWeight: "700" }}>
                    Email: {`${this.props.clubs.email}`}
                  </h4>
                  <h4 style={{ fontSize: "18px", color: "#fff", fontWeight: "700" }}>
                    Ocena: {`${this.props.clubs.score}`}
                  </h4>
                </div>
              </div>
              <div
                style={{
                  width: '33%',
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
                <div 
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}>
                  <h5 style={{ width: '100%', fontSize: 18, color: 'white', textAlign: 'center'}}>Drustvene mreze:</h5>
                  <a href={this.props.clubs.facebookLink} >
                    <img style={{
                      height: "30px",
                      width: "30px",
                    }}
                    src={'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/2000px-F_icon.svg.png'} 
                    />
                  </a>
                  <a href={this.props.clubs.instagramLink} >
                    <img style={{
                      height: "30px",
                      width: "30px",
                    }}
                    src={'https://instagram-brand.com/wp-content/uploads/2016/11/app-icon2.png'} 
                    />
                  </a>
                </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgb(42, 135, 233)",
                      width: "100%",
                      borderRadius: "10px",
                      padding: "13px"
                    }}
                  >
                    <h3 style={{ fontSize: "18px", color: "#fff", fontWeight: "700" }}>
                      VIŠE
                    </h3>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}