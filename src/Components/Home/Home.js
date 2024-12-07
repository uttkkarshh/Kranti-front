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
import { faHome, faBell, faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons';

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
          <header className="header">
            <img src="https://deadline.com/wp-content/uploads/2018/08/taxidriver.png" alt="User Profile" className="profile-image" onClick={toggleModal} />
          </header>

          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={toggleModal}>&times;</span>
                <h1>{user.username}</h1>
                <p>{user.bio}</p>
                <p>Your Score: {user.score}</p>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            </div>
          )}

          <div className="layout">
            <nav className="navigation">
              <ul>
                <li>
                  <Link to="/home/feed">
                    <FontAwesomeIcon icon={faHome} />
                    <span>Feed</span>
                  </Link>
                </li>
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
                  <Link to="/home">
                    <FontAwesomeIcon icon={faHome} />
                    <span>Post Feed</span>
                  </Link>
                </li>
              </ul>
            </nav>

            <main className="content">
              <Routes>
                <Route path="search" element={<SearchUsers />} />
                <Route path="create" element={<PostCreator />} />
                <Route path="feed" element={<Feed />} />
                <Route path="notifications" element={<NotificationFeed />} />
                <Route path="" element={<PostFeed />} />
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
