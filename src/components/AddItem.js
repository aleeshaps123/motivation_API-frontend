import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function AddQuote() {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newQuote = {
      text,
      author,
    };

    // Send a POST request to the API endpoint using Axios
    axios.post('http://localhost:8000/api/quotes/', newQuote)
      .then((response) => {
        console.log('Quote added successfully:', response.data);

        setText('');
        setAuthor('');

        // Optionally reload or refresh the component
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding quote:', error);
      });
  };

  const containerStyle = {
    backgroundImage: `url('https://marketplace.canva.com/EAFB6sml0NQ/1/0/1600w/canva-simple-abstract-motivational-quote-wallpaper-uinkE3Fx1cM.jpg')`, // Update 'your-image-path.jpg' with the path to your image
    
    backgroundRepeat: 'no-repeat',
    padding: '20px', // Adjust padding as needed
  };

  return (
    <form className="form-container" style={containerStyle} onSubmit={handleSubmit}>
      <div className="form-input-container">
        <label className="form-label">
          Quote Text:
          <input
            className="form-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <label className="form-label">
          Author:
          <input
            className="form-input"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
      </div>
      <button className="button" type="submit">Add Quote</button>
    </form>
  );
}

export default AddQuote;
