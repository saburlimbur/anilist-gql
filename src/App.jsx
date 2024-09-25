import './App.css';
import { useQuery } from '@apollo/client';
import GetMediaPages from './queries/GetMediaPages.gql';
import styles from './App.module.css';

function App() {
  const { data, loading } = useQuery(GetMediaPages);
  return (
    <main>
      <h1>Anime List</h1>
      <div className={styles.listWrapper}>
        {loading ? (
          <h2>Loading List...</h2>
        ) : (
          data.Page.media.map(({ title }) => {
            return (
              <>
                <div>{title.english}</div>
              </>
            );
          })
        )}
      </div>
    </main>
  );
}

export default App;
