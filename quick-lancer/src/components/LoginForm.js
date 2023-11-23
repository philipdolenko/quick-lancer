import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleAuthProvider } from '../firebase';

import '../styles/loginform.css';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

const generateUniqueId = () => {
  // Вам нужно реализовать эту функцию, используя, например, библиотеку uuid.
  // В данном примере, просто возвращаем текущую метку времени
  return Date.now().toString();
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState('')

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, email, password).then(() => navigate('/'))
  };

  const handleSignUp = () => {
    try {
      createUserWithEmailAndPassword(auth, email, password).then(() => navigate('/'));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignInWithGoogle = () => {
      signInWithPopup(auth, googleAuthProvider).then(credentials => setUser(credentials.user)).catch(err => console.log(err))
  };


  React.useEffect(() => {
    if(user)  navigate('/');
  },[user])

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
