import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import { useEffect, useState } from 'react';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useEvents();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const foundEvent = state.events.find(e => e.id === parseInt(id));
    setEvent(foundEvent);
  }, [id, state.events]);

  const handleRsvp = () => {
    if (event) {
      dispatch({ type: 'RSVP_EVENT', payload: event.id });
      alert(`🎉 RSVP confirmed for "${event.title}"!\nCheck your dashboard or email for details.`);
    }
  };

  if (!event) return <div className="loading">Loading event...</div>;

  const date = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="event-detail">
      <div className="container">
        <Link to="/" className="back-btn">← Back to Events</Link>
        
        <div className="event-header">
          <h1>{event.title}</h1>
          <div className="event-meta">
            <span className="type-badge">{event.type}</span>
            <span>{date}</span>
            <span>📍 {event.location}</span>
          </div>
        </div>

        <div className="event-content">
          <div className="host-info">
            <h3>Hosted by</h3>
            <p>{event.host}</p>
          </div>
          
          <div className="description">
            <h3>About this event</h3>
            <p>{event.description}</p>
          </div>

          <div className="action-section">
            <button className="rsvp-primary-btn" onClick={handleRsvp}>
              🎫 RSVP for this event
            </button>
            <Link to="/create" className="create-btn">
              Host your own event
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
