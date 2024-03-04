import React, { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const UpdateDisplayName = () => {
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const auth = getAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!displayName.trim()) return;

    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName
      });
      alert('Display name updated successfully!');
      auth.currentUser.reload().then(() => {
        console.log(auth.currentUser.displayName); // This should now reflect the updated display name.
      });
    } catch (error) {
      console.error('Error updating display name:', error);
      alert('Failed to update display name.');
    }

    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update Display Name
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Display Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update your display name, please enter your new name below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Display Name"
            type="text"
            fullWidth
            variant="standard"
            value={displayName}
            onChange={handleDisplayNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateDisplayName;
