import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainSuggestionsPage from './pages/suggestions/MainSuggestionsPage';
import Roadmap from './pages/roadmap/Roadmap';
import { ContextProvider } from './context/Context';
import CreateNewFeedback from './pages/new/CreateNewFeedback';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainSuggestionsPage />}></Route>
          <Route path="/roadmap" element={<Roadmap />}></Route>
          <Route path="/new" element={<CreateNewFeedback />}></Route>
        </Routes>
      </Router>
    </ContextProvider>
  </React.StrictMode>
);
