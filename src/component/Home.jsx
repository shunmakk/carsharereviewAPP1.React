import { collection, deleteDoc, getDocs,doc } from 'firebase/firestore';
import {auth, db} from '../FireBase';
import { useEffect } from 'react';
import './Home.css';
import { useState } from 'react';
import carshare from '../images/car.png';


const Home = () => {

  //データを表示するための状態変数
  const [reviewList, setReviewList] =useState([]);

//firebaseからデータを受け取る  useeffectの中でasync関数を使う場合、もう一度関数を作る必要があるので注意
useEffect(() => {
  const getReview = async () => {
    const data = await getDocs(collection(db, "review"));
    setReviewList(data.docs.map((doc) => ({...doc.data(),id: doc.id})));
  };
  getReview();
},[])



//ボタンを削除するための関数
const DeleteButton = async (id) => {
  const alertDelete = window.confirm('本当に投稿を削除しますか？');
  if(alertDelete){
  await deleteDoc(doc(db, "review", id))
  //削除したときリダイレクトするようにする
 window.location.href ="/";
}
};



  return (
    <div className='alltt'>

     
    
     <main> 

      <div><img src={carshare} alt="carshare" width={1000}  className="carmainpic"/></div>
      <div>

     
     {reviewList.map((post) => {
      return(
       //map関数を使ってレビューを複数表示できるようにする
       <div className="allreview" key={post.id}>
       <div className="companyName" >
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
      {post.author.id === auth.currentUser?.uid  &&
    <button onClick={() => DeleteButton(post.id)}>投稿を削除</button>
     }

  
      
      
      </div>
      </div>
      
      )
     })}
    
    
    </div>
    </main>

     

    <aside>
  <div className='ad'>広告配置用</div>
   </aside>

   </div>
  )
}

export default Home