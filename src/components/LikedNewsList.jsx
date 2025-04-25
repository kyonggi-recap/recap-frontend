import styles from '../pages/MyPage.module.css';

export default function LikedNewsList() {
  const dummyData = [
    {
      id: 1,
      image: 'https://via.placeholder.com/120x80',
      title: '가격표 보고 "들었다 놨다" 반복… 물가 상승에 한숨 쉬는 엄마',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/120x80',
      title: '가격표 보고 "들었다 놨다" 반복… 물가 상승에 한숨 쉬는 엄마',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/120x80',
      title: '가격표 보고 "들었다 놨다" 반복… 물가 상승에 한숨 쉬는 엄마',
    },
  ];

  return (
    <>
      <h2 className={styles.sectionTitle}>좋아요 누른 뉴스</h2>
      <div className={styles.cardContainer}>
        <div className={styles.cardList}>
          {dummyData.map((item) => (
            <div className={styles.newsCard} key={item.id}>
              <img src={item.image} alt="뉴스 이미지" className={styles.cardImage} />
              <div className={styles.cardText}>
                <p className={styles.cardTitle}>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          <span className={styles.pageNumber}>{'<'}</span>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <span key={n} className={styles.pageNumber}>{n}</span>
          ))}
          <span className={styles.pageNumber}>{'>'}</span>
        </div>
      </div>
    </>
  );
}
