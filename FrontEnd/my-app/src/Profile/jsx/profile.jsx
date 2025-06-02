import React, { useState,useEffect } from 'react';
import { User, MessageCircle, Calendar, Eye, MessageSquare } from 'lucide-react';
import api from '../../api';
import '../css/profile.css';
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
  // Mock data - replace with real data from your backend
  const [result,setResult]=useState({});
  const [questions,setQuestions]=useState([]);
  const [questionsReplied,setQuestionsReplied]=useState([]);
  const navigate=useNavigate();
  const fetchProfileData = async ()=>{
    try{
        const response=await api.get('/profileData');
        
       
            console.log(response.data);
       
            setResult(response.data)
            
            setQuestions(response.data.Questions);
            setQuestionsReplied(response.data.Replies)
        
        
            

        
        
    }
    catch(error){
        alert("login required");
        navigate('/login');
        console.log(error);
    }
    
  }
  useState(()=>{
    fetchProfileData();
  },[])
  const handleQuestionClick=async (e)=>{
    navigate(`/${e}/QuestionDescription`);
  }
  const handleReplyClick=async (e)=>{
    navigate(`/${e}/QuestionDescription`);
  }

  const [activeTab, setActiveTab] = useState('asked');

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-picture">
            <img src={""} alt={""} />
          </div>
          <div className="farmer-details">
            <h1>{result.name}</h1>
            <p className="email">{result.email}</p>
            <p className="join-date">
              <Calendar size={16} />
              Member since 
            </p>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <MessageCircle className="stat-icon" />
            <div className="stat-number"></div>
            <div className="stat-label">Questions Asked {result.Question?.length || 0}</div>
          </div>
          <div className="stat-card">
            <MessageSquare className="stat-icon" />
            <div className="stat-number"></div>
            <div className="stat-label">Replies Given {result.Replies?.length || 0}</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs-container">
        <button 
          className={`tab ${activeTab === 'asked' ? 'active' : ''}`}
          onClick={() => setActiveTab('asked')}
        >
          Questions I Asked 
        </button>
        <button 
          className={`tab ${activeTab === 'replied' ? 'active' : ''}`}
          onClick={() => setActiveTab('replied')}
        >
          Questions I Replied To 
        </button>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {activeTab === 'asked' && (
          <div className="questions-section">
            <h2>My Questions</h2>
           {questions.map(question => (
              <div key={question._id} className="question-card" onClick={()=>handleQuestionClick(question._id)}>
                <div className="question-header">
                  <h3>{question.Title}</h3>
                  <span className="question-date"></span>
                </div>
                <p className="question-content"></p>
                <div className="question-stats">
                  <span className="stat">
                    <MessageCircle size={14} />
                     {question.Replies?.length || 0}replies
                  </span>
                  
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'replied' && (
          <div className="replies-section">
            <h2>Questions I Helped With</h2>
            {questionsReplied.map(reply => (
              <div key={reply.Question._id} className="reply-card" onClick={()=>handleReplyClick(reply.Question._id)}>
                <div className="reply-header">
                  <h3>{reply.Question.Title}</h3>
                  <span className="reply-date"></span>
                </div>
                
                <div className="my-reply">
                  <strong>My Reply:</strong>
                  <p>{reply.reply}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;