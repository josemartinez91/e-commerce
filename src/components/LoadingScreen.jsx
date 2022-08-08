import React from 'react';
import Spinner from 'react-bootstrap/Spinner';


const LoadingScreen = () => {
    return (
        <div className='overlay'>
            <Spinner animation="grow" variant="secondary" />
        </div>
    );
};

export default LoadingScreen;