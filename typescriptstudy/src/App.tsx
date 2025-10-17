import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Hello ${name}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' value={name} onChange={handleChange} />
        <input type='submit' value='제출' />
      </form>
    </>
  );
}

export default App;
