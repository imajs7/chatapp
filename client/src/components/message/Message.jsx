import React from 'react'
import "./message.css";


const Message = ({ user, message, classs }) => {
    if (user) {
        return (
            <div className={`messageBox ${classs}`}  >
                <span className='boldText'>{user} :</span> {message}
            </div>
        )
    }
    else {


        return (
            <div className={`messageBox ${classs}`}>
                <span className='boldText'>You :</span> {message}
            </div>
        )
    }
}

export default Message
