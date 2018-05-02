import React from 'react';
import Loading from 'react-loading-components';
import RegisterMoreSkillsPerson from './RegisterMoreSkillsPerson';

class RegisterMoreSkillsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  render() {
    return (
      <div>
        {
          this.state.loading ?
            <Loading
              type="puff"
              width={150}
              height={150}
              fill="#f44242"
            /> :
            <RegisterMoreSkillsPerson changeToLoad={() => this.setState({ loading: true })} />
        }
      </div>
    );
  }
}

export default RegisterMoreSkillsContainer;
