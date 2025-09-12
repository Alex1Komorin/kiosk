// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ActivityProvider } from './contexts/ActivityContext';
import { UrlProvider } from './contexts/UrlContext'; // Добавьте этот импорт
import InactivityWarning from './components/InactivityWarning/InactivityWarning';
import Index from './pages/Index/Index';
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
    enableDevTools: false
  });

  return (
    <Router>
      <div className="app">
        <ActivityProviderWithRoute>
          <UrlProvider> {/* Добавьте UrlProvider здесь */}
            <Routes>
              <Route path="/" element={
                <Layout>
                  <Index />
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
          </UrlProvider> {/* Закройте UrlProvider здесь */}
        </ActivityProviderWithRoute>
      </div>
    </Router>
  );
}

export default App;