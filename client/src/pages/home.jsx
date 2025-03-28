import React from 'react';
import '../index.css'
import { Link } from 'react-router-dom';


function Home() {
    return (
        <div className="home">
            <h2>Do you have a novel idea?</h2>
            <p>Write short stories daily, and take quizzes to see which book you're going to binge next. Register or log into an existing account below!!!</p>

            <Link to='/login'>
                <button className="btn">Login</button>
            </Link>

            <Link to='/register'>
                <button className="btn">Register</button>
            </Link>
        </div>  
    );
}

export default Home;