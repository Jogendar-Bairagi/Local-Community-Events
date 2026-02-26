import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';

export default function CreateEvent() {
  const navigate = useNavigate();
  const { state, dispatch } = useEvents();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    date: '',
    location: '',
    host: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.type.trim()) newErrors.type = 'Type is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.host.trim()) newErrors.host = 'Host name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newEvent = {
        id: Date.now(),
        ...formData
      };
      
      const updatedEvents = [newEvent, ...state.events];
      dispatch({ type: 'SET_EVENTS', payload: updatedEvents });
      
      alert('Event created successfully!');
      navigate('/');
    }
  };

  return (
    <div className="create-event">
      <div className="container">
        <Link to="/" className="back-btn">← Back to Events</Link>
        
        <div className="form-container">
          <h1>Create New Event</h1>
          <form onSubmit={handleSubmit} className="event-form">
            <div className="form-group">
              <label>Event Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className={errors.type ? 'error' : ''}
                >
                  <option value="">Select Type</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Music">Music</option>
                  <option value="Sports">Sports</option>
                  <option value="Meetup">Meetup</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
                {errors.type && <span className="error-text">{errors.type}</span>}
              </div>

              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className={errors.date ? 'error' : ''}
                />
                {errors.date && <span className="error-text">{errors.date}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  placeholder="e.g. Bangalore, Mumbai"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className={errors.location ? 'error' : ''}
                />
                {errors.location && <span className="error-text">{errors.location}</span>}
              </div>

              <div className="form-group">
                <label>Host Name *</label>
                <input
                  type="text"
                  placeholder="Your name or organization"
                  value={formData.host}
                  onChange={(e) => setFormData({...formData, host: e.target.value})}
                  className={errors.host ? 'error' : ''}
                />
                {errors.host && <span className="error-text">{errors.host}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                rows="5"
                placeholder="Tell attendees about your event..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>

            <button type="submit" className="submit-btn">
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
