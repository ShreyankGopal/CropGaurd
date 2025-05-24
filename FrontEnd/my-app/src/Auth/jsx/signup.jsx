import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../css/loginsignup.css';
import api from '../../api';
const SignupPage = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    async function submitForm(e){
      e.preventDefault();
      try{
        const response=await api.post('/signup',{name:name,email:email,password:password})
        console.log(response)
        if(response.status==201){
          navigate('/login');
        }
       
        
      }
      catch(error){
        if (error.response && error.response.status === 400) {
            window.alert("User already exists");
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
            <p className="auth-quote">"Join our community of farmers protecting crops worldwide"</p>
          </div>
        </div>
        
        <div className="auth-right">
          <a href="/" className="back-button">
            <ArrowLeft size={20} />
            Back to Home
          </a>
          
          <div className="auth-form-container">
            <h2>Create Account</h2>
            <p className="auth-description">Join CropGuard to protect your harvest</p>
  
            <form className="auth-form">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <User size={20} />
                  <input value={name} onInput={((e)=>setName(e.target.value))} type="text" placeholder="Enter your full name" />
                </div>
              </div>
  
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
                  <input value={password} onInput={((e)=>setPassword(e.target.value))} type="password" placeholder="Create a password" />
                </div>
              </div>
  
              <div className="form-actions">
                <label className="terms">
                  <input type="checkbox" />
                  <span>I agree to the Terms of Service and Privacy Policy</span>
                </label>
              </div>
  
              <button onClick={submitForm}type="submit" className="submit-button">Create Account</button>
            </form>
  
            <p className="auth-switch">
              Already have an account? 
              <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    );
  };
  export default SignupPage;