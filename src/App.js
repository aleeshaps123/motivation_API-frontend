import React from 'react';
import './App.css';
import AddItem from './components/AddItem';
import DeleteItem from './components/DeleteItem';
import ItemList from './components/ItemList';

function App() {
  return (
    <div className="App">
      <h1>Favorite Quotes App</h1>  {/* Updated heading */}
      <AddItem />
      <DeleteItem />
      <ItemList />
    </div>
  );
}

export default App;
