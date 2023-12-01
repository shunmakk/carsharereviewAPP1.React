import { useState } from 'react';
import './Review.css'
import Select from 'react-select';
import {addDoc, collection} from "firebase/firestore";
import {auth, db} from "../firebase";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const option1 = [
  { value: "カレコ・カーシェアリングクラブ", label: "カレコ・カーシェアリングクラブ" },
  { value: "タイムズカーシェア", label: "タイムズカーシェア" },
  { value: "オリックスカーシェア", label: "オリックスカーシェア" },
];


const option2 = [
  {value: "1", label:  "1"},
  {value: "2", label:  "2"},
  {value: "3", label: "3"} ,
  {value: "4", label: "4"},
  {value: "5", label: "5"}
]

// eslint-disable-next-line react/prop-types
const Review  = ({isAuth}) => {

  //変数を格納するための状態変数をusestateで宣言
  const [company, setCompany] = useState(option1[0]);
  const [score,setScore] = useState(option2[0]);
  const [critique,setCritique] = useState();
  const [postName,setPostName] = useState();


  const navi = useNavigate();

  //firebaseに格納するデータ
  const createReview   = async () => {
    await addDoc(collection(db,"review"),{
      company: company,
      score: score,
      critique: critique,
      postName: postName,
      author:{
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid
      }
    });
    //投稿を終えたらhomeに戻る
    navi("/");
  }

  //ログインしていないユーザーが書き込めないようにする
  useEffect(() => {
 if(!isAuth){
  navi("/login");
 }
  },[isAuth, navi])

  return (
    <div className='createreview'>
      <div className='createbg'>
        <h2 className='titlereview'>レビューを投稿する</h2>
        <div>
          <div>①カーシェアの会社を選択してください</div>
          <Select options={option1} defaultValue={setCompany} className='selectcompany' onChange={(value) => {value ? setCompany(value): null;}} />
        
        </div>
        <div>
          <div>②点数を記入してください*1~5</div>
          <Select className='reviewpoint'  options={option2}    defaultValue={setScore}     onChange={(value) => {value ? setScore(value):null; }}/>
        </div>
        <div>
          <div>③口コミを300文字以内で記入してください</div>
          <textarea className='review300'  maxLength={300} onChange={(e) => setCritique(e.target.value)} required />
        </div>
        <div>
          <div>④ニックネームを記入してください</div>
          <input className='nameatreview' type="text" onChange={(e) => setPostName(e.target.value)} required></input>
        </div>
        <button onClick={createReview} className='btnreview'>投稿する</button>
      </div>
    </div>
  )
}

export default Review;
