import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Feed from '../Feed/Feed';
import NotificationFeed from '../Notification/NotificationFeed';
import { Link, Routes, Route } from "react-router-dom";
import SearchUsers from '../User/SearchUsers';
import PostCreator from "../PostCreator/postCreator";
import PostFeed from "../Feed/PostFeed";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faPlusSquare, faSearch ,faUser,facalendar, faCalendar} from '@fortawesome/free-solid-svg-icons';
import Profile from "../Feed/Profile";
import FullProfile from "../FullProfile/FullProfile";
import SearchEvents from "../Event/SearchEvent";

const HomePage = ({ userDet, onLogout }) => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(userDet);
  }, [userDet]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
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
           {! showModal &&(<img src={user.profilePicture} alt="User Profile" className="profile-image" onClick={toggleModal} />)}
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          {showModal && (
          <div onClick={toggleModal}  >
            <Profile name={user.name} bio={user.bio} id={user.userId} profilePicture={user.profilePicture} self={true}/>
          </div>
       
      )}
      
          </div>


          <div className="layout">
            <nav className="navigation">
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
                <Route path="create" element={<PostCreator  user={user} />} />
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
