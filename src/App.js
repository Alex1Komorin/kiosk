// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ActivityProvider } from './contexts/ActivityContext';
import { UrlProvider } from './contexts/UrlContext'; 
import { TextSizeProvider } from './contexts/TextSizeContext';
import InactivityWarning from './components/InactivityWarning/InactivityWarning';
import Index from './pages/Index/Index';
import GamesPage from './pages/gamesPage/gamesPage';
import BalloonGamePage from './pages/BalloonGamePage';
import VisualNovelPage from './pages/visualNivelPage';
import PuzzlePage from './pages/PuzzlePage';
import Eios from './pages/eios';
import Sidebar from './layout/SidebarLayout';
import DocumentPage from './pages/DocumentsPage/DocumentPage';
import ContactPage from './pages/сontactPage/сontactPage';
import LinksPage from './pages/LinkPage/LinkPage';
import HomePage from './pages/homePage/homePage';
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

              {/* Страница со списком игр */}
              <Route path="/games" element={
                <Sidebar>
                  <GamesPage />
                </Sidebar>
              } />

              {/* Отдельные игры */}
              <Route path="/games/balloon" element={
                <Sidebar>
                  <BalloonGamePage />
                </Sidebar>
              } />

              <Route path="/games/novel" element={
                <Sidebar>
                  <VisualNovelPage />
                </Sidebar>
              } />

              <Route path="/games/puzzle" element={
                <Sidebar>
                  <PuzzlePage />
                </Sidebar>
              } />

              <Route path="/external" element={
                <Sidebar>
                  <Eios />
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