import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

import '../styles/container.css';
const LoginPage = () => {
    return (
        <div className="wrapper">
            <Header />
            <div className="container">
  
                 {/* Форма авторизации */}
                 <LoginForm/>
            </div>
        </div>
    )
}
export default LoginPage;