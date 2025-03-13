// AuthPages.jsx
import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import '../css/loginsignup.css';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();
  async function submitForm(e){
    e.preventDefault();
    try{
      const response=await api.post('/login',{email:email,password:password})
      console.log(response)
      navigate('/')
    }
    catch(error){
      console.log(error.response.status)
      if (error.response && error.response.status === 400) {
            window.alert("Invalid email or password");
        } else {
            console.log(error);
      }
    }

  }
  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-overlay">
          <div className="auth-logo">
            <span className="logo-icon">🌱</span>
            <h1>CropGuard</h1>
          </div>
          <p className="auth-quote">"Protecting your crops through innovation"</p>
        </div>
      </div>
      
      <div className="auth-right">
        <a href="/" className="back-button">
          <ArrowLeft size={20} />
          Back to Home
        </a>
        
        <div className="auth-form-container">
          <h2>Welcome Back!</h2>
          <p className="auth-description">Login to access your CropGuard account</p>

          <form className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={20} />
                <input value={email} onInput={((e)=>setEmail(e.target.value))} type="email" placeholder="Enter your email" />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={20} />
                <input value={password} onInput={((e)=>setPassword(e.target.value))} type="password" placeholder="Enter your password" />
              </div>
            </div>

            <div className="form-actions">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
            </div>

            <button onClick={submitForm} type="submit" className="submit-button">Login</button>
          </form>

          <p className="auth-switch">
            Don't have an account? 
            <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;