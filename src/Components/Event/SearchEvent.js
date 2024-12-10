import React, { useState } from 'react';
import { searchEventsByTitle,searchEventsByLocation } from '../../Services/userService'; // Replace with your actual service function
import './SearchEvent.css';
import EventCard from '../Event/EventCard'; // A reusable component for displaying event details
import MapPicker from '../MapPicker/MapPicker';

function SearchEvents() {
  const [title, setTitle] = useState('');
  const [events, setEvents] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchEventsByTitle(title); // Call your backend API
      
      setEvents(response.data);
    } catch (error) {
      console.error('Search Failed:', error);
      alert('Error searching events.');
    }
  };
  const [location,setLocation]=useState(null);
  const searchByLoc=async()=>{
    try {
      console.log(location)
      const response = await searchEventsByLocation({ latitude: location.lat,
        longitude: location.lng,
        radius: 5000}); // Call your backend API
      
      setEvents(response.data);
    } catch (error) {
      console.error('Search Failed:', error);
      alert('Error searching events.');
    }
  }
  
  const updateLocation=(upLoc)=>{
   
      setLocation(upLoc);
     
      }
      const[bol,setBol]=useState(false);

  return (
    <>
    <div className="Search">
      <h1>Search Events</h1>
      <input
        type="text"
        placeholder="Search by event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={()=>{setBol(!bol)}}>Search By Location</button>
      {events && events.length > 0 ? (
        <div className="event-results">
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              description={event.description}
              startDate={event.startDate}
              endDate={event.endDate}
              latitude={event.latitude}
              longitude={event.longitude}
            />
          ))}
        </div>
      ) : (
        <p>No events found.</p>
      )}

    </div>
    {bol && ( <div className='map'><MapPicker onLocationSelect={updateLocation} /><button onClick={searchByLoc}>search</button></div>)}
    </>
  );
}

export default SearchEvents;
