import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../logo/Logo';
import Policy from '../policy/Policy';
import './join.css';

const Join = ({state, dispatch}) => {

  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUser(e.target.value);
  }

  const setLoggedInUser = () => {
    if( user ) {
      dispatch({
        type: 'LOGIN',
        payload: user
      });
    }
  }

  useEffect(
    () => {
      if(state.user) {
        navigate('/chat');
      }
    }, [state.user]
  );

  return (
    <div className='join-page'>
      <div className='join-container'>
        <Logo/>

        <div className='main-content'>
          <div className='left-container'>
            <Policy/>
          </div>
          <div className="right-container">
            <input type="email" name="email" id="email" className='inputbox' value={user} onChange={(e) => changeHandler(e)}/>
            <button className='btn' onClick={setLoggedInUser}>Join</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Join