import EventCard from '../components/EventCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { useEvents } from '../context/EventsContext';

export default function Home() {
  const { state } = useEvents();
  const { filteredEvents, currentPage, eventsPerPage } = state;
  
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div className="home">
      <header className="hero">
        <h1>Discover Local Events</h1>
        <p>Find workshops, meetups, and activities happening near you</p>
      </header>

      <div className="container">
        <Filters />
        
        <div className="stats">
          <span>Showing {currentEvents.length} of {filteredEvents.length} events</span>
        </div>

        <div className="events-grid">
          {currentEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <Pagination />
      </div>
    </div>
  );
}
