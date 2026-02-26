import { useEvents } from '../context/EventsContext';

export default function Pagination() {
  const { state, dispatch } = useEvents();
  const { filteredEvents, currentPage, eventsPerPage } = state;
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handlePageChange = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="page-btn"
      >
        Previous
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`page-btn ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}
      
      <button 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="page-btn"
      >
        Next
      </button>
    </div>
  );
}
