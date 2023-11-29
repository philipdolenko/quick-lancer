// HomePage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import TagInput from '../components/TagInput';
import UserProfileList from '../components/UserProfileList';

import '../styles/container.css';

const HomePage = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagChange = (newTags) => {
    setSelectedTags(newTags);
  };

  return (
    <div className='wrapper'>
      <Header />
      <div className="container">
        {/* Поиск по тегам */}
        <TagInput selectedTags={selectedTags} onTagChange={handleTagChange}/>
        {/* Отображение профилей на основе выбранных тегов */}
        <UserProfileList selectedTags={selectedTags} />
      </div>
    </div>
  );
};

export default HomePage;
