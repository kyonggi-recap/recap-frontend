export default function CommentList() {
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
        <h2 className="section-title">작성한 댓글</h2>
        <div className="card-container">
          <div className="card-list">
            {dummyData.map((item) => (
              <div className="news-card" key={item.id}>
                <img src={item.image} alt="뉴스 이미지" className="card-image" />
                <div className="card-text">
                  <p className="card-title">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <span>{'<'}</span>
            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
              <span key={n}>{n}</span>
            ))}
            <span>{'>'}</span>
          </div>
        </div>
      </>
    );
  }