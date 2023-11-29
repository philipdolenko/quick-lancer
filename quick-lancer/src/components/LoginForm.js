import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginform.css';
// import { auth, googleAuthProvider } from '../firebase';
// import { signInWithPopup} from 'firebase/auth';

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
    try {
      const response = await fetch('http://localhost:4444/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        // Логин прошел успешно
        const token = await response.json();
        // Сохранение токена в localStorage
        localStorage.setItem('authToken', token);

        localStorage.setItem('isLoggedIn', 'true');
        // Обновление состояния пользователя
        setUser(token);
      } else {
        // Обработка ошибки при логине
        const error = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:4444/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          // Другие поля, если они необходимы
        }),
      });
  
      if (response.ok) {
        // Регистрация прошла успешно
        const token = await response.json();
        // Сохранение токена в localStorage
        localStorage.setItem('authToken', token);

        localStorage.setItem('isLoggedIn', 'true');
        // Обновление состояния пользователя
        setUser(token);
      } else {
        // Обработка ошибки при регистрации
        const error = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  

  const handleSignInWithGoogle = () => {
    // signInWithPopup(auth, googleAuthProvider).then(credentials => setUser(credentials.user)).catch(err => console.log(err))
  };


  React.useEffect(() => {
    if(user)  navigate('/');
  },[navigate, user])

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
