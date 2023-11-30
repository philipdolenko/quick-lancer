// components/UserProfileList.js
import React, { useState, useEffect } from 'react';
import '../styles/userlist.css';
import { Link } from 'react-router-dom';

const UserProfileList = ({ selectedTags }) => {
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredProfiles = async () => {
      try {
        if (selectedTags.length === 0) {
          // Если теги не выбраны, не отправляем запрос
          setFilteredProfiles([]);
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:4444/users?tags=${selectedTags.join(',')}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const users = await response.json();
          setFilteredProfiles(users);
        } else {
          setError('Error fetching filtered profiles');
        }
      } catch (error) {
        setError('Error fetching filtered profiles');
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProfiles();
  }, [selectedTags]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="user-profile-list">
      {filteredProfiles.map((user) => (
        <Link key={user._id} to={user.link} target="_blank" className="user-profile">
          <div className='avatar-container'>
            <label htmlFor="avatar-input" className="avatar-image">
              <>
                <img src={user.avatarUrl} alt="" />
              </>
            </label>
          </div>
          <div className='profile-about-info'>
            <div className='username-profile-info'>{user.fullName}</div>
            <div className='description-profile-info'>{user.description}</div>
          </div>
          <div className='price-per-hour'>
            <div className='price-per-hour-info'>{`$${user.price}/hour`}</div>
          </div>
        </Link>
      ))}
      {selectedTags.length === 0 && (
        <p>No tags selected. Please add tags to see filtered users.</p>
      )}
      {filteredProfiles.length === 0 && selectedTags.length > 0 && (
        <p>No users found with the selected tags.</p>
      )}
    </div>
  );
};

export default UserProfileList;
