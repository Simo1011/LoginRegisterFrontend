import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import taskImage from '../assets/task-manager.png';  // Add your image in the assets folder

const WelcomePage: React.FC = () => {
  const user = AuthService.getUser();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card text-center shadow-lg p-4">
            <div className="card-body">
              <h1 className="card-title">Welcome to TaskManager</h1>
              <img 
                src={taskImage} 
                alt="Task management" 
                className="img-fluid mt-3 mb-4" 
                style={{ maxHeight: '250px' }} 
              />
              {user ? (
                <p className="card-text">
                  Welcome back, <strong>{user.username}</strong>! You can now manage your tasks.
                </p>
              ) : (
                <p className="card-text">
                  Please <Link to="/login" className="btn btn-primary">Log in</Link> to manage your tasks.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
