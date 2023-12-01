import { useState } from 'react';
import { init, send } from '@emailjs/browser';
import './Contact.css'



const Contact = () => {

  const [name, setName] =  useState('');
  const [mail, setMail] = useState('');
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');


  //メール送信の部分の処理
 const sendMail = () => {
  const serviceID = import.meta.env.VITE_REACT_APP_SERVICE_ID;
  const templateID = import.meta.env.VITE_REACT_APP_TEMPLATE_ID;
  const publicKey  = import.meta.env.VITE_REACT_APP_PUBLIC_KEY;

  if(serviceID &&templateID && publicKey
  ){
   
    init(publicKey)

   const template_param = {
   to_name: name,
   from_email: mail,
   title: title,
   message: about
   };


  send(serviceID,templateID,template_param).then(() => {
    window.alert('送信が完了しました')

    setName('');
    setMail('');
    setTitle('');
    setAbout('');

  });
  }
  


 }

 const Click = (e) => {
  e.preventDefault();
  sendMail();
 }

 const Canceled = () => {
  setName('');
    setMail('');
    setTitle('');
    setAbout('');
 }

 const disabled =
 name === '' || mail === '' || title === '' || about === '';



  return (

    <div className='mainContact'>
    <h2 className='contactH2'>お問い合わせページ</h2>
    <p className='context'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatibus necessitatibus impedit cumque consectetur minima molestias ullam sint eum obcaecati. Sequi sit quam corporis dolore nesciunt amet, porro blanditiis vitae?</p>
    <form className='formmain'>
    <div className='arr'>
    <div>
      <label htmlFor='name'>お名前:</label>
    </div>
    <input type="text"  id="name"  className='input' value={name} onChange={(e) => setName(e.target.value)}/>
    </div>
    <div className='arr1'>
   < div>
      <label htmlFor='email'>メールアドレス:</label>
    </div>
    <input type="text"  id="email"  className='input' value={mail} onChange={(e) => setMail(e.target.value)}/>
    </div>
    <div className='arr2'>
    <div>
      <label htmlFor='title'>件名:</label>
    </div>
    <input type="text"  id="title"  className='input' value={title} onChange={(e) => setTitle(e.target.value)}/>
    </div>
    <div className='arr2'>
    <div>
      <label htmlFor='about'> 内容:</label>
    </div>
    <textarea  id="about"  className='textbox'  rows="6" value={about}  onChange={(e) => setAbout(e.target.value)}/>
    </div>
    <div className='btnmain'>
      <div>
    <button className='btnsub' disabled={disabled} onClick={Click}>送信する</button>
     </div>
     <div>
    <button className='btncancel' disabled={disabled} onClick={Canceled}>キャンセルする</button>
     </div>

    </div>


    </form>
    </div>

)
}

export default Contact