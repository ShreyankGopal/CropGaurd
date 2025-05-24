import logo from './logo.svg';
import LoginPage from './Auth/jsx/login';
import SignupPage from './Auth/jsx/signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Home/jsx/home';
import AIChat from './Home/jsx/AIChat';
import DiseaseDetection from './Home/jsx/DiseaseDetection';
import Community from './community/jsx/community';
import './index.css'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/chatbot" element={<AIChat />}/>
        <Route path="/DiseaseDetection" element={<DiseaseDetection />}/>
        <Route path="/community" element={<Community/>}/>
      </Routes>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
