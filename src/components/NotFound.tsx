import React from 'react';
import { routes } from '../resources';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return <div className="NotFound">
        <h1>Not Found</h1>
        <div>Sorry! This page doesn't exist.</div>
        <Link to={routes.HOME}>Back to Home</Link>
    </div>
}

export default NotFound;