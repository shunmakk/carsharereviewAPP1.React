import { useEffect, useState } from 'react';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { auth, db } from '../FireBase';
import carshare from '../images/car.png';
import './Home.css';

const Home = () => {
  const [reviewList, setReviewList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 1ページあたりのアイテム数

  useEffect(() => {
    const getReview = async () => {
      const data = await getDocs(collection(db, "review"));
      setReviewList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getReview();
  }, []);

  const DeleteButton = async (id) => {
    const alertDelete = window.confirm('本当に投稿を削除しますか？');
    if (alertDelete) {
      await deleteDoc(doc(db, "review", id));
      window.location.reload(); // 削除後にページをリロードすることで、データを再取得します
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = reviewList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='alltt'>
      <main>
        <div><img src={carshare} alt="carshare" width={1000} className="carmainpic" /></div>
        <div>
          {currentData.map((post) => (
            <div className="allreview" key={post.id}>
              <div className="companyName">
                <h2>会社名:{post.company.value}</h2>
              </div>
              <div className="scoreHome">
                <div>スコア:{post.score.value}</div>
              </div>
              <div className="reviewHome">
                {post.critique}
              </div>
              <div className="deletebtn">
                <p>投稿者名：{post.postName}</p>
                {post.author.id === auth.currentUser?.uid &&
                  <button onClick={() => DeleteButton(post.id)}>投稿を削除</button>
                }
              </div>
            </div>
          ))}
        
          <div className="pagination">
            {Array.from({ length: Math.ceil(reviewList.length / itemsPerPage) }).map((_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
      <aside>
        <div className='ad'>広告配置用</div>
      </aside>
    </div>
  );
};

export default Home;