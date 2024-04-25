import React, { useState } from 'react';
import axios from 'axios';

function DeleteQuote({ quote }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClick = () => {
    if (!quote) {
      console.error('Quote is not defined.');
      return;
    }

    if (confirmDelete) {
      // Send a DELETE request to the API endpoint using Axios
      axios.delete(`http://localhost:8000/api/quotes/${quote.id}/`)
        .then((response) => {
          console.log('Quote deleted successfully:', response.data);

          // Optionally reload or refresh the component
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error deleting quote:', error);
        });
    } else {
      setConfirmDelete(true); // Show confirmation message
    }
  };

  return (
    <div>
      {quote ? (
        confirmDelete ? (
          <>
            <p>Are you sure you want to delete this quote?</p>
            <button onClick={handleClick}>Confirm Delete</button>
            <button onClick={() => setConfirmDelete(false)}>Cancel</button>
          </>
        ) : (
          <button className="button" onClick={handleClick}>Delete</button>
        )
      ) : (
        <p>No quote selected.</p>
      )}
    </div>
  );
}

export default DeleteQuote;
