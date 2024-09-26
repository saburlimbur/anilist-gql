import './App.css';
import { useQuery } from '@apollo/client';
import GetMediaPages from './queries/GetMediaPages.gql';
import styles from './App.module.css';
import AniCard from './components/Card/AniCard';
import Pagination from './components/Paginations';
import { useState } from 'react';
import Modal from './components/Modal';

function App() {
  const [search, setSearch] = useState('');
  const [show, setShow] = useState({
    show: false,
    id: -1,
  });
  const { data, loading, error, fetchMore } = useQuery(GetMediaPages, {
    notifyOnNetworkStatusChange: true, // agar loading saat memulai fetching data
    variables: {
      search: search === '' ? undefined : search, // iternary operator
    },
  });

  const navigate = (newPage) => {
    fetchMore({
      variables: {
        page: newPage,
      },
      // cache query update
      updateQuery: (prevData, { fetchMoreResult }) => {
        return {
          ...prevData,
          Page: {
            ...prevData.Page,
            pageInfo: fetchMoreResult.Page.pageInfo,
            media: fetchMoreResult.Page.media,
          },
        };
      },
    });
  };

  // console.log({
  //   data,
  // });

  if (error) {
    console.log(error);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      setSearch(event.target.value);
    }
  };

  const pageInfo = data?.Page.pageInfo || {};

  return (
    <>
      <h1 className={styles.title}>Anime List</h1>
      
      <input 
        onKeyDown={handleKeyDown} 
        type="text" 
        className={styles.search} 
        placeholder="Search Anime" 
      />

      <div className={styles.listWrapper}>
        {loading ? (
          <h2>Loading List...</h2>
        ) : (
          data.Page.media.map(({ id, title, bannerImage }) => {
            return (
              <>
                <AniCard 
                  onClick={() => setShow({ show: true, id: id })} 
                  key={id} 
                  title={title.english || title.native} 
                  bannerImg={bannerImage} />
              </>
            );
          })
        )}
      </div>

      <Pagination 
        hasNextPage={pageInfo.hasNextPage} 
        onNext={() => navigate(pageInfo.currentPage + 1)} 
        currentPage={data?.Page.pageInfo.currentPage} 
        onPrevious={() => navigate(pageInfo.currentPage - 1)} 
      />

      <Modal 
        id={show.id} 
        show={show.show} 
        onClose={() => setShow({ show: false, id: -1 })} 
      />
    </>
  );
}

export default App;
