import { signOut } from "firebase/auth";
import { auth } from "../FireBase";
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const Logout = ({ setIsAuth }) => {
 const navigate = useNavigate();


 const logout = () => {
   // ログアウト前に確認メッセージを表示する場合
   const confirmLogout = window.confirm("本当にログアウトしますか？");


   if (confirmLogout) {
     // ログアウトするための処理
     signOut(auth)
       .then(() => {
         localStorage.clear();
         setIsAuth(false);
         navigate("/login");
       })
       .catch((error) => {
         console.error("ログアウトエラー:", error);
         // エラー処理が必要な場合は追加してください
       });
   }
 };


 return (
   <div>
    <h2>ログインアウトページ</h2>

    <div className="log">
     <p>ログアウトする</p>
     <button onClick={logout}>Googleでログアウトする</button>
     </div>
   
 </div>
 );
};


export default Logout;
