import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../utils/api';
import './Auth.css';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'admin') {
      navigate('/admin');
      return;
    }

    try {
      const data = await getAllUsers();
      const user = data.data.users.find(u => u.username === username && u.password === password);
      
      if (user) {
        if (remember) {
          localStorage.setItem('horusUser', username);
        } else {
          sessionStorage.setItem('horusUser', username);
        }
        setUser(username);
        navigate('/chat');
      } else {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ أثناء تسجيل الدخول');
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-box">
        <i className="fa-solid fa-eye" style={{ fontSize: '3.5rem', color: 'var(--accent)', marginBottom: '1.5rem' }}></i>
        <h1>Horus AI</h1>
        <p>تسجيل الدخول للمتابعة</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="اسم المستخدم" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label className="remember-me">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            <span>تذكرني</span>
          </label>
          <button type="submit" className="auth-btn">دخول</button>
        </form>
        <p className="auth-link">
          ليس لديك حساب؟ <button type="button" onClick={() => navigate('/signup')}>إنشاء حساب</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
