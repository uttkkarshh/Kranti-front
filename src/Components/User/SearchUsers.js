import React, { useState } from 'react';
import { searchUsersByName } from '../../Services/userService';
import "./Search.css"
import Profile from"../Feed/Profile"
function SearchUsers() {
  const [name, setName] = useState('');
  const [users, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchUsersByName(name);
      console.log(response)
      setResults(response.data);
      console.log(response.data)
      
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
      {users && users.length > 0 ? (
          users.map((user) => (
            <Profile
              key={user.id}
              name={user.username}
              bio={user.bio}
              id={user.id}
              profilePicture={user.profilePicture}
            />
          ))
        ) : (
          <p>No users found.</p>
        )}
    </div>
  );
}

export default SearchUsers;
