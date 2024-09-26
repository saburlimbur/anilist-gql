import './App.css';
import { useQuery } from '@apollo/client';
import GetMediaPages from './queries/GetMediaPages.gql';
import styles from './App.module.css';
import AniCard from './components/Card/AniCard';

function App() {
  const { data, loading, error } = useQuery(GetMediaPages);
  console.log({
    data,
  });

  if (error) {
    console.log(error);
  }

  return (
    <main>
      <h1 className={styles.title}>Anime List</h1>
      <div className={styles.listWrapper}>
        {loading ? (
          <h2>Loading List...</h2>
        ) : (
          data.Page.media.map(({ id, title, bannerImage }) => {
            return (
              <>
                {/* <div>{title.english}</div> */}
                <AniCard key={id} title={title.english || title.native} bannerImg={bannerImage} />
              </>
            );
          })
        )}
      </div>
    </main>
  );
}

export default App;
