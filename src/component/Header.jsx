import './Header.css';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCar } from '@fortawesome/free-solid-svg-icons'



// eslint-disable-next-line react/prop-types
const Header = ({isAuth}) => {
  return (
    <nav>
    <div className='all'>
    <div className="headernav">
    <h1><FontAwesomeIcon icon={faCar} className="svg" />CarShare Review</h1>
      <div className='linkchoic'>
      <Link to="/" className='Link'><FontAwesomeIcon icon={faHouse} className="svg" />Home</Link>
      <Link to="/contact" className='Link'><FontAwesomeIcon icon={faEnvelope}  className="svg" />お問い合わせ</Link>

      {!isAuth ? <Link to="/login" className='Link'><FontAwesomeIcon icon={faUser}  className="svg"/>ログイン</Link>
      :<>
      <Link to="/logout" className='Link'><FontAwesomeIcon icon={faUser}  className="svg"/>ログアウト</Link>
      <Link to="/review" className='goreview'>口コミを書く</Link>
      </>
      }


      
      </div>
  </div>
  </div>
  </nav>
  )
}

export default Header


