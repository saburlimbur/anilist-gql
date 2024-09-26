import styles from './Anicard.module.css';

const AniCard = (props) => {
  const { title, bannerImg, onClick } = props;
  return (
    <section className={styles.container} onClick={onClick}>
      <div className={styles.imgWrapper}>
        <img src={bannerImg} />
      </div>

      <h3>{title}</h3>
    </section>
  );
};

export default AniCard;
