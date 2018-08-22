import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

import * as actions from '../actions';

const styles = {
  root: {
    flexGrow: 1,
    margin: '2em',
  },
  leaderboard: {
    width: 300,
    padding: 10,
  },
  game: {
    width: '100%',
    margin: 'auto',
  },
  instructions: {
    width: 500,
    padding: 15,
    // height: 300,
    float: 'left',
  },
  card: {
    minWidth: 275,
  },
  countdown: {
    color: 'red',
  },
  timer: {
    color: 'gray',
  },
  title: {
    color: 'red',
    marginBottom: 16,
    fontSize: 24,
  },
  buttons: {
    marginTop: 25,
  },
  message: {
    marginTop: 10,
    fontSize: '1.5em',
    color: '#2646f5',
  },
  leaderItem: {
    textAlign: 'left',
  },
};

class Home extends Component {
  state = {
    clickDisabled: true,
  };

  componentDidMount() {
    // get leaderboard from '/api/leaderboard'
    this.props.fetchLeaders();
  }

  clickPress() {
    this.props.addClick();
  }

  reset() {
    clearInterval(this.myInterval);
    this.setState({ clickDisabled: true });

    this.props.reset();
  }

  timer() {
    this.setState({ clickDisabled: false });
    this.myInterval = setInterval(() => {
      this.props.timerTick();
    }, 1000);
  }

  renderScore() {
    clearInterval(this.myInterval);
    return (
      <div className={this.props.classes.message}>
        Nice try, you clicked {this.props.clicks.clickCount} times!
        <br />
        <p>But that&apos;s no match for Brain</p>
      </div>
    );
  }

  handleChange = (event) => {
    this.props.setTime(event.target.value);
  };

  renderLeaders(leaders) {
    return (
      <ol>
        {leaders.map((leader) => {
          return (
            <li key={leader.id} className={this.props.classes.leaderItem}>
              <span>
                Username: <strong>{leader.username}</strong>
              </span>
              <span style={{ paddingLeft: 5 }}>
                Score: <strong>{leader.score}</strong>
              </span>
            </li>
          );
        })}
      </ol>
    );
  }

  render() {
    const { classes, clicks } = this.props;
    const { clickCount, timer, leaders } = clicks;
    const { clickDisabled } = this.state;
    console.log(this.props, leaders);

    return (
      <div>
        <Grid
          container
          className={classes.root}
          alignItems="flex-start"
          justify="center"
        >
          {/* instructions card */}
          <Grid item lg={6}>
            <Card className={classes.instructions}>
              <Typography className={classes.title} color="textSecondary">
                Welcome to 'Brian Sichta's Clicks per Minute' game
              </Typography>
              <Typography variant="subheading" component="h2">
                Choose how long you would like to play then press 'START TIMER'
                to begin the timer. Press the 'CLICK!!!' button as many times as
                you can.
              </Typography>
              <Typography variant="subheading" component="h2">
                How long would you like to click for? Values are in seconds.
              </Typography>
              <Select value={timer || ''} onChange={this.handleChange}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={60}>60</MenuItem>
              </Select>
              <Typography variant="headline" component="h2">
                How fast is your clicking finger?
              </Typography>
              <div className={classes.buttons}>
                <Button
                  style={{ marginRight: '10px' }}
                  variant="contained"
                  disabled={timer === 0}
                  color="primary"
                  onClick={() => this.timer()}
                >
                  Start timer
                </Button>
                <Button
                  variant="contained"
                  disabled={timer === 0 || clickDisabled}
                  color="secondary"
                  onClick={() => this.clickPress()}
                >
                  Click!!!
                </Button>
              </div>
            </Card>
          </Grid>

          {/* reset card */}
          <Grid item lg={6}>
            <Card className={classes.leaderboard}>
              <h1>LEADERBOARD</h1>
              {leaders && this.renderLeaders(leaders)}
              {/* <ol>
                <li>
                  <span>
                    Username: <strong>Brain</strong>
                  </span>
                  <span style={{ paddingLeft: 5 }}>
                    Score: <strong>?????</strong>
                  </span>
                </li>
              </ol> */}
            </Card>
          </Grid>
          <Grid item lg={12}>
            <div className={classes.game}>
              <h1>Clicks: {clickCount}</h1>
              <h2 className={classes.timer}>
                Time:{' '}
                <span className={timer <= 10 && classes.countdown}>
                  {timer}
                </span>
              </h2>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.reset()}
              >
                reset
              </Button>
              {clicks.timer === 0 && this.renderScore()}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ clicks }) {
  return {
    clicks,
  };
}

export default compose(
  connect(
    mapStateToProps,
    actions,
  ),
  withStyles(styles),
)(Home);
