import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import LogoBright from '../../static/logoBright.png';

// @graphql(gql`
//   query oneFisioCl($fisioClId: Int) {
//     oneFisioCl(fisioClId: $fisioClId) {
//       firstName
//       lastName
//       email
//       facebookLink
//       instagramLink
//       imageUrl
//       cellPhone
//       about
//       birthDay
//       birthPlace
//       hasCerificates
//       score
//       comesHome
//       fisioSkillsArr
//       allCertificates {
//         certUrl
//       }
//       fisioCounties {
//         id
//         price
//         address
//         fisioCounty {
//           id
//           countyName
//         }
//       }
//       fisioSkillsNames {
//         id
//         fisioSkillName
//       }
//     }
//   }`, {
//   options: props => ({
//     variables: {
//       fisioClId: props.match.params.id,
//     },
//   }),
// })
class IfNoResultsFisio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div
          style={{
            width: '60%',
            padding: '20px',
            display: 'flex',
            margin: '0 auto',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px',
            backgroundColor: 'rgba(255,255,255,0.2)',
          }}
        >
          <img
            alt="Logo FIT-NET.RS"
            src={LogoBright}
            width="200"
            height="120"
          />
          <h2
            style={{
              color: 'white',
              textAlign: 'center',
            }}
          >
            ZAO NAM JE TRENUTNO NEMAMO REZULTATE PRETRAGE PO VASEM KRITERIJUMU
          </h2>
        </div>
      </div>
    );
  }
}
export default IfNoResultsFisio;
