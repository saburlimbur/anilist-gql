import styles from './Anicard.module.css';

const AniCard = (props) => {
  const { title, bannerImg } = props;
  return (
    <section className={styles.container}>
      <div className={styles.imgWrapper}>
        <img src={bannerImg} />
      </div>

      <h3>{title}</h3>
    </section>
  );
};

export default AniCard;
