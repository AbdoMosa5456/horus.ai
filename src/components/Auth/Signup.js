import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkEmail, checkUsername, createUser } from '../../utils/api';
import './Auth.css';

const Signup = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
    plan: 'free',
    countryCode: '+20'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirm) {
      setError('كلمة المرور غير متطابقة');
      return;
    }

    try {
      const emailCheck = await checkEmail(formData.email);
      if (emailCheck.exists) {
        setError('البريد الإلكتروني موجود بالفعل');
        return;
      }

      const usernameCheck = await checkUsername(formData.username);
      if (usernameCheck.exists) {
        setError('اسم المستخدم موجود بالفعل');
        return;
      }

      const result = await createUser({
        username: formData.username,
        email: formData.email,
        phone: formData.countryCode + formData.phone,
        password: formData.password,
        plan: formData.plan
      });

      if (result.success) {
        sessionStorage.setItem('horusUser', formData.username);
        setUser(formData.username);
        navigate('/chat');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء الحساب');
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-box">
        <i className="fa-solid fa-eye" style={{ fontSize: '3.5rem', color: 'var(--accent)', marginBottom: '1.5rem' }}></i>
        <h1>Horus AI</h1>
        <p>إنشاء حساب جديد</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSignup}>
          <input type="text" name="username" placeholder="اسم المستخدم" value={formData.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleChange} required />
          <div className="phone-input">
            <select name="countryCode" value={formData.countryCode} onChange={handleChange}>
              <option value="+20">+20</option>
              <option value="+966">+966</option>
              <option value="+971">+971</option>
            </select>
            <input type="tel" name="phone" placeholder="رقم الهاتف" value={formData.phone} onChange={handleChange} required />
          </div>
          <input type="password" name="password" placeholder="كلمة المرور" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirm" placeholder="تأكيد كلمة المرور" value={formData.confirm} onChange={handleChange} required />
          <select name="plan" value={formData.plan} onChange={handleChange}>
            <option value="free">Free</option>
            <option value="plus">Plus</option>
            <option value="pro">Pro</option>
          </select>
          <button type="submit" className="auth-btn">إنشاء حساب</button>
        </form>
        <p className="auth-link">
          لديك حساب بالفعل؟ <button type="button" onClick={() => navigate('/login')}>تسجيل الدخول</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
