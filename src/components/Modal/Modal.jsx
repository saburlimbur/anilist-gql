import { useQuery } from '@apollo/client';
import styles from './Modal.module.css';
import GetMedia from '../../queries/GetMedia.gql';

const Modal = (props) => {
  const { show, onClose, id } = props;
  const { data, loading } = useQuery(GetMedia, {
    variables: {
      id,
    },
  });

  if (!show) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.container}>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <div className={styles.imgWrapper}>
              <img src={data.Media.coverImage.extraLarge} />
            </div>
            <div className={styles.infoWrapper}>
              <h2>{data.Media.title.english || data.Media.title.native}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: data.Media.description, // agar tdk ada tag br nya
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Modal;
