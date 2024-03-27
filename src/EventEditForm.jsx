import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const EventEditForm = ({ open, handleClose, event, handleSave }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        {/* Add your form elements here. For demonstration, a TextField is used. */}
        <TextField
          autoFocus
          margin="dense"
          label="Event Title"
          type="text"
          fullWidth
          variant="standard"
          value={event ? event.title : ""}
          onChange={(e) => handleSave({...event, title: e.target.value})} // Assuming handleSave now immediately updates the event
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleSave(event)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventEditForm;
