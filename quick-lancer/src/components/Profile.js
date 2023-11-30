import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';
import TagInput from '../components/ProfileTagInput';

const ProfilePage = () => {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        avatarUrl: '',
        link: '',
        price: 0,
        description: '',
        tags: [],
    });
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const avatarInputRef = useRef(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://localhost:4444/auth/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const fetchedUserData = await response.json();
                    setUserData(fetchedUserData);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, [navigate]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch('http://localhost:4444/auth/me', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                setIsEditing(false);
                console.log('Profile saved successfully');
            } else {
                console.error('Error saving profile');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleChange = (e, field) => {
        const { value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <div className='profile-container'>
            {/* Блок с вводом ссылки */}
            <div className='link-field-background'>
                {isEditing ? (
                    <input
                        className='link-field'
                        type="text"
                        value={userData.link}
                        onChange={(e) => handleChange(e, 'link')}
                        placeholder='Enter your link...'
                    />
                ) : (
                    <div className='link-field'>{userData.link}</div>
                )}
            </div>

            <div className='profile-info'>
                <div className='avatar-container'>
                    {isEditing ? (
                        <label htmlFor="avatar-input" className="avatar-image">
                            {userData.avatarUrl && (
                                <>
                                    <span className="delete-avatar" onClick={() => setUserData({ ...userData, avatarUrl: '' })}>
                                        ✕
                                    </span>
                                    <img src={userData.avatarUrl} alt="Avatar" />
                                </>
                            )}
                            {!userData.avatarUrl && <span onClick={() => avatarInputRef.current.click()}>+</span>}
                        </label>
                    ) : (
                        <label htmlFor="avatar-input" className="avatar-image" style={{ 'cursor': 'default' }}>
                            <>
                                <img src={userData.avatarUrl} alt="" />
                            </>
                        </label>
                    )}
                    {isEditing && (
                        <input
                            type="file"
                            id="avatar-input"
                            accept="image/*"
                            className="avatar-input"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                const reader = new FileReader();

                                reader.addEventListener('loadend', () => {
                                    setUserData({ ...userData, avatarUrl: reader.result });
                                });
                                if (file) {
                                    reader.readAsDataURL(file);
                                }
                            }}
                            ref={avatarInputRef}
                            style={{ display: 'none' }}
                        />
                    )}
                </div>
                <div className='profile-about-info'>
                    <div className='username-profile-about-info-background'>
                        {isEditing ? (
                            <input
                                className='username-profile-info'
                                type="text"
                                value={userData.fullName}
                                onChange={(e) => handleChange(e, 'fullName')}
                            />
                        ) : (
                            <div className='username-profile-info'>{userData.fullName}</div>
                        )}

                    </div>
                    <div className='description-profile-about-info-background'>
                        {isEditing ? (
                            <textarea
                                className='description-profile-info'
                                name='description'
                                value={userData.description}
                                onChange={(e) => handleChange(e, 'description')}
                                placeholder='Enter your description...'
                            />
                        ) : (
                            <div className='description-profile-info'>{userData.description}</div>
                        )}
                    </div>
                </div>
                <div className='price-per-hour'>
                    {isEditing ? (
                        <>
                            <div className='price-per-hour-info-background'>
                                <input
                                    className='price-per-hour-info'
                                    type='number'
                                    name='price'
                                    value={userData.price}
                                    onChange={(e) => handleChange(e, 'price')}
                                />
                            </div>
                            <span className='hour-info'>$/hour</span>
                        </>
                    ) : (
                        <div className='price-per-hour-info'>{`$${userData.price != null ? userData.price : 0}/hour`}</div>
                    )}
                </div>
                <div className='profile-edit-group'>
                    {isEditing ? (
                        <div className='buttons'>
                            <button className='save-profile-button' onClick={handleSaveClick}>
                                Save
                            </button>
                            <button className='cancel-profile-button' onClick={handleCancelClick}>
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button className='edit-profile-button' onClick={handleEditClick}>
                            Edit Profile
                        </button>
                    )}

                </div>
            </div>
            
            {!isEditing && (
                <div className='selected-profile-tag'>
                    <div className='selected-tag-container'>
                        {userData.tags.map((tag, index) => (
                            <div key={index} className='selected-tag'>
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Блок с вводом тегов */}
            {isEditing && (
                <div className='tag-input-container'>
                    <TagInput
                        selectedTags={userData.tags}
                        onTagChange={(newTags) => setUserData((prevData) => ({ ...prevData, tags: newTags }))}
                        showCount={false}
                    />
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
