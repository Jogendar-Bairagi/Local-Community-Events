import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const { dispatch } = useEvents();
  const date = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const handleRsvp = (e) => {
    e.stopPropagation();
    dispatch({ type: 'RSVP_EVENT', payload: event.id });
    alert(`RSVP confirmed for "${event.title}"!`);
  };

  return (
    <div className="event-card" onClick={() => navigate(`/event/${event.id}`)}>
      <div className="event-image-placeholder">
        <span className="event-type-badge">{event.type}</span>
      </div>
      <div className="event-content">
        <h3>{event.title}</h3>
        <p className="event-date">{date}</p>
        <p className="event-location">📍 {event.location}</p>
        <p className="event-host">👤 {event.host}</p>
        <p className="event-description">{event.description.substring(0, 80)}...</p>
        <button className="rsvp-btn" onClick={handleRsvp}>
          RSVP
        </button>
      </div>
    </div>
  );
}
