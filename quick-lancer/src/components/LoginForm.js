import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginform.css';

const generateUniqueId = () => {
  // Вам нужно реализовать эту функцию, используя, например, библиотеку uuid.
  // В данном примере, просто возвращаем текущую метку времени
  return Date.now().toString();
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find((user) => user.email === email && user.password === password);
  
    if (foundUser) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInUserId', foundUser.id); // Сохраняем id пользователя при входе
      navigate('/');
    } else {
      console.log('Invalid email or password');
    }
  };

  const handleSignUp = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      console.log('User with this email already exists');
    } else {
      const newUser = { id: generateUniqueId(), email, password };
      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      console.log('Sign Up successful:', newUser);
    }
  };

  const handleSignInWithGoogle = () => {
    console.log('Sign In with Google');
  };

  return (
    <div className="login-form-container">
      <form>
        <div className="form-group">
          <input className="login-form-input" type="email" placeholder="E-mail" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <input className="login-form-input" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className="form-actions">
          <div className="button-group">
            <button className="sign-in-button" type="button" onClick={handleSignIn}>
              Sign In
            </button>
            <button className="sign-up-button" type="button" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
          <button className="sign-in-with-google-button" type="button" onClick={handleSignInWithGoogle}></button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
