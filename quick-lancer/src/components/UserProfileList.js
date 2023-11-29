// components/UserProfileList.js
import React, { useState, useEffect } from 'react';
import '../styles/userlist.css';

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
          console.log('Filtered Users:', users);
          setFilteredProfiles(users);
        } else {
          console.error('Error fetching filtered profiles:', response);
          setError('Error fetching filtered profiles');
        }
      } catch (error) {
        console.error('Error fetching filtered profiles:', error);
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
        <div key={user._id} className="user-profile">
          <h3>{user.email}</h3>
          <p>Tags: {user.tags.join(', ')}</p>
        </div>
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
