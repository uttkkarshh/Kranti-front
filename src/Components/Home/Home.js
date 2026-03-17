import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import "./HomePage.css";
import Feed from '../Feed/Feed';
import NotificationFeed from '../Notification/NotificationFeed';
import { Link, Routes, Route } from "react-router-dom";
import SearchUsers from '../User/SearchUsers';
import PostCreator from "../PostCreator/postCreator";
import PostFeed from "../Feed/PostFeed";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faPlusSquare, faSearch ,faUser,facalendar, faCalendar} from '@fortawesome/free-solid-svg-icons';

import FullProfile from "../FullProfile/FullProfile";
import SearchEvents from "../Event/SearchEvent";
import Create from "../Create/Create"
import ProfileCard from "../common/ProfileCard";
const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="home-page">
      {user ? (
        <>
          <div className="header">
      
          </div>


          <div className="layout">
        
            <nav className="navigation">
               <div className="profile-info">
                      <ProfileCard  logout={handleLogout} name={user.name} bio={user.bio} profilePicture={user.profilePicture}/>
                      </div>
              <ul>
                   
                 
                <li>
                  <Link to="/home/notifications">
                    <FontAwesomeIcon icon={faBell} />
                    <span>Notifications</span>
                  </Link>
                </li>
                <li>
                  <Link to="/home/create">
                    <FontAwesomeIcon icon={faPlusSquare} />
                    <span>Create</span>
                  </Link>
                </li>
                <li>
                  <Link to="/home/search">
                    <FontAwesomeIcon icon={faSearch} />
                    <span>Search</span>
                  </Link>
                </li>
                 <li>
                  <Link to="/home/searchevent">
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>Search Event</span>
                  </Link>
                </li>
                <li>
                  <Link to="/home">
                    <FontAwesomeIcon icon={faHome} />
                    <span>Post Feed</span>
                  </Link>
                </li>
                <li>
                  <Link to="/home/profile">
                    <FontAwesomeIcon icon={faUser} />
                    <span>Profile</span>
                  </Link>
                </li>
                
              </ul>
            </nav>

            <main className="content">
              <Routes>
                
                <Route path="profile" element={<FullProfile userData={user}/>}/>
                <Route path="search" element={<SearchUsers />} />
                <Route path="create" element={<Create  />} />
                <Route path="feed" element={<Feed />} />
                <Route path="notifications" element={<NotificationFeed />} />
                <Route path="" element={<PostFeed />} />
                <Route path="searchevent" element={<SearchEvents />} />
              </Routes>
            </main>
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default HomePage;
