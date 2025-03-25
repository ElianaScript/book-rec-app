import React from 'react';
import '../index.css'
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home">
            <h1>Do you have a novel idea?</h1>
            <p>Write short stories daily, and take quizzes to see which book you're going to binge next. Register or log into an existing account below!!!</p>

            <Link to='/auth'>
                <button classname="btn">Login / Register</button>
            </Link>
        </div>  
    );
}

export default Home;