import React, { useState } from 'react';
import { searchUsersByName } from '../../Services/userService';
import "./Search.css"
function SearchUsers() {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchUsersByName(name);
      console.log(response)
      setResults(response.data);
      console.log(response.data)
      results.map((user) => (console.log(user)))
    } catch (error) {
      console.error('Search Failed:', error);
      alert('Error searching users.');
    }
  };

  return (
    <div className='Search'>
      <h1>Search Users</h1>
      <input type="text" placeholder="Search by name" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results && results.map((user) => (
          <li key={user.id}>{user.name}</li>
          
        ))}
      </ul>
    </div>
  );
}

export default SearchUsers;
