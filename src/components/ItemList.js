import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteQuote from './DeleteItem'; // Make sure the component's name reflects its use for quotes
import './liststyle.css'; // Assuming this is your CSS file

function QuoteList() {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editQuoteId, setEditQuoteId] = useState(null);
  const [editValues, setEditValues] = useState({ text: '', author: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/quotes/')
      .then((response) => {
        setQuotes(response.data);
        setFilteredQuotes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = quotes.filter((quote) =>
      quote.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuotes(filtered);
  }, [quotes, searchTerm]);

  const handleEditClick = (quote) => {
    setEditQuoteId(quote.id);
    setEditValues({ text: quote.text, author: quote.author });
  };

  const handleSaveClick = () => {
    axios
      .put(`http://localhost:8000/api/quotes/${editQuoteId}/`, editValues)
      .then((response) => {
        setQuotes(quotes.map((quote) => (quote.id === editQuoteId ? response.data : quote)));
        setEditQuoteId(null);
      })
      .catch((error) => {
        console.error('Error updating quote:', error);
      });
  };

  const handleEditChange = (field, value) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleDelete = (quoteId) => {
    setQuotes(quotes.filter((quote) => quote.id !== quoteId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by quote text..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="quote-list"> {/* Container for the quote boxes */}
        {filteredQuotes.map((quote) => (
          <div className="quote-box" key={quote.id}> {/* Individual quote box */}
            {editQuoteId === quote.id ? (
              <>
                <input
                  type="text"
                  value={editValues.text}
                  onChange={(e) => handleEditChange('text', e.target.value)}
                />
                <input
                  type="text"
                  value={editValues.author}
                  onChange={(e) => handleEditChange('author', e.target.value)}
                />
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={() => setEditQuoteId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{quote.text}</p>
                <p>{quote.author}</p>
                <DeleteQuote quote={quote} />
                <button onClick={() => handleEditClick(quote)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuoteList;
