import logo from './logo.svg';
import LoginPage from './Auth/jsx/login';
import SignupPage from './Auth/jsx/signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Home/jsx/home';
import AIChat from './Home/jsx/AIChat';
import DiseaseDetection from './Home/jsx/DiseaseDetection';
import Community from './community/jsx/community';
import './index.css'
import AskQuestion from './community/jsx/AskQuestion';
import QuestionDescription from './community/jsx/QuestionDescription';
import ProfilePage from './Profile/jsx/profile';
import NotificationsPage from './Profile/jsx/Notification';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/AskQuestion" element={<AskQuestion />}/>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/chatbot" element={<AIChat />}/>
        <Route path="/DiseaseDetection" element={<DiseaseDetection />}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/:id/QuestionDescription" element={<QuestionDescription/>}/>
        <Route path="/profilePage" element={<ProfilePage/>}/>
        <Route path="/notification" element={<NotificationsPage/>}/>
      </Routes>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
