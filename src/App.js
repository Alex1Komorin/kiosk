// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ActivityProvider } from './contexts/ActivityContext';
import InactivityWarning from './components/InactivityWarning/InactivityWarning';
import Index from './pages/Index/Index';
import Layout from './layout/Layout';
import DocumentPage from './pages/DocumentsPage/DocumentPage';
import './App.css';

function App() {
  return (
    <ActivityProvider>
      <Router>
        <div className="app">
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
            <Route path="/documents/:folderPath/*" element={
              <Layout>
                <DocumentPage />
              </Layout>
            } />
          </Routes>
          <InactivityWarning />
        </div>
      </Router>
    </ActivityProvider>
  );
}

export default App;