import logo from './logo.svg';
import LoginPage from './Auth/jsx/login';
import SignupPage from './Auth/jsx/signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Home/jsx/home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
      </Routes>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
