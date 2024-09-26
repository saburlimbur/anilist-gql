import styles from './Pagination.module.css';

const Pagination = (props) => {
  const { onPrevious, onNext, currentPage, hasNextPage } = props;
  return (
    <div className={styles.container}>
      <button 
        onClick={onPrevious} 
        disabled={currentPage === 1}>
        Previous
      </button>

      <h4>{currentPage}</h4>
      
      <button 
        onClick={onNext} 
        disabled={!hasNextPage}>Next</button>
    </div>
  );
};

export default Pagination;
