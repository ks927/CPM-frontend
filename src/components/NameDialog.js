/* Dialog box that pops up after timer ends */

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { fetchLeaders } from '../actions';

const NameDialog = ({ open, clicks, postScore, reset }) => {
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
          </DialogContentText>
          <Button
            onClick={() => {
              postScore({ username: 'john', score: clicks.clickCount });
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
};

export default NameDialog;
