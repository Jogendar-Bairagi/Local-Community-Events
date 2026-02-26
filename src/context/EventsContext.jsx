import React, { createContext, useContext, useReducer, useEffect } from 'react';
import eventsData from '../data/events.json';

const EventsContext = createContext();

const initialState = {
  events: [],
  filteredEvents: [],
  filters: {
    type: '',
    location: '',
    date: ''
  },
  currentPage: 1,
  eventsPerPage: 8,
  rsvpEvents: JSON.parse(localStorage.getItem('rsvpEvents')) || []
};

function eventsReducer(state, action) {
  switch (action.type) {
    case 'SET_EVENTS':
      return { ...state, events: action.payload, filteredEvents: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload, currentPage: 1 };
    case 'FILTER_EVENTS':
      return { ...state, filteredEvents: action.payload, currentPage: 1 };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'RSVP_EVENT':
      const updatedRsvp = [...state.rsvpEvents, action.payload];
      localStorage.setItem('rsvpEvents', JSON.stringify(updatedRsvp));
      return { ...state, rsvpEvents: updatedRsvp };
    default:
      return state;
  }
}

export function EventsProvider({ children }) {
  const [state, dispatch] = useReducer(eventsReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_EVENTS', payload: eventsData.events });
  }, []);

  const filterEvents = () => {
    let filtered = [...state.events];
    
    if (state.filters.type) {
      filtered = filtered.filter(event => 
        event.type.toLowerCase() === state.filters.type.toLowerCase()
      );
    }
    
    if (state.filters.location) {
      filtered = filtered.filter(event => 
        event.location.toLowerCase().includes(state.filters.location.toLowerCase())
      );
    }
    
    if (state.filters.date) {
      filtered = filtered.filter(event => event.date === state.filters.date);
    }
    
    dispatch({ type: 'FILTER_EVENTS', payload: filtered });
  };

  useEffect(() => {
    filterEvents();
  }, [state.filters, state.events]);

  const value = {
    state,
    dispatch,
    filterEvents
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within EventsProvider');
  }
  return context;
};
