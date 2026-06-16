import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import SalonDetailPage from './pages/SalonDetailPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BookingsPage from './pages/BookingsPage';
import AIAssistantPage from './pages/AIAssistantPage';
import SavedPage from './pages/SavedPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/salon/:slug" element={<SalonDetailPage />} />
            <Route path="/book/:slug" element={<BookingPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/saved" element={<SavedPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
