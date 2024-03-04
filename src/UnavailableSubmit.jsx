import React from 'react';
import Button from '@mui/material/Button';
import updateFirestoreDocs from './updateFirestoreDocs';

const UnavailableSubmit = ({ selectedDays, displayName }) => {
  const handleUpdateClick = () => {
    if (selectedDays.length > 0) {
      updateFirestoreDocs(selectedDays, displayName);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateClick}
        disabled={selectedDays.length === 0} // Button is disabled if no dates are selected
      >
        Update Availability
      </Button>
    </div>
  );
}

export default UnavailableSubmit;