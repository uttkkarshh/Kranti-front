import React, { useState } from "react";
import { createEvent } from "../../Services/userService"
import MapPicker from "../MapPicker/MapPicker"
import "./CreateEvent.css"
const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    latitude: "",
    longitude: "",
  });

  const [message, setMessage] = useState("");
const [location,setLocation]=useState(null);
const updateLocation=(upLoc)=>{
console.log(upLoc)
  setLocation(upLoc);
  setEventData({...eventData,longitude:upLoc.lng,latitude:upLoc.lat})
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!location){
      alert("select location on map")
      return;
    }
    try {
      
     
     const response = await createEvent(eventData);
      setMessage("Event created successfully!");
      setEventData({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        latitude: "",
        longitude: "",
      });
    } catch (error) {
      setMessage("Failed to create the event. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="create-event">
      <h2>Create Event</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="datetime-local"
            name="startDate"
            value={eventData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="datetime-local"
            name="endDate"
            value={eventData.endDate}
            onChange={handleChange}
            required
          />
        </div>
       

       
        <MapPicker onLocationSelect={updateLocation}/>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
