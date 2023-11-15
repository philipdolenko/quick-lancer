import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Profile from '../components/Profile';
import '../styles/container.css';

const ProfilePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn !== 'true') {
      navigate('/login');
    }
  }, [navigate]);



  return (
    <div className='wrapper'>
     <Header />
      <div className='container'>
        <Profile />
      </div>
    </div>

  );
};

export default ProfilePage;
