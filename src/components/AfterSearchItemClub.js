import React from 'react';
import css from './styles/styles.scss'
export default class AfterSearchItemClub extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      console.log('evo ti props', this.props.clubs)
        return(
            <div
            className={css.searchedItemWraper}
            >
              <div
                style={{
                  backgroundImage: `url(${this.props.clubs.profileImageUrl})`,
                  backgroundPosition: "center",
                }}
                className={css.searchedItemImage}
              />
              <div
                className={css.searchedItemAbout}
              >
                <div
                  className={css.searchedItemAboutInside}
                >
                  <h3 className={css.searchedItemTitle}>
                    Naziv: {`${this.props.clubs.name}`}
                  </h3>
                  <h4 className={css.searchedItemLabels}>
                    Adresa: {`${this.props.clubs.address}`}
                  </h4>
                  <h4 className={css.searchedItemLabels}>
                    Telefon: {`${this.props.clubs.phone}`}
                  </h4>
                  <h4 className={css.searchedItemLabels}>
                    Email: {`${this.props.clubs.email}`}
                  </h4>
                  <h4 className={css.searchedItemRating}>
                    Ocena: {`${this.props.clubs.score}`}
                  </h4>
                </div>
              </div>
              <div
                className={css.searchedItemLast}
              >
                <div
                  className={css.searchedItemVertical}
                >
                <div 
                  className={css.searchedItemSocial}
                  >
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
                    className={css.searchedItemButton}
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