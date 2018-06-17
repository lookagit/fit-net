import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SvgIcon from 'material-ui/SvgIcon';
import { withStyles } from '@material-ui/core/styles';
import logoBright from '../../../static/logoBright.png';

const styles = () => ({
  root: {
    color: '#1472ad !important',
  },
});
@withStyles(styles)
@connect(state => ({ drawer: state.drawer }))
class DrawerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: 'World',
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Drawer
        open={this.props.drawer.drawerOpen}
        style={{
          backgroundColor: '#022f4b',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              alt="FIT NET"
              src={logoBright}
              width="150px"
              height="75px"
            />
          </div>
          <List subheader={<li />}>
            <ListItem
              button
              onClick={() => this.props.dispatch({ type: 'DRAWER_CLOSE' })}
            >
              <ListItemIcon>
                <SvgIcon
                  color="#1474b1"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </SvgIcon>
              </ListItemIcon>
              <Typography
                variant="title"
                className={classes.root}
              >
                Početna
              </Typography>
            </ListItem>
            <ListItem
              button
              onClick={() => this.props.dispatch({ type: 'DRAWER_CLOSE' })}
            >
              <ListItemIcon>
                <SvgIcon
                  color="#1474b1"
                >
                  <path d="M 12 5.9 c 1.16 0 2.1 0.94 2.1 2.1 s -0.94 2.1 -2.1 2.1 s -2.1 -0.94 -2.1 -2.1 s 0.94 -2.1 2.1 -2.1 z M 12 14.9 c 2.97 0 6.1 1.46 6.1 2.1 v 1.1 h -12.2 v -1.1 c 0 -0.64 3.13 -2.1 6.1 -2.1 z M 12 4 c -2.21 0 -4 1.79 -4 4 s 1.79 4 4 4 s 4 -1.79 4 -4 s -1.79 -4 -4 -4 z M 12 13 c -2.67 0 -8 1.34 -8 4 v 3 h 16 v -3 c 0 -2.66 -5.33 -4 -8 -4 z" />
                </SvgIcon>
              </ListItemIcon>
              <Typography
                variant="title"
                className={classes.root}
              >
                Ulogujte se
              </Typography>
            </ListItem>
            <ListItem
              button
              onClick={() => this.props.dispatch({ type: 'DRAWER_CLOSE' })}
            >
              <ListItemIcon>
                <SvgIcon
                  color="#1474b1"
                >
                  <path d="M 11.99 2 c -5.52 0 -9.99 4.48 -9.99 10 s 4.47 10 9.99 10 c 5.53 0 10.01 -4.48 10.01 -10 s -4.48 -10 -10.01 -10 z M 16.23 18 l -4.23 -2.55 l -4.23 2.55 l 1.12 -4.81 l -3.73 -3.23 l 4.92 -0.42 l 1.92 -4.54 l 1.92 4.53 l 4.92 0.42 l -3.73 3.23 l 1.12 4.82 z" />
                </SvgIcon>
              </ListItemIcon>
              <Typography
                variant="title"
                className={classes.root}
              >
                Portal
              </Typography>
            </ListItem>
            
          </List>
        </div>
        
      </Drawer>
    );
  }
}

export default DrawerContainer;
