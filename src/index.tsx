import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainSuggestionsPage from './pages/suggestions/main/MainSuggestionsPage';
import Roadmap from './pages/roadmap/MainRoadmapPage';
import { FeedbackContextProvider } from './context/FeedbackContext';
import { UIContextProvider } from './context/UIContext';
import CreateNewFeedback from './pages/new/main/MainNewPage';
import MainDetailPage from './pages/detail/main/MainDetailPage';
import MainEditPage from './pages/edit/main/MainEditPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <FeedbackContextProvider>
      <UIContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainSuggestionsPage />}></Route>
            <Route path="/roadmap" element={<Roadmap />}></Route>
            <Route path="/new" element={<CreateNewFeedback />}></Route>
            <Route path="/edit" element={<MainEditPage />}></Route>
            <Route path="/details" element={<MainDetailPage />}></Route>
          </Routes>
        </Router>
      </UIContextProvider>
    </FeedbackContextProvider>
);
