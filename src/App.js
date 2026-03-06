// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ActivityProvider } from './contexts/ActivityContext';
import { UrlProvider } from './contexts/UrlContext'; 
import InactivityWarning from './components/InactivityWarning/InactivityWarning';
import Index from './pages/Index/Index';
import GamesPage from './pages/gamesPage/gamesPage';
import BalloonGamePage from './pages/BalloonGamePage';
import VisualNovelPage from './pages/visualNivelPage';
import PuzzlePage from './pages/PuzzlePage';
import Layout from './layout/Layout';
import DocumentPage from './pages/DocumentsPage/DocumentPage';
import LinksPage from './pages/LinkPage/LinkPage';
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
        <ActivityProviderWithRoute>
          <UrlProvider>
            <Routes>
              <Route path="/" element={
                <Layout>
                  <Index />
                </Layout>
              } />

              {/* Страница со списком игр */}
              <Route path="/games" element={
                <Layout>
                  <GamesPage />
                </Layout>
              } />

              {/* Отдельные игры */}
              <Route path="/games/balloon" element={
                <Layout>
                  <BalloonGamePage />
                </Layout>
              } />

              <Route path="/games/novel" element={
                <Layout>
                  <VisualNovelPage />
                </Layout>
              } />

              <Route path="/games/puzzle" element={
                <Layout>
                  <PuzzlePage />
                </Layout>
              } />

              <Route path="/documents" element={
                <Layout>
                  <DocumentPage />
                </Layout>
              } />
              
              <Route path="/links" element={
                <Layout>
                  <LinksPage />
                </Layout>
              } />
              
              <Route path="/documents/:folderPath/*" element={
                <Layout>
                  <DocumentPage />
                </Layout>
              } />
            </Routes>
            <InactivityWarning />
          </UrlProvider>
        </ActivityProviderWithRoute>
      </div>
    </Router>
  );
}

export default App;