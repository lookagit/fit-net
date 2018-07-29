import React from 'react';
import css from '../styles/styles.scss';
import TimeInput from 'material-ui-time-picker';
import RaisedButton from 'material-ui/RaisedButton';
import Loading from 'react-loading-components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

@graphql(gql`
  mutation createWorkingTimeClub(
    $workDayFrom: String,
    $workDayTo: String,
    $satFrom: String,
    $satTo: String,
    $sunFrom: String,
    $sunTo: String,
    $clubClId: Int
  ) {
    createWorkingTimeClub(
      workDayFrom: $workDayFrom,
      workDayTo: $workDayTo,
      satFrom: $satFrom,
      satTo: $satTo,
      sunFrom: $sunFrom,
      sunTo: $sunTo,
      clubClId: $clubClId
    ) {
      id
    }
  }`, {
  name: 'workingTimeClub',
})
class WorkTimeClubs extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          loading: false,
          fromMonFri: new Date("Sat Jul 14 2018 00:00:51 GMT+0200 (Central European Summer Time)"),
          toMonFri: new Date("Sat Jul 14 2018 00:00:51 GMT+0200 (Central European Summer Time)"),
          fromSat: new Date("Sat Jul 14 2018 00:00:51 GMT+0200 (Central European Summer Time)"),
          toSat: new Date("Sat Jul 14 2018 00:00:51 GMT+0200 (Central European Summer Time)"),
          fromSan: new Date("Sat Jul 14 2018 00:00:51 GMT+0200 (Central European Summer Time)"),
          toSan: new Date("Sat Jul 14 2018 00:00:51 GMT+0200 (Central European Summer Time)")
      }
  }
  sendToServer = async () => {
    this.setState({
      loading: true,
    })
    const { clubId } = this.props.match.params;
    const mutation = await this.props.workingTimeClub(
        {
          variables: {
            workDayFrom: this.state.fromMonFri.toString().slice(16, 21),
            workDayTo: this.state.toMonFri.toString().slice(16, 21),
            satFrom: this.state.fromSat.toString().slice(16, 21),
            satTo: this.state.toSat.toString().slice(16, 21),
            sunFrom: this.state.fromSan.toString().slice(16, 21),
            sunTo: this.state.toSan.toString().slice(16, 21),
            clubClId: parseInt(clubId),
          },
        },
      );
    if (mutation) {
      this.props.history.push(`/club-create-membership/${clubId}`);
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loading
            type="puff"
            width={150}
            height={150}
            fill="#f44242"
          />
          <h3
            style={{
              color: '#fff',
            }}
          >
            Molimo sačekajte. Hvala!
          </h3>
        </div>
      );
    }
    return (
        <div className={css.registerFisioWrapper}>
          <div className={css.registerFisio}>
            <div className={css.registerFisioOne} style={{ justifyContent: 'center', marginBottom: '20px' }}>
                <h3
                  style={{color: 'white', textAlign: 'center'}}
                >
                  Ovde unesite radno vreme kluba.
                </h3>
            </div>
            <div className={css.registerFisioOne}>
              <div className={css.inputWrapperForm}>
                <label className={css.labelsRegister}>Ponedeljak-Petak od:</label>
                <TimeInput
                  mode='24h'
                  floatingLabelText="Ponedeljak-petak od"
                  className={css.brightFont}
                  floatingLabelStyle={{ color: "#fff" }}
                  textFieldStyle={{ width: '100%' }}
                  onChange={(time) => {
                      this.setState({
                          fromMonFri: time,
                      })
                  }}
                  value={this.state.fromMonFri}
                />
              </div>
              <div className={css.inputWrapperForm}>
                <label className={css.labelsRegister}>Ponedeljak-Petak do:</label>
                <TimeInput
                  mode='24h'
                  floatingLabelText="Ponedeljak-petak od"
                  className={css.brightFont}
                  floatingLabelStyle={{ color: "#fff" }}
                  textFieldStyle={{ width: '100%' }}
                  onChange={(time) => {
                    this.setState({
                        toMonFri: time,
                    })
                }}
                  value={this.state.toMonFri}
                />
              </div>
            </div>
            <div className={css.registerFisioOne}>
              <div className={css.inputWrapperForm}>
                <label className={css.labelsRegister}>Subota od:  Subota od: </label>
                <TimeInput
                  mode='24h'
                  floatingLabelText="Ponedeljak-petak od"
                  className={css.brightFont}
                  floatingLabelStyle={{ color: "#fff" }}
                  textFieldStyle={{ width: '100%' }}
                  onChange={(time) => {
                    this.setState({
                        fromSat: time,
                    })
                }}
                  value={this.state.fromSat}
                />
              </div>
              <div className={css.inputWrapperForm}>
                <label className={css.labelsRegister}>Subota do:</label>
                <TimeInput
                  mode='24h'
                  floatingLabelText="Ponedeljak-petak od"
                  className={css.brightFont}
                  floatingLabelStyle={{ color: "#fff" }}
                  textFieldStyle={{ width: '100%' }}
                  onChange={(time) => {
                    this.setState({
                        toSat: time,
                    })
                }}
                  value={this.state.toSat} 
                />
              </div>
            </div>
            <div className={css.registerFisioOne}>
              <div className={css.inputWrapperForm}>
                <label className={css.labelsRegister}>Nedelja od:</label>
                <TimeInput
                  mode='24h'
                  floatingLabelText="Ponedeljak-petak od"
                  className={css.brightFont}
                  floatingLabelStyle={{ color: "#fff" }}
                  textFieldStyle={{ width: '100%' }}
                  onChange={(time) => {
                    this.setState({
                        fromSan: time,
                    })
                }}
                  value={this.state.fromSan}
                />
              </div>
              <div className={css.inputWrapperForm}>
                <label className={css.labelsRegister}>Nedelja do:</label>
                <TimeInput
                  mode='24h'
                  floatingLabelText="Ponedeljak-petak od"
                  className={css.brightFont}
                  floatingLabelStyle={{ color: "#fff" }}
                  textFieldStyle={{ width: '100%' }}
                  onChange={(time) => {
                    this.setState({
                        toSan: time,
                    })
                }}
                  value={this.state.toSan} 
                />
              </div>
            </div>
            <div className={css.registerFisioOne} style={{ justifyContent: 'center', marginBottom: '20px' }}>
              <RaisedButton
                label="Snimite"
                fullWidth
                labelColor="#fff"
                labelStyle={{ fontWeight: '700' }}
                backgroundColor="#1da9ec"
                onClick={() => {
                  this.sendToServer();
                }} />
            </div>
          </div>
        </div>
    );
  }
}
export default WorkTimeClubs;
