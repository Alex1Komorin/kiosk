// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ActivityProvider } from './contexts/ActivityContext';
import { UrlProvider } from './contexts/UrlContext'; 
import { TextSizeProvider } from './contexts/TextSizeContext';
import InactivityWarning from './components/InactivityWarning/InactivityWarning';
import Index from './pages/Index/Index';
import GamesPage from './pages/gamesPage/gamesPage';
import GamePage from './pages/GamePage';
import Sidebar from './layout/SidebarLayout';
import DocumentPage from './pages/DocumentsPage/DocumentPage';
import ContactPage from './pages/сontactPage/сontactPage';
import LinksPage from './pages/LinkPage/LinkPage';
import HomePage from './pages/homePage/homePage';
import SliderPage from './pages/associationsPage/associationsPage';
import useGlobalBlocker from './hooks/UseGlobalBlocker';
import './App.css';

const ActivityProviderWithRoute = ({ children }) => {
  const location = useLocation();
  return (
    <ActivityProvider currentPath={location.pathname}>
      {children}
    </ActivityProvider>
  );
};

function App() {
  useGlobalBlocker({
    disableContextMenu: false,
    disableTextSelection: false,
    disableDrag: false,
    enableDevTools: true
  });

  return (
    <Router>
      <div className="app">
        <TextSizeProvider>
        <ActivityProviderWithRoute>
          <UrlProvider>
            <Routes>
              <Route path="/home" element={
                <Sidebar>
                  <Index />
                </Sidebar>
              } />

              <Route path="/" element={
                <Sidebar>
                  <HomePage />
                </Sidebar>
              } />
              
              <Route path="/associations" element={
                <Sidebar>
                  <SliderPage />
                </Sidebar>
              } />

              {/* Страница со списком игр */}
              <Route path="/games" element={
                <Sidebar>
                  <GamesPage />
                </Sidebar>
              } />

              <Route path="/games/:gameId" element={
                <Sidebar>
                  <GamePage />
                </Sidebar>
              } />

              <Route path="/contact" element={
                <Sidebar>
                  <ContactPage />
                </Sidebar>
              } />

              <Route path="/documents" element={
                <Sidebar>
                  <DocumentPage />
                </Sidebar>
              } />
              
              <Route path="/links" element={
                <Sidebar>
                  <LinksPage />
                </Sidebar>
              } />
              
              <Route path="/documents/:folderPath/*" element={
                <Sidebar>
                  <DocumentPage />
                </Sidebar>
              } />
            </Routes>
            <InactivityWarning />
          </UrlProvider>
        </ActivityProviderWithRoute>
        </TextSizeProvider>
      </div>
    </Router>
  );
}

export default App;
