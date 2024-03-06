import React from 'react';
import Button from '@mui/material/Button';
import updateFirestoreDocs from './updateFirestoreDocs';

const UnavailableSubmit = ({ selectedDays, displayName, onSubmit }) => {
  const handleUpdateClick = async () => {
    if (selectedDays.length > 0) {
      await updateFirestoreDocs(selectedDays, displayName)
        .then(() => {
          if (onSubmit) {
            onSubmit(); // Call the fetch data function after Firestore update
          }
        })
        .catch(error => {
          console.error("Error updating Firestore:", error);
          // Handle error (e.g., display an error message)
        });
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
