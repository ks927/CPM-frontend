/* Dialog box that pops up after timer ends */

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class NameDialog extends Component {
  state = {
    username: '',
  };

  handleChange = (username) => (event) => {
    console.log('event', event.target);
    this.setState({ [username]: event.target.value });
  };

  render() {
    const { open, clicks, postScore, reset } = this.props;
    return (
      <div>
        <Dialog open={open}>
          <DialogTitle>Score</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Nice try, you clicked {clicks.clickCount} times!
              <br />
              But that&apos;s no match for Brain
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              Enter your username:
              <TextField
                id="username"
                // label="Name"
                value={this.state.value}
                onChange={this.handleChange('username')}
                margin="normal"
              />
            </DialogContentText>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                postScore({
                  username: this.state.username,
                  score: clicks.clickCount,
                });
                reset();
              }}
            >
              Post Score
            </Button>
          </DialogContent>
          <DialogActions />
        </Dialog>
      </div>
    );
  }
}

export default NameDialog;
