import React from 'react';
import './spinner.css';

const Spinner = () => {
    return ( 
        <div className="spinner-section">
            <div className="spinner__container">            
                <div className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                </div>            
            </div>
        </div>
    );
}
 
export default Spinner;

