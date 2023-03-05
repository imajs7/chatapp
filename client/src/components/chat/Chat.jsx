import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import ReactScrollToBottom from 'react-scroll-to-bottom';
import './Chat.css';
import Message from '../message/Message';
import sendLogo from "../../images/send.png";
import closeIcon from "../../images/closeIcon.png";

let socket;

const ENDPOINT =  process.env.REACT_APP_SERVER_URI || "http://localhost:4000";

const Chat = ({state, dispatch}) => {

  const navigate = useNavigate();
  const [id, setId] = useState();
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();

  const sendMessage = () => {
    const message = inputRef.current.value;
    if( message ) {
      socket.emit( 'message', {id, message} );
      inputRef.current.value='';
    }
  }

  useEffect(
    () => {

      socket = io( ENDPOINT, { transports: ["websocket"] } );

      socket.on( 'connect', () => {
        alert('connected');
        setId( socket.id );
      } );

      socket.emit( 'joined', ( state.user ) );

      socket.on( 'welcome', (data) => {
        setMessages( old => [...old, data ] );
      } );

      socket.on( 'userJoined', (data) => {
        setMessages( old => [...old, data ] );
      } );

      socket.on( 'userleft', (data) => {
        setMessages( old => [...old, data ] );
      } );

      socket.on( 'newmessage', (data) => {
        setMessages( old => [...old, data ] );
      } );


      return () => {
        socket.emit('logout');
        socket.off();
    }

    }, []
  );

  useEffect(
    () => {
      if(! state.user) {
        navigate('/');
      }
    }, [state.user]
  );

  const logoutHandler = () => {
    dispatch({
      type: 'LOGOUT'
    });
  }

  return (

    <div>
      <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h4 className='userName'>{state.user}</h4>
                    <button onClick={logoutHandler} className='closeBtn'>
                      &times;
                    </button>
                </div>

                <ReactScrollToBottom className="chatBox">
                    {
                      messages.map((item, idx) => (
                        <Message key={idx}
                          user={item.id === id ? '' : item.user} 
                          message={item.message} 
                          classs={item.id === id ? 'right' : 'left'} 
                        />
                      ))
                    }
                </ReactScrollToBottom>

                <div className="inputBox">
                    <input 
                      ref={inputRef}
                      onKeyDown={(event) => event.key === 'Enter' ? sendMessage() : null} 
                      type="text" 
                      id="chatInput"
                    />
                    <button 
                      onClick={sendMessage} 
                      className="sendBtn"
                    >
                      <img src={sendLogo} alt="Send" />
                    </button>
                </div> 

            </div>
        </div>
    </div>
  )
}

export default Chat