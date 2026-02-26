import { useEvents } from '../context/EventsContext';
import { useState, useEffect } from 'react';

export default function Filters() {
  const { state, dispatch } = useEvents();
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    date: ''
  });

  const types = [...new Set(state.events.map(event => event.type))];
  const locations = [...new Set(state.events.map(event => event.location))];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  useEffect(() => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, [filters]);

  return (
    <div className="filters-container">
      <select 
        value={filters.type} 
        onChange={(e) => handleFilterChange('type', e.target.value)}
        className="filter-select"
      >
        <option value="">All Types</option>
        {types.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <select 
        value={filters.location} 
        onChange={(e) => handleFilterChange('location', e.target.value)}
        className="filter-select"
      >
        <option value="">All Locations</option>
        {locations.map(location => (
          <option key={location} value={location}>{location}</option>
        ))}
      </select>

      <input
        type="date"
        value={filters.date}
        onChange={(e) => handleFilterChange('date', e.target.value)}
        className="filter-date"
      />
    </div>
  );
}
