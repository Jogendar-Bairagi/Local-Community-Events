import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { EventsProvider, useEvents } from './context/EventsContext';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import './index.css';

function Layout() {
  return (
    <EventsProvider>
      <Router>
        <div className="app">
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/create" element={<CreateEvent />} />
            </Routes>
          </main>
        </div>
      </Router>
    </EventsProvider>
  );
}

function NavBar() {
  const location = useLocation();
  const { state } = useEvents();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          local community events
        </Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Explore Events
          </Link>
          <Link to="/create" className={location.pathname === '/create' ? 'active' : ''}>
            + Create Event
          </Link>
          <div className="rsvp-count">
            RSVP'd: {state.rsvpEvents.length}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Layout;
