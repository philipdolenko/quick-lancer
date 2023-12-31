// components/TagInput.js
import React, { useState, useEffect } from 'react';
import tagsData from '../data.json';
import '../styles/taginput.css';

const TagInput = ({ selectedTags, onTagChange, showCount }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setInputValue('');
    setSuggestions([]);
  }, [selectedTags]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    try {
      const response = await fetch(`http://localhost:4444/users/tags`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const tagCounts = await response.json();

        const filteredSuggestions =
        value.trim() !== '' && Array.isArray(tagsData)
          ? tagsData
              .filter((tag) => tag.toLowerCase().includes(value.toLowerCase()))
              .map((tag) => {
                const foundTag = tagCounts.find((countObj) => countObj.tag.toLowerCase() === tag.toLowerCase());
                return { tag, count: foundTag ? foundTag.count : 0 };
              })
          : [];

        setSuggestions(filteredSuggestions);
      } else {
        console.error('Error fetching tag suggestions');
      }
    } catch (error) {
      console.error('Error fetching tag suggestions:', error);
    }
  };

  const handleTagSelect = (tag) => {
    if (onTagChange) {
      const newTags = selectedTags ? [...selectedTags] : [];
      if (!newTags.includes(tag)) {
        newTags.push(tag);
        onTagChange(newTags);
      }
    }

    setInputValue('');
    setSuggestions([]);
  };

  const handleTagRemove = (tag) => {
    if (onTagChange) {
      const newTags = selectedTags ? selectedTags.filter((selectedTag) => selectedTag !== tag) : [];
      onTagChange(newTags);
    }
  };

  return (
    <div className="tag-input-container">
      <div className="selected-tag-container">
        {selectedTags &&
          Array.isArray(selectedTags) &&
          selectedTags.map((tag, index) => (
            <div key={index} className="selected-tag" onClick={() => handleTagRemove(tag)}>
              {tag}
            </div>
          ))}
      </div>
      <input
        className="tag-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type TAG"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleTagSelect(item.tag)}>
              <div className="suggestion-tag">{item.tag}</div>
              <div className="suggestion-count">{item.count}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagInput;
