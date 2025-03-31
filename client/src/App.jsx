import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Post from './pages/post';
import Quiz from './pages/quiz';
import Profile from './pages/profile';
import NavTabs from './components/navtabs';
import Login from './pages/login';
import Register from './pages/register';
import { createPrompt, getUserPrompts } from './api/promptAPI';
import './index.css';


function App() {
    return (
        <div>
            <NavTabs />
            <Routes>
                <Route exact path="/" element={ <Home /> } />
                <Route exact path="/post" element={ <Post />} />
                <Route exact path="/quiz" element= { <Quiz />} />
                <Route exact path="/profile" element= { <Profile />} />
                <Route exact path="/login" element= { <Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/profile/:userId" element={<Profile />} />
                <Route exact path="/promptAPI" element={<createPrompt />} />
                <Route exact path="/promptAPI" element={<getUserPrompts />} />
            </Routes>
        </div>
    );
};

export default App;