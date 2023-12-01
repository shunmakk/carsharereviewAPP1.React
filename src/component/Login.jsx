import { signInWithPopup } from "firebase/auth";
import { auth,provider } from "../FireBase";
import { useNavigate } from "react-router-dom";
import './Log.css'


// eslint-disable-next-line react/prop-types
const Login = ({setIsAuth}) => {

const navigate = useNavigate();

const loginGoogle = () =>  {
    //ログインするための処理
    
    // eslint-disable-next-line no-unused-vars
    signInWithPopup(auth, provider).then((result) => {
        //ログインした情報を残すための状態変数を作成
        localStorage.setItem("isAuth",true)
       setIsAuth(true);
       //Homeに自動的にリダイレクトするようにする
       navigate("/");
    });
}


  return (

    <div>
      <h2>ログインページ</h2>

     
     <div className="log">
     <p>ログインして始める</p>
     <button onClick={loginGoogle}>Googleでログイン</button>
     </div>
    </div>
  )
}

export default Login;