import React, { useState, useEffect,useRef,useCallback } from 'react';
import { Search, Plus, Newspaper, MessageCircle, Calendar, Hash } from 'lucide-react';
import '../css/community.css'; // Import your CSS file
import api from '../../api';
const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [questions, setQuestions] = useState([]);
  const [auth,setAuth] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();
  const handleAskQuestion=async()=>{
    api.get('/AskQuestion');
  }
  const fetchQuestions = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await api.get('/CommunityQuestions', {
        params: {
          cursor: nextCursor, // null for first call
        },
      });
      const { results, nextCursor: newCursor } = res.data;

      setQuestions((prev) => [...prev, ...results]); // append
      setNextCursor(newCursor); // update cursor
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [nextCursor, loading]);

  // First load
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Observer for infinite scroll
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextCursor) {
          fetchQuestions();
        }
      },
      { threshold: 1 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [nextCursor, fetchQuestions]);

  // Filtered results
  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.Tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase().replace('#', '')))
  );
  
  return (
    <div className="community-container">
      <div className="community-wrapper">
        {/* Header */}
        <div className="community-header">
          <h1 className="community-title">
            <MessageCircle className="icon-lg" />
            Farmer Community Forum
          </h1>
          <p className="community-subtitle">Connect, Share, and Grow Together</p>
        </div>

        {/* Action Bar */}
        <div className="action-bar">
          <div className="action-bar-content">
            {/* Left side - Buttons */}
            <div className="action-buttons">
              <button 
                onClick={handleAskQuestion}
                className="btn-ask-question"
              >
                <Plus className="icon-md" />
                Ask Question
              </button>
              
              <button 
                // onClick={handleCommunityNews}
                className="btn-community-news"
              >
                <Newspaper className="icon-md" />
                Community News
              </button>
            </div>

            {/* Right side - Search */}
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by title or tags"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="questions-section">
        <div className="questions-list">
          {filteredQuestions.map((q) => (
            <div key={q._id} className="question-item">
              <h3 className="question-title">{q.title}</h3>
              <div className="question-tags">
                {q.Tags.map((tag, i) => (
                  <span key={i} className="tag">
                    <Hash className="icon-sm" />
                    {tag}
                  </span>
                ))}
              </div>
              <div className="question-meta">
                <div className="meta-left">
                  <span>Posted by {q.author || 'Anonymous'}</span>
                  <div className="meta-date">
                    <Calendar className="icon-sm" />
                    <span>{new Date(q.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="replies-badge">
                  <MessageCircle className="icon-sm" />
                  <span>{q.replies || 0} replies</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loader sentinel */}
        <div ref={observerRef} style={{ height: '40px' }}></div>

        {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}

        {filteredQuestions.length === 0 && !loading && (
          <div className="empty-state">
            <Search className="empty-state-icon" />
            <h3>No questions found</h3>
            <p>Try adjusting your search terms or browse all questions</p>
          </div>
        )}
      </div>

        {/* Stats Footer */}
        <div className="stats-footer">
          <div className="stats-grid">
            <div>
              <div className="stat-number">1,247</div>
              <div className="stat-label">Active Farmers</div>
            </div>
            <div>
              <div className="stat-number">3,892</div>
              <div className="stat-label">Questions Answered</div>
            </div>
            <div>
              <div className="stat-number">856</div>
              <div className="stat-label">Success Stories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;