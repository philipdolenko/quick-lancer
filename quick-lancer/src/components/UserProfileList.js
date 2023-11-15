import React, { useState, useEffect } from 'react';
import '../styles/userlist.css'; // Импортируйте ваш файл стилей

const UserProfileList = ({ selectedTags }) => {
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter(user => {
      return (
        user.tags &&
        Array.isArray(user.tags) &&
        user.tags.some(tag => selectedTags.includes(tag))
      );
    });
    setFilteredProfiles(filteredUsers);
  }, [selectedTags]);


  return (
    <div className="user-profile-list">
      {filteredProfiles.map(user => (
        <a 
          key={user.id}
          target="_blank"
          rel="noopener noreferrer"
          className="user-profile" 
          href={user.linkedin}
        >
          <img src={user.avatar} alt="" />
          <div className="user-profile-info">
            <h3>{user.username}</h3>
            <p>{user.description}</p>
          </div>
          <div className="user-profile-rate">
            <span className='price'>{user.hourlyRate}$/</span>
            <span className='time'>hour</span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default UserProfileList;
