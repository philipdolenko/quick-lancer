// ProfilePage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';
import TagInput from '../components/TagInput';

const ProfilePage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [linkedin, setLinkedin] = useState('');
    const [avatar, setAvatar] = useState('');
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [tags, setTags] = useState([]);
    const avatarInputRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (isLoggedIn !== 'true') {
            navigate('/login');
        } else {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const loggedInUserId = localStorage.getItem('loggedInUserId');

            if (loggedInUserId) {
                const loggedInUser = users.find((user) => user.id === loggedInUserId);

                if (loggedInUser) {
                    setCurrentUser(loggedInUser);
                    setLinkedin(loggedInUser.linkedin || '');
                    setAvatar(loggedInUser.avatar || '');
                    setUsername(loggedInUser.username || '');
                    setDescription(loggedInUser.description || '');
                    setHourlyRate(loggedInUser.hourlyRate || '');
                    setTags(loggedInUser.tags || []);
                } else {
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        }
    }, [navigate]);

    useEffect(() => {
        // Сохранение данных профиля при изменении, только если currentUser не null
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                linkedin,
                avatar,
                username,
                description,
                hourlyRate,
                tags,
            };

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const updatedUsers = users.map((user) => (user.id === currentUser.id ? updatedUser : user));
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            console.log('Profile saved:', updatedUser);
        }
    }, [currentUser, linkedin, avatar, username, description, hourlyRate, tags]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setAvatar(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteAvatar = () => {
        setAvatar('');
    };

    return (
        <div className='profile-container'>
            <div className='link-field-background'>
                <input className='link-field' type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
            </div>
            <div className='profile-info'>
                <div className="avatar-container">
                    <label htmlFor="avatar-input" className="avatar-image">
                        {avatar && (
                            <>
                                <span className="delete-avatar" onClick={handleDeleteAvatar}>
                                    ✕
                                </span>
                                <img src={avatar} alt="Avatar" />
                            </>
                        )}
                        {!avatar && <span onClick={() => avatarInputRef.current.click()}>+</span>}
                    </label>
                    <input
                        type="file"
                        id="avatar-input"
                        accept="image/*"
                        className="avatar-input"
                        onChange={handleAvatarChange}
                        ref={avatarInputRef}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className='profile-about-info'>
                    <div className='username-profile-about-info-background'>
                        <input className='username-profile-info' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='description-profile-about-info-background'>
                        <textarea className='description-profile-info' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <div className='price-per-hour'>
                    <div className='price-per-hour-info-background'>
                        <input className='price-per-hour-info' type="text" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
                    </div>
                    <span className='hour-info'>
                        <span className='dollar-sign'>$/</span>hour
                    </span>
                </div>
            </div>
            <div className='profile-taginput'>
                <TagInput  selectedTags={tags} onTagChange={(newTags) => setTags(newTags)} showCount={false} />
            </div>
            
        </div>
    );
};

export default ProfilePage;
