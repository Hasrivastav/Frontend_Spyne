
import React from 'react';
import './NotFound.css';  

const NotFound = () => {
  return (
    <div className="err404">
      <div className="errorDiv">
        <div className="number">404</div>
        <div className="text">
          <span>Page Not Found</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
