// src/layout/SidebarLayout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SidebarLayout.css';

const SidebarLayout = ({ children }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Возврат на предыдущую страницу
  };

  const goHome = () => {
    navigate('/'); // Переход на главную страницу
  };

  return (
    <div className="sidebar-layout">
      <div className="sidebar">
        <button className="sidebar-button" onClick={goHome}>
          <img 
            src="/images/svgFunctionalIcons/home.svg" 
            alt="Home" 
            className="sidebar-icon"
          />
        </button>
        <button className="sidebar-button" onClick={goBack}>
          <img 
            src="/images/svgFunctionalIcons/arrowBack.svg" 
            alt="Back" 
            className="sidebar-icon"
          />
        </button>
      </div>
      <div className="sidebar-content">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;