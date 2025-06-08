import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, MessageCircle, Send, Hash, Clock } from 'lucide-react';
import '../css/QuestionDescription.css';
import api from '../../api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const QuestionDescription = ({ questionId }) => {
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const Navigate=useNavigate();
  // Mock question ID for demo - in real app this would come from route params
  const mockQuestionId = useParams(questionId)
    console.log(mockQuestionId);
  useEffect(() => {
    fetchQuestionData();
  }, [mockQuestionId]);

  const fetchQuestionData = async () => {
    try {
     // setLoading(true);
      // Replace with actual API call
      const response = await api.get(`/QuestionDescription/${mockQuestionId.id}`)
      console.log(response.data);
      setQuestionData(response.data);

      // Mock data for demo - replace with actual API call
    //   const mockData = {
    //     _id: '68356cba9eae58bf48ba47d6',
    //     user: '6831a7caa0de12c411e7771c',
    //     Title: 'How to prevent corn blight during monsoon season?',
    //     Question: 'I am facing issues with corn blight in my 5-acre farm during the monsoon season. The leaves are turning yellow and brown, and I can see some fungal growth. I have tried basic fungicides but the problem persists. My farm is located in a high humidity area and we get heavy rainfall during monsoons. What are the best practices to prevent and treat corn blight? Should I change my planting schedule or use different varieties? Any organic solutions would be appreciated as I am trying to reduce chemical usage.',
    //     Tags: ['#corn', '#blight', '#monsoon', '#organic'],
    //     DatePosted: '2025-05-27T07:41:46.072Z',
    //     Replies: [
    //       {
    //         _id: 'reply1',
    //         user: 'John Farmer',
    //         reply: 'I had similar issues last year. Try using copper-based fungicides early in the season before the rains start. Also, ensure proper drainage in your fields.',
    //         datePosted: '2025-05-27T08:30:00.000Z'
    //       },
    //       {
    //         _id: 'reply2',
    //         user: 'Sarah Green',
    //         reply: 'Consider planting resistant varieties like Pioneer 30G40 or DKC64-69. Also, maintain proper plant spacing for better air circulation. Neem oil spray works well as an organic option.',
    //         datePosted: '2025-05-27T09:15:00.000Z'
    //       }
    //     ],
    //     __v: 0
    //   };

      setLoading(false)

    } catch (err) {
      setError('Failed to fetch question details');
      setLoading(false);
    }
  };

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;

    try {
      setSubmittingReply(true);
      
      // Replace with actual API call
      const response = await api.post('/AddReply',{QuestionId:mockQuestionId.id,replyText:replyText})

      // Mock successful reply su   bmission
      console.log(response.data)
      const name=response.data.name;
      const newReply = {
        
        user:{
            name: name
        }, // Replace with actual user name
        reply: replyText,
        DatePosted: new Date().toISOString()
      };

      setQuestionData(prev => ({
        ...prev,
        Replies: [...prev.Replies, newReply]
      }));

      setReplyText('');
      setSubmittingReply(false);
      
    } catch (err) {
      alert("Login/Signup for adding replies")
      console.error('Failed to submit reply:', err);
      setSubmittingReply(false);
    }
  };

  const handleGoBack = () => {
    console.log('Navigate back to community forum');
    // Navigation logic will be added later
    Navigate('/community');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="question-description-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading question...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="question-description-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchQuestionData} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="question-description-container">
      <div className="question-description-wrapper">
        {/* Header */}
        <div className="header">
          <button onClick={handleGoBack} className="back-button">
            <ArrowLeft className="icon" />
            Back to Forum
          </button>
        </div>

        {/* Question Card */}
        <div className="question-card">
          <div className="question-header">
            <h1 className="question-title">{questionData.Title}</h1>
            
            <div className="question-meta">
              <div className="meta-item">
                <User className="meta-icon" />
                <span>{questionData.user.name}</span>
              </div>
              <div className="meta-item">
                <Calendar className="meta-icon" />
                <span>{formatDate(questionData.DatePosted)}</span>
              </div>
              <div className="meta-item">
                <MessageCircle className="meta-icon" />
                <span>{questionData.Replies?.length || 0} replies</span>
              </div>
            </div>
          </div>

          <div className="question-content">
            <p className="question-text">{questionData.Question}</p>
            
            <div className="question-tags">
              {questionData.Tags.map((tag, index) => (
                <span key={index} className="tag">

                  {tag.replace('#', '#')}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Replies Section */}
        <div className="replies-section">
          <div className="replies-header">
            <h2 className="replies-title">
              <MessageCircle className="replies-icon" />
              Replies ({questionData.Replies?.length || 0})
            </h2>
          </div>

          {questionData.Replies.length > 0 ? (
            <div className="replies-list">
              {questionData.Replies.map((reply, index) => (
                <div key={reply._id} className="reply-card">
                  <div className="reply-header">
                    <div className="reply-user">
                      <User className="user-icon" />
                      <span className="username">{reply.user.name}</span>
                    </div>
                    <div className="reply-date">
                      <Clock className="clock-icon" />
                      <span>{formatDate(reply.DatePosted)}</span>
                    </div>
                  </div>
                  <div className="reply-content">
                    <p>{reply.reply}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-replies">
              <MessageCircle className="no-replies-icon" />
              <p>No replies yet. Be the first to help!</p>
            </div>
          )}
        </div>

        {/* Add Reply Section */}
        <div className="add-reply-section">
          <h3 className="add-reply-title">Add Your Reply</h3>
          <div className="reply-form">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Share your knowledge and help this farmer solve their problem..."
              className="reply-textarea"
              rows="4"
              maxLength="1000"
            />
            <div className="reply-actions">
              <span className="char-count">{replyText.length}/1000</span>
              <button
                onClick={handleSubmitReply}
                disabled={!replyText.trim() || submittingReply}
                className="submit-reply-button"
              >
                {submittingReply ? (
                  <>
                    <div className="button-spinner"></div>
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="button-icon" />
                    Post Reply
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDescription;