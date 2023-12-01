import './App.css';
import Footer from './component/Footer';
import Header from './component/Header';
import Home from './component/Home';
import Contact from './component/Contact';
import Review from './component/Review';
import Login from './component/Login';
import Logout  from './component/Logout';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';


function App() {

  //ログイン、ログアウトを管理する  ローカルストレージにアイテムがあるときはtrueの状態にする
 const [isAuth,setIsAuth] =useState(localStorage.getItem("isAuth"));
  

  return (
    <div className='body'>
      
    <Router>
    <Header isAuth={isAuth} />
    <main>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}></Route>
        <Route path="/logout" element={<Logout  setIsAuth={setIsAuth} />}></Route>
        <Route path="/review" element={<Review  isAuth={isAuth} />}></Route>
       
      </Routes>
      </main>
      <Footer />
    </Router> 

    </div>
  )
}

export default App;
