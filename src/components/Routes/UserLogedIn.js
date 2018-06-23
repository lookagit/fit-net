import React from 'react';

class UserLogedIn extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("JA SAM PROPS", this.props);
    }
    render() {
        return (
            <div>
                <h1>CAO CAO</h1>
            </div>
        )
    }
}

export default UserLogedIn;