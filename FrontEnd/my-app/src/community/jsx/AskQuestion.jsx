import React, { useState } from 'react';
import { ArrowLeft, Send, Tag, HelpCircle, MessageSquare, X } from 'lucide-react';
import '../css/AskQuestions.css';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
const AskQuestion = () => {
  const [formData, setFormData] = useState({
    title: '',
    question: '',
    tags: []
  });
  const validTags=['tomatoes','organic','pestcontrol','blight','corn','rice','wine','pomogranate','fruits','vegetables','fertility','transport','prices','rentals','schemes']
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [arr,setArr] = useState([]);
//   let arr=[];
const Navigate=useNavigate()
  const handleTagButtonClick=(e)=>{
    setCurrentTag(e);
    
  } 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const handleTagInputChange=(e)=>{
    if(e.length==0){
        setCurrentTag(e);
        setShowDropdown(false)
    }
    else{
        setShowDropdown(true)
        var match=[]
        setCurrentTag(e);
        console.log(e);
        for(var i=0;i<validTags.length;i++){
        
            if(validTags[i].includes(e)){
             //   console.log("hi");
                match.push(validTags[i]);
            }
        }
    
        setArr(match);
    }
    
  }
  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      setShowDropdown(false)
      const tag = currentTag.trim().toLowerCase().replace(/\s+/g, '');
      setArr([]);
      if (tag && !formData.tags.includes(`#${tag}`) && formData.tags.length < 5 && validTags.includes(`${tag}`)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, `#${tag}`]
        }));
        setCurrentTag('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 10) {
      newErrors.title = 'Title must be at least 10 characters long';
    }
    
    if (!formData.question.trim()) {
      newErrors.question = 'Question description is required';
    } else if (formData.question.trim().length < 20) {
      newErrors.question = 'Question must be at least 20 characters long';
    }
    
    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        try{
            console.log("doing an api request");
            const response=await api.post('/AskQuestionForm',{formData:formData})
            if(response.data=='success'){
                console.log("success")
                console.log('Question submitted:', formData);
                // Here you would typically send the data to your backend
                alert('Question submitted successfully!');
            }
        }
        catch(error){
            alert('Login/Signup to ask a query');
            console.log(error)
        }
       
        
      
      // Reset form or navigate away
    }
  };

  const handleGoBack = () => {
    console.log('Navigate back to community forum');
    Navigate('/community')
  };

  return (
    <div className="ask-question-container">
      <div className="ask-question-wrapper">
        {/* Header */}
        <div className="header">
          <button onClick={handleGoBack} className="back-button">
            <ArrowLeft className="icon" />
            Back to Forum
          </button>
          <div className="header-content">
            <h1 className="main-title">
              <HelpCircle className="title-icon" />
              Ask a Question
            </h1>
            <p className="subtitle">Share your farming challenge with the community</p>
          </div>
        </div>

        {/* Form */}
        <div className="form-container">
          <form onSubmit={handleSubmit} className="question-form">
            {/* Title Input */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                <MessageSquare className="label-icon" />
                Question Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., How to prevent tomato blight in humid weather?"
                className={`form-input ${errors.title ? 'error' : ''}`}
                maxLength="200"
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
              <span className="char-count">{formData.title.length}/200</span>
            </div>

            {/* Question Description */}
            <div className="form-group">
              <label htmlFor="question" className="form-label">
                <HelpCircle className="label-icon" />
                Question Description
              </label>
              <textarea
                id="question"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                placeholder="Describe your problem in detail. Include information about your location, crop type, growing conditions, and what you've already tried..."
                className={`form-textarea ${errors.question ? 'error' : ''}`}
                rows="8"
                maxLength="2000"
              />
              {errors.question && <span className="error-text">{errors.question}</span>}
              <span className="char-count">{formData.question.length}/2000</span>
            </div>

            {/* Tags Input */}
            <div className="form-group">
              <label htmlFor="tags" className="form-label">
                <Tag className="label-icon" />
                Tags (Max 5)
              </label>
              <div className="tags-input-container">
                <input
                  type="text"
                  id="tags"
                  value={currentTag}
                  onChange={(e)=>handleTagInputChange(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Type a tag and press Enter (e.g., tomatoes, organic, pest control)"
                  className="tags-input"
                  disabled={formData.tags.length >= 5}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="add-tag-button"
                  disabled={!currentTag.trim() || formData.tags.length >= 5}
                >
                  Add Tag
                </button>
              </div>
              {showDropdown && 
                <div className="dropdown">
                    
                    <div id="myDropdown" className="dropdown-content">
                        {arr.map((item, index) => (
                            <button key={index} className="dropdown-button" onClick={()=>handleTagButtonClick(item)}>{item}</button>
                        ))}
                    </div>
                </div>
            }
              {/* Display Tags */}
              <div className="tags-display">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="tag-item">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="remove-tag"
                    >
                      <X className="remove-icon" />
                    </button>
                  </span>
                ))}
              </div>
              
              {errors.tags && <span className="error-text">{errors.tags}</span>}
              <p className="help-text">
                Tags help other farmers find your question. Use lowercase letters only, no spaces.
              </p>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button type="submit" className="submit-button">
                <Send className="button-icon" />
                Post Question
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="tips-container">
          <h3 className="tips-title">Tips for a Great Question</h3>
          <ul className="tips-list">
            <li>Be specific about your problem and include relevant details</li>
            <li>Mention your location, climate, and growing conditions</li>
            <li>Include what you've already tried to solve the problem</li>
            <li>Use clear, descriptive tags to help others find your question</li>
            <li>Add photos if they would help explain your situation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;